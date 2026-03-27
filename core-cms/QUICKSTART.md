# CORE CMS - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Configure Environment

```bash
# In the server directory, create .env file
cd ../server
cp .env.example .env

# Edit the .env file with your settings
# At minimum, you need:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (a random secret key)
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running on your machine
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and get your connection string
3. Update `MONGODB_URI` in `server/.env`

### Step 4: Seed the Database

```bash
cd server
npm run seed
```

This creates:
- Admin user: `admin@core.com` / `admin123`
- Default pages with content
- Sample blog posts, case studies, and testimonials

### Step 5: Start the Application

**Terminal 1 - Start Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Client:**
```bash
cd client
npm run dev
```

### Step 6: Access the Application

- 🌐 **Website**: http://localhost:5173
- 🔐 **Admin Panel**: http://localhost:5173/admin
- 📊 **API**: http://localhost:5000

**Default Admin Login:**
- Email: `admin@core.com`
- Password: `admin123`

---

## 📁 Project Structure

```
core-cms/
├── client/          # React frontend
│   ├── src/
│   │   ├── pages/   # Website pages
│   │   ├── components/
│   │   └── pages/admin/  # Admin panel
│   └── package.json
├── server/          # Node.js backend
│   ├── server.js    # Main server file
│   └── package.json
└── docker-compose.yml
```

---

## 🐳 Deploy with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🌐 Deploy to Production

### Render.com (Recommended - Free Tier)

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Create Web Service for backend
4. Create Static Site for frontend
5. Add environment variables

### Railway.app

1. Push code to GitHub
2. Deploy from GitHub on Railway
3. Add MongoDB plugin
4. Configure environment variables

### VPS (DigitalOcean, Linode, etc.)

1. Clone repository on server
2. Install Node.js and MongoDB
3. Run `./deploy.sh` and select manual deployment
4. Configure Nginx as reverse proxy

---

## 📝 Customization

### Change Brand Colors

Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: '#4353FF',  // Your brand color
}
```

### Update Site Information

Go to `/admin/settings` in the admin panel to update:
- Site name and description
- Contact information
- Social media links

### Add/Edit Content

All content is managed through the admin panel:
- **Pages** - Edit website page content
- **Blog** - Create and manage blog posts
- **Case Studies** - Add client success stories
- **Testimonials** - Manage customer reviews

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```
Make sure MongoDB is running:
- Local: mongod
- Atlas: Check your connection string
```

### Port Already in Use
```
# Change ports in .env files
PORT=5001  # Use different port
```

### CORS Errors
```
Make sure VITE_API_URL in client/.env matches your server URL
```

---

## 📚 Documentation

- Full README: [README.md](README.md)
- API Documentation: See server.js for all endpoints

---

## 💬 Support

For issues or questions, please check the README.md or create an issue on GitHub.
