#!/bin/bash

set -euo pipefail

APP_NAME="core-cms"
COMPOSE_FILE="docker-compose.yml"
BACKUP_DIR="./backups"
NGINX_TEMPLATE="./deploy/nginx/core-cms.conf.example"
NGINX_SITE_NAME="core-cms"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

load_root_env() {
    if [ -f .env ]; then
        set -a
        . ./.env
        set +a
    fi
}

load_server_env() {
    if [ -f server/.env ]; then
        set -a
        . ./server/.env
        set +a
    fi
}

require_file() {
    local target="$1"
    local example="$2"

    if [ ! -f "$target" ]; then
        cp "$example" "$target"
        log_warn "Created $target from $example. Update it before running the application."
        return 1
    fi

    return 0
}

check_env() {
    local ready=0

    require_file ".env" ".env.example" || ready=1
    require_file "server/.env" "server/.env.example" || ready=1

    if [ "$ready" -ne 0 ]; then
        log_error "Environment files were missing. Review them and rerun the command."
        exit 1
    fi

    load_root_env
    load_server_env
}

ensure_backup_dir() {
    mkdir -p "$BACKUP_DIR"
}

ensure_docker_compose() {
    if docker compose version >/dev/null 2>&1; then
        DOCKER_COMPOSE="docker compose"
        return
    fi

    if command -v docker-compose >/dev/null 2>&1; then
        DOCKER_COMPOSE="docker-compose"
        return
    fi

    log_error "Neither 'docker compose' nor 'docker-compose' is available."
    exit 1
}

setup() {
    log_info "Installing Docker, Compose plugin, Nginx, Certbot, git, and curl on the EC2 host..."

    sudo apt-get update
    sudo apt-get upgrade -y
    sudo apt-get install -y ca-certificates curl gnupg lsb-release git nginx certbot python3-certbot-nginx

    if ! command -v docker >/dev/null 2>&1; then
        log_info "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        rm -f get-docker.sh
    else
        log_info "Docker already installed"
    fi

    sudo usermod -aG docker "$USER" || true
    sudo systemctl enable docker
    sudo systemctl start docker
    sudo systemctl enable nginx
    sudo systemctl start nginx

    ensure_backup_dir
    ensure_docker_compose

    log_info "Setup complete. If Docker was just installed, reconnect your SSH session before using docker without sudo."
}

build() {
    check_env
    ensure_docker_compose
    log_info "Building Docker images for ${APP_NAME}..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" build --pull
    log_info "Build complete."
}

start() {
    check_env
    ensure_docker_compose
    log_info "Starting ${APP_NAME} services..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" up -d --build
    log_info "Services started."
    sleep 10
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" ps

    local upstream_port="${APP_UPSTREAM_PORT:-8080}"
    log_info "App is available on the host at http://127.0.0.1:${upstream_port}"
}

stop() {
    ensure_docker_compose
    log_info "Stopping ${APP_NAME} services..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" down
    log_info "Services stopped."
}

restart() {
    log_info "Restarting ${APP_NAME} services..."
    stop
    start
}

logs() {
    ensure_docker_compose
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" logs -f --tail=100
}

seed() {
    check_env
    local upstream_port="${APP_UPSTREAM_PORT:-8080}"
    log_info "Seeding the application data through the API..."
    curl -fsS -X POST "http://127.0.0.1:${upstream_port}/api/seed"
    echo
    log_info "Seed request completed."
}

backup() {
    check_env
    ensure_docker_compose
    ensure_backup_dir

    if [ -z "${MONGODB_URI:-}" ]; then
        log_error "MONGODB_URI is not set in server/.env. Atlas backup cannot run."
        exit 1
    fi

    local timestamp
    timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_file="${BACKUP_DIR}/core-cms_${timestamp}.archive.gz"

    log_info "Creating MongoDB Atlas backup at ${backup_file}..."
    docker run --rm mongo:6 sh -lc "mongodump --uri '$MONGODB_URI' --archive --gzip" > "$backup_file"

    ls -t "${BACKUP_DIR}"/core-cms_*.archive.gz 2>/dev/null | tail -n +8 | xargs -r rm -f
    log_info "Backup complete. Kept the latest 7 archives."
}

