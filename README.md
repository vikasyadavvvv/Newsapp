# News App

A full-stack application that fetches news from external APIs, stores them in MongoDB, and displays them on a React frontend.

![News App Screenshot](<img width="1877" height="950" alt="image" src="https://github.com/user-attachments/assets/aa370375-0c2f-4b92-8712-83135dd438ac" />  <img width="1872" height="587" alt="image" src="https://github.com/user-attachments/assets/538c16a2-94d5-42ca-ba38-21261baec42f" />

) <!-- Replac

## Features
- Fetches news from NewsAPI
- Stores articles in MongoDB
- Backend API endpoints for:
  - All articles
  - Latest articles
  - Search functionality
- Frontend with:
  - Hero section for latest articles
  - Responsive grid for all articles
  - Search functionality

## Tech Stack
- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB


## Setup
## .env
```
MONGO_URI=
NEWS_API_KEY=

```

```
git clone https://github.com/vikasyadavvvv/Newsapp.git
cd news-app

cd backend
npm init -y
npm install
nodemon index.js

cd..
cd frontend
npm install
npm run dev
