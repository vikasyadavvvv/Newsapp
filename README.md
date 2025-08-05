# News Aggregator App

A full-stack application that fetches, stores, and displays news articles from various sources.

![News App Screenshot](https://github.com/user-attachments/assets/aa370375-0c2f-4b92-8712-83135dd438ac)
![News App Mobile View](https://github.com/user-attachments/assets/538c16a2-94d5-42ca-ba38-21261baec42f)

## Live Demo
🔗 [https://newsappfrontend-ten.vercel.app/](https://newsappfrontend-ten.vercel.app/)

## Features

### Core Functionality
- Real-time news fetching from NewsAPI
- MongoDB storage for persistent article data
- Comprehensive API endpoints for data access

### Backend Features
- RESTful API built with Node.js and Express
- Endpoints for:
  - `/api/articles` - Get all articles
  - `/api/articles/latest` - Get latest articles
  - `/api/articles/search` - Search articles by keyword
- Automatic data refresh mechanism

### Frontend Features
- Modern React interface with Tailwind CSS
- Responsive design for all device sizes
- Interactive components:
  - Hero section showcasing latest news
  - Article grid with hover effects
  - Powerful search functionality
  - Loading states and error handling

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios for API calls
- React Icons

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB ODM)

### Database
- MongoDB Atlas (Cloud Database)

### Deployment
- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- NewsAPI key (free tier available)


### Installation


1. Clone the repository:
```bash
git clone https://github.com/vikasyadavvvv/Newsapp.git
cd Newsapp
cd backend
npm install
cd ../frontend
npm install
```bash
git clone https://github.com/vikasyadavvvv/Newsapp.git
cd Newsapp
```

2. Create .env file in backend directory:
```bash
MONGO_URI=your_mongodb_connection_string
NEWS_API_KEY=your_newsapi_key
PORT=5000
```
3. For local development, update the API base URL in frontend/src/App.jsx: "https://newsapp-theta-sandy.vercel.app" to  "http://localhost:5000" Everywhere


