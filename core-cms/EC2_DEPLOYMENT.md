# CORE CMS EC2 Deployment

This project is set up to run on a single EC2 instance with Docker Compose.

Traffic flow:

`browser -> host nginx (80/443) -> client container nginx (127.0.0.1:8080 on host) -> /api proxy -> server container -> mongodb container`

That keeps MongoDB and the Node API private to Docker while the browser calls the API with the same-origin path `/api`.

## 1. Launch the EC2 instance

- Use `Ubuntu 22.04 LTS`.
- Start with `t3.small` or `t3.medium`.
- Allocate `30-50 GB` gp3 storage.
- Attach an Elastic IP if you plan to use a domain.

Security group:

- Allow `22` only from your IP.
- Allow `80` from anywhere.
- Allow `443` from anywhere.
- Do not expose `5000` or `27017`.

## 2. Copy the project to the server

```bash
git clone <your-repo-url>
cd core-cms
chmod +x deploy.sh
```

## 3. Install host dependencies

```bash
./deploy.sh setup
```

If Docker was newly installed, reconnect your SSH session once so your user picks up the Docker group.

## 4. Configure production environment files

Create the deployment env files:

```bash
cp .env.example .env
cp server/.env.example server/.env
```

Update `.env`:

```env
COMPOSE_PROJECT_NAME=corecms
APP_BIND_IP=127.0.0.1
APP_UPSTREAM_PORT=8080
APP_DOMAIN=your-domain.com
APP_DOMAIN_ALIASES=www.your-domain.com
LETSENCRYPT_EMAIL=ops@your-domain.com
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=replace-with-a-long-random-password
VITE_API_URL=/api
```

Update `server/.env`:

```env
PORT=5000
NODE_ENV=production
JWT_SECRET=replace-with-a-long-random-jwt-secret
```

Notes:

- `VITE_API_URL=/api` is the correct production setting for this stack.
- The frontend does not call `localhost`; it calls `/api`, and the container nginx forwards that request to the backend container.
- Docker Compose injects the production MongoDB connection string automatically.

## 5. Build and start the application

```bash
./deploy.sh build
./deploy.sh start
./deploy.sh status
```

At this point the app is reachable only on the EC2 host at `http://127.0.0.1:8080`.

## 6. Seed the database once

```bash
./deploy.sh seed
```

Default admin after seed:

- `admin@core.com`
- `admin123`

Change that password immediately after initial login.

## 7. Put nginx in front of the app

Configure the host nginx reverse proxy:

```bash
./deploy.sh setup-nginx
```

This installs a site config based on [deploy/nginx/core-cms.conf.example](deploy/nginx/core-cms.conf.example) and proxies the public domain to the client container on `127.0.0.1:8080`.

## 8. Point DNS to the EC2 instance

- Create an `A` record for your domain to the Elastic IP.
- Wait for DNS to resolve before issuing certificates.

## 9. Enable HTTPS

```bash
./deploy.sh ssl
```

That requests Let's Encrypt certificates and updates nginx to redirect HTTP to HTTPS.

## 10. Operations

Common commands:

```bash
./deploy.sh logs
./deploy.sh backup
./deploy.sh restart
./deploy.sh update
```

## Why the API URL is `/api`

The frontend build now accepts a deployment-time `VITE_API_URL` and the EC2 deployment uses `/api`.

- Public browser request: `https://your-domain.com/api/...`
- Host nginx forwards to the client container
- The client container nginx proxies `/api` to `http://server:5000`

That avoids any direct browser dependency on `localhost` or a separate backend hostname.