# NewsBlog 

A personalized news aggregation platform that delivers curated news content based on your interests. Stay informed with news from multiple trusted sources in your preferred categories.

## Features 

- **Personalized News Feed**: Select your preferred categories during registration and get a customized news experience
- **Category Selection**: Choose from Health, Technology, Sports, and Finance categories
- **Global News Access**: Browse news from all categories beyond your personal preferences
- **User Authentication**: Secure account creation and login system
- **Multiple News Sources**: Aggregated content from NewsAPI, The Guardian, and New York Times
- **Direct Source Links**: Click through to read full articles on the original news websites

## Tech Stack 

### Frontend
- **React** - User interface framework
- **Tailwind CSS** - Utility-first CSS framework for styling

### Backend
- **Node.js** with **Express** - Server-side framework
- **JWT** - JSON Web Token for authentication
- **bcrypt** - Password hashing
- **cookie-parser** - Cookie handling middleware

### Database
- **MongoDB** - NoSQL database for user data and preferences

### News Sources
- **NewsAPI** - Global news API
- **The Guardian API** - British news source
- **New York Times API** - American news source

## Project Structure 

```
newsblog/
├── client/          # React frontend
├── server/          # Express backend
├── docker-compose.yml
└── README.md
```

## Getting Started 

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)
- Docker (for containerized deployment)

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone repo
   cd newsblog
   ```

2. **Install dependencies**
   
   For the backend:
   ```bash
   cd server
   npm install
   ```
   
   For the frontend:
   ```bash
   cd client
   npm install
   ```

3. **Start the development servers**
   
   Start the backend server:
   ```bash
   cd server
   npm run dev
   ```
   
   Start the frontend server (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Docker Deployment 

### Using Docker Compose

1. **Clone the repository**
   ```bash
   git clone repo
   cd newsblog
   ```

2. **Create environment file**
   Create a `.env` file in the `server` directory with your API keys and configuration.

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

### Docker Services

The application consists of three main services:

- **newsblog-frontend**: React application served via Nginx
- **newsblog-backend**: Express server with API endpoints
- **newsblog-mongo**: MongoDB database instance

### Docker Commands

```bash
# Start all services
docker-compose up

# Start services in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild and start services
docker-compose up --build

# View logs
docker-compose logs [service-name]

# Remove all containers and volumes
docker-compose down -v
```
## Usage Guide 

1. **Registration**: Create an account and select at least two categories from Health, Technology, Sports, and Finance
2. **Login**: Access your account with your credentials
3. **Personal Feed**: View news tailored to your selected categories on the homepage
4. **Global News**: Click the "Global News" button to explore news from all categories
5. **Read Articles**: Click on any news article to read the full content on the original news website

## Development Scripts 

### Frontend (client/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests

### Backend (server/)
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run test` - Run tests




I obtain my API keys from:

1. **NewsAPI**: Visit [newsapi.org](https://newsapi.org) to get your free API key
2. **The Guardian**: Get your API key from [The Guardian Open Platform](https://open-platform.theguardian.com)
3. **New York Times**: Register at [NYT Developer Portal](https://developer.nytimes.com) for API access





**Happy reading! 📚✨**
