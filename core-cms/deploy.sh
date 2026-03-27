#!/bin/bash

# CORE CMS Deployment Script
# This script helps deploy the application to production

echo "🚀 CORE CMS Deployment Script"
echo "=============================="

# Check if .env files exist
if [ ! -f "server/.env" ]; then
    echo "⚠️  Warning: server/.env not found. Copying from .env.example"
    cp server/.env.example server/.env
    echo "📝 Please edit server/.env with your production values"
fi

if [ ! -f "client/.env" ]; then
    echo "⚠️  Warning: client/.env not found. Copying from .env.example"
    cp client/.env.example client/.env
    echo "📝 Please edit client/.env with your production values"
fi

# Function to deploy with Docker
deploy_docker() {
    echo "🐳 Deploying with Docker Compose..."
    docker-compose down
    docker-compose build
    docker-compose up -d
    echo "✅ Deployment complete!"
    echo "🌐 Website: http://localhost"
    echo "🔧 API: http://localhost:5000"
}

# Function to deploy manually
deploy_manual() {
    echo "📦 Manual Deployment"
    
    # Install server dependencies
    echo "📥 Installing server dependencies..."
    cd server
    npm install --production
    
    # Install client dependencies and build
    echo "📥 Installing client dependencies..."
    cd ../client
    npm install
    
    echo "🔨 Building client..."
    npm run build
    
    cd ..
    
    echo "✅ Build complete!"
    echo ""
    echo "To start the server:"
    echo "  cd server && npm start"
    echo ""
    echo "To serve the client (using a static server like nginx or serve):"
    echo "  cd client/dist && npx serve"
}

# Main menu
echo ""
echo "Select deployment method:"
echo "1) Docker Compose (recommended)"
echo "2) Manual deployment"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        deploy_docker
        ;;
    2)
        deploy_manual
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac
