import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

import News from "./models/News.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const MEDIASTACK_API_KEY = process.env.MEDIASTACK_API_KEY; // ✅ Use this in your .env

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Fetch and store articles from MediaStack
app.get("/api/fetch-news", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.mediastack.com/v1/news?access_key=${MEDIASTACK_API_KEY}&languages=en&countries=in&limit=20`
    );

    const articles = response.data.data;

    const formattedArticles = articles.map(article => ({
      title: article.title,
      description: article.description,
      content: article.description || "", // MediaStack doesn’t return separate content
      url: article.url,
      urlToImage: article.image || null,
      publishedAt: new Date(article.published_at),
      source: {
        name: article.source || "Unknown",
        url: article.url
      }
    }));

    const savedArticles = await News.insertMany(formattedArticles, { ordered: false }).catch(() => []);
    res.status(200).json({ message: "Articles stored", count: savedArticles.length });
  } catch (error) {
    console.error("Error fetching from MediaStack:", error.message);
    res.status(500).json({ message: "Error fetching news", error: error.message });
  }
});

// Get all articles
app.get("/api/news", async (req, res) => {
  const news = await News.find().sort({ publishedAt: -1 });
  res.json(news);
});

// Get latest 5 news
app.get("/api/news/latest", async (req, res) => {
  const news = await News.find().sort({ publishedAt: -1 }).limit(10);
  res.json(news);
});

// Search news by title or description
app.get("/api/news/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  const results = await News.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ]
  }).sort({ publishedAt: -1 });

  res.json(results);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));