# CORE CMS EC2 Deployment

This project is set up to run on a single EC2 instance with Docker Compose.

Traffic flow:

`browser -> host nginx (80/443) -> client container nginx (127.0.0.1:8080 on host) -> /api proxy -> server container -> MongoDB Atlas`

That keeps the Node API private to Docker while the browser calls the API with the same-origin path `/api`.

## 1. Launch the EC2 instance

- Use `Ubuntu 22.04 LTS`.
- Start with `t3.small` or `t3.medium`.
- Allocate `30-50 GB` gp3 storage.
- Attach an Elastic IP if you want a stable public IP.

Security group for public-IP access:

- Allow `22` only from your IP.
- Allow `80` from anywhere.
- Allow `443` only if you later add a domain and SSL.
- Do not expose `5000`.

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
APP_SERVER_NAME=_
APP_DOMAIN=
APP_DOMAIN_ALIASES=
LETSENCRYPT_EMAIL=
VITE_API_URL=/api
```

Update `server/.env`:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/core-cms?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-long-random-jwt-secret
```

Notes:

- `VITE_API_URL=/api` is the correct production setting for this stack.
- The frontend does not call `localhost`; it calls `/api`, and the container nginx forwards that request to the backend container.
- The Atlas connection is read from `server/.env` via `MONGODB_URI`.
- `APP_SERVER_NAME=_` tells host nginx to accept requests by public IP without requiring a domain.

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

For your current setup, access the app as:

`http://<ec2-public-ip>`

## 8. Optional: add a domain later

- Set `APP_DOMAIN=your-domain.com`
- Set `APP_DOMAIN_ALIASES=www.your-domain.com` if needed
- Set `LETSENCRYPT_EMAIL=ops@your-domain.com`
- Point DNS `A` records to the Elastic IP

## 9. Optional: enable HTTPS

```bash
./deploy.sh ssl
```

That requests Let's Encrypt certificates and updates nginx to redirect HTTP to HTTPS. This step requires a real domain name and does not work with a raw public IP.

## 10. Operations

Common commands:

```bash
./deploy.sh logs
./deploy.sh backup
./deploy.sh restart
./deploy.sh update
./deploy.sh diagnose
```

## 11. If the public IP does not open

The most common causes are host-level, not container-level.

Run:

```bash
./deploy.sh diagnose
```

Check these specifically:

- The EC2 security group allows inbound `80`.
- `./deploy.sh setup-nginx` completed successfully.
- Host nginx is running.
- `curl -I http://127.0.0.1:8080` works on the EC2 host.
- `curl -I http://127.0.0.1` works on the EC2 host.

If `127.0.0.1:8080` works but the public IP does not, the problem is almost certainly one of these:

- nginx was not configured or not running
- security group inbound `80` is blocked
- the instance has no public IP or Elastic IP attached
- a network ACL or host firewall is blocking port `80`

## Why the API URL is `/api`

The frontend build now accepts a deployment-time `VITE_API_URL` and the EC2 deployment uses `/api`.

- Public browser request: `http://<ec2-public-ip>/api/...` now, or `https://your-domain.com/api/...` later
- Host nginx forwards to the client container
- The client container nginx proxies `/api` to `http://server:5000`

That avoids any direct browser dependency on `localhost` or a separate backend hostname.