# CORE CMS - Holiday Home Management Website

A full-stack React + Node.js CMS application for managing a holiday home business website in Dubai.

## Features

### Public Website
- **Homepage** - Hero section, stats, features, testimonials, CTA
- **Revenue Management** - Service details, process, results
- **Operations** - Operations services, quality standards
- **About** - Company story, mission, vision, team
- **Pricing** - Pricing plans with comparison table
- **Contact** - Contact form with validation
- **Blog** - Blog listing and individual post pages

### Admin Panel
- **Dashboard** - Overview with stats and recent content
- **Pages** - Edit all website pages (content & SEO)
- **Blog Posts** - Create, edit, delete blog posts
- **Case Studies** - Manage client success stories
- **Testimonials** - Manage client testimonials
- **Settings** - Site configuration, contact info, social links

## Tech Stack

### Frontend
- React 18 with Vite
- React Router for routing
- TanStack Query (React Query) for data fetching
- Zustand for state management
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

## Project Structure

```
core-cms/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   │   ├── admin/      # Admin panel pages
│   │   ├── lib/            # API client & utilities
│   │   ├── stores/         # Zustand stores
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env                # Environment variables
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd core-cms
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Set up environment variables**

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/core-cms
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

5. **Seed the database**
```bash
cd server
npm run seed
```

This creates:
- Default admin user (admin@core.com / admin123)
- Default pages with content
- Sample blog posts, case studies, and testimonials

### Running the Application

**Development Mode (both frontend and backend):**

1. Start the server:
```bash
cd server
npm run dev
```

2. In a new terminal, start the client:
```bash
cd client
npm run dev
```

3. Open http://localhost:5173 for the website
4. Open http://localhost:5173/admin for the admin panel

**Default Admin Credentials:**
- Email: `admin@core.com`
- Password: `admin123`

## Deployment

### Option 1: Deploy to Render/Railway/Heroku

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy Backend**
- Create a new web service on Render/Railway/Heroku
- Connect your GitHub repository
- Set root directory to `server`
- Add environment variables (MONGODB_URI, JWT_SECRET)
- Deploy

3. **Deploy Frontend**
- Create a new static site on Render/Netlify/Vercel
- Connect your GitHub repository
- Set root directory to `client`
- Set build command: `npm run build`
- Set publish directory: `dist`
- Add environment variable: `VITE_API_URL=https://your-api-url.com/api`
- Deploy

### Option 2: Deploy to a Single EC2 Instance with Docker Compose

This repo is now set up for the common POC layout:

- host nginx handles `80/443`
- the client container is exposed only on `127.0.0.1:8080`
- the client container nginx proxies `/api` to the backend container
- the backend and MongoDB stay private inside Docker

See [EC2_DEPLOYMENT.md](EC2_DEPLOYMENT.md) for the full step-by-step guide.

Quick path:

```bash
cp .env.example .env
cp server/.env.example server/.env
chmod +x deploy.sh
./deploy.sh setup
./deploy.sh build
./deploy.sh start
./deploy.sh seed
./deploy.sh setup-nginx
./deploy.sh ssl
```

### Option 3: Manual VPS Deployment

1. **Build the client:**
```bash
cd client
npm run build
```

2. **Upload to server:**
- Upload `server/` directory
- Upload `client/dist/` directory

3. **Install and start:**
```bash
cd server
npm install --production
npm start
```

4. **Configure Nginx** (recommended):
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        root /path/to/client/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register (admin only)

### Public Endpoints
- `GET /api/pages` - Get all pages
- `GET /api/pages/:slug` - Get page by slug
- `GET /api/blog-posts` - Get all blog posts
- `GET /api/blog-posts/:slug` - Get blog post by slug
- `GET /api/case-studies` - Get all case studies
- `GET /api/case-studies/:slug` - Get case study by slug
- `GET /api/testimonials` - Get all testimonials
- `GET /api/settings` - Get site settings

### Admin Endpoints (require authentication)
- `GET /api/admin/pages` - Get all pages (admin)
- `POST /api/admin/pages` - Create page
- `PUT /api/admin/pages/:id` - Update page
- `DELETE /api/admin/pages/:id` - Delete page
- `GET /api/admin/blog-posts` - Get all blog posts (admin)
- `POST /api/admin/blog-posts` - Create blog post
- `PUT /api/admin/blog-posts/:id` - Update blog post
- `DELETE /api/admin/blog-posts/:id` - Delete blog post
- Similar endpoints for case-studies, testimonials, and settings

## Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/core-cms
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Customization

### Changing Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: '#4353FF',  // Change this
  // ...
}
```

### Adding New Pages
1. Create page component in `client/src/pages/`
2. Add route in `client/src/App.jsx`
3. Add page to database via admin panel or seed data

### Modifying Content
All content is editable through the admin panel at `/admin`.

## License

MIT