render_nginx_config() {
    check_env

    if [ ! -f "$NGINX_TEMPLATE" ]; then
        log_error "Nginx template not found at ${NGINX_TEMPLATE}."
        exit 1
    fi

    local upstream_port="${APP_UPSTREAM_PORT:-8080}"
    local site_path="/etc/nginx/sites-available/${NGINX_SITE_NAME}"
    local server_names="${APP_SERVER_NAME:-}"

    if [ -z "$server_names" ]; then
        if [ -n "${APP_DOMAIN:-}" ]; then
            server_names="${APP_DOMAIN} ${APP_DOMAIN_ALIASES:-}"
        else
            server_names="_"
        fi
    fi

    sed \
        -e "s/__SERVER_NAMES__/${server_names}/g" \
        -e "s/__UPSTREAM_PORT__/${upstream_port}/g" \
        "$NGINX_TEMPLATE" | sudo tee "$site_path" >/dev/null

    sudo ln -sf "$site_path" "/etc/nginx/sites-enabled/${NGINX_SITE_NAME}"
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo nginx -t
    sudo systemctl reload nginx
}

setup_nginx() {
    log_info "Configuring host nginx as the public reverse proxy for the containerized app..."
    render_nginx_config
    log_info "Nginx configured. You can now access the app by public IP. Add APP_DOMAIN later if you want DNS and SSL."
}

enable_ssl() {
    check_env

    if [ -z "${APP_DOMAIN:-}" ]; then
        log_error "APP_DOMAIN is required for SSL. Let's Encrypt cannot issue certificates for a raw public IP."
        exit 1
    fi

    if [ -z "${LETSENCRYPT_EMAIL:-}" ]; then
        log_error "LETSENCRYPT_EMAIL is required for SSL certificate requests."
        exit 1
    fi

    render_nginx_config

    local certbot_args=()
    local domain
    for domain in ${APP_DOMAIN} ${APP_DOMAIN_ALIASES:-}; do
        certbot_args+=("-d" "$domain")
    done

    log_info "Requesting Let's Encrypt certificates for ${APP_DOMAIN} ${APP_DOMAIN_ALIASES:-}..."
    sudo certbot --nginx --non-interactive --agree-tos -m "$LETSENCRYPT_EMAIL" --redirect "${certbot_args[@]}"
    log_info "SSL enabled."
}

update() {
    ensure_docker_compose
    log_info "Updating ${APP_NAME} from git and redeploying..."
    backup
    git pull --ff-only origin main
    start
    log_info "Update complete."
}

status() {
    ensure_docker_compose
    log_info "Container status:"
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" ps
    echo
    log_info "Resource usage:"
    docker stats --no-stream $($DOCKER_COMPOSE -f "$COMPOSE_FILE" ps -q) 2>/dev/null || true
}

diagnose() {
    check_env
    ensure_docker_compose

    local upstream_port="${APP_UPSTREAM_PORT:-8080}"
    local site_path="/etc/nginx/sites-available/${NGINX_SITE_NAME}"

    log_info "Container status"
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" ps || true
    echo

    log_info "Host nginx status"
    sudo systemctl status nginx --no-pager -l || true
    echo

    log_info "Host nginx config test"
    sudo nginx -t || true
    echo

    log_info "Listening ports for 80 and ${upstream_port}"
    sudo ss -tulpn | grep -E ":80|:${upstream_port}" || true
    echo

    log_info "Rendered host nginx site config"
    if [ -f "$site_path" ]; then
        sudo cat "$site_path"
    else
        log_warn "${site_path} does not exist. Run ./deploy.sh setup-nginx"
    fi
    echo

    log_info "Curl test to containerized frontend upstream"
    curl -I --max-time 10 "http://127.0.0.1:${upstream_port}" || true
    echo

    log_info "Curl test to host nginx on port 80"
    curl -I --max-time 10 http://127.0.0.1 || true
    echo

    log_info "Recent host nginx error log"
    sudo tail -n 50 /var/log/nginx/error.log || true
}

help() {
    cat <<'EOF'
CORE CMS Deployment Script

Usage: ./deploy.sh [command]

Commands:
  setup         Install Docker, nginx, certbot, git, and curl on Ubuntu EC2
  build         Build application images
  start         Start the application stack on the local upstream port
  stop          Stop the application stack
  restart       Restart the application stack
  logs          Tail application logs
  seed          Seed the database through POST /api/seed
  backup        Create a MongoDB archive backup
    setup-nginx   Configure host nginx to proxy the public IP or domain to the app
    ssl           Request and enable Let's Encrypt certificates via nginx (domain required)
  update        Pull latest code, back up MongoDB, and redeploy
  status        Show container status and resource usage
    diagnose      Check host nginx, listening ports, and local HTTP reachability
  help          Show this help message
EOF
}

case "${1:-help}" in
    setup)
        setup
        ;;
    build)
        build
        ;;
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    logs)
        logs
        ;;
    seed)
        seed
        ;;
    backup)
        backup
        ;;
    setup-nginx)
        setup_nginx
        ;;
    ssl)
        enable_ssl
        ;;
    update)
        update
        ;;
    status)
        status
        ;;
    diagnose)
        diagnose
        ;;
    help|*)
        help
        ;;
esac
