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
const NEWS_API_KEY = process.env.NEWS_API_KEY; // Changed to NewsAPI key

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Fetch and store articles from NewsAPI
app.get("/api/fetch-news", async (req, res) => {
  try {
const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=100&apiKey=${NEWS_API_KEY}`;    console.log("Fetching news from:", apiUrl);

    const response = await axios.get(apiUrl);
    console.log("Raw API response:", response.data); // Debug log

    // Check if articles exist in the response
    if (!response.data || !response.data.articles || response.data.articles.length === 0) {
      return res.status(200).json({
        message: "No current articles found",
        debug: {
          status: response.data?.status,
          totalResults: response.data?.totalResults,
          apiResponse: response.data
        }
      });
    }

    // Format articles for MongoDB
    const formattedArticles = response.data.articles.map(article => ({
      title: article.title || "Untitled",
      description: article.description || "No description available",
      content: article.content || "",
      url: article.url || "#",
      urlToImage: article.urlToImage || null,
      publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
      source: {
        name: article.source?.name || "Unknown source",
        id: article.source?.id || null
      }
    }));

    console.log(`Formatted ${formattedArticles.length} articles`);

    // Clear old articles and save new ones
    await News.deleteMany({});
    const savedArticles = await News.insertMany(formattedArticles);

    return res.status(200).json({
      message: "Successfully fetched and stored articles",
      count: savedArticles.length,
      sample: savedArticles[0]
    });

  } catch (error) {
    console.error("Full error:", {
      message: error.message,
      response: error.response?.data
    });
    return res.status(500).json({
      error: "Failed to fetch news",
      details: error.response?.data?.message || error.message
    });
  }
});
// Get all articles
app.get("/api/news", async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    res.json({
      count: news.length,
      articles: news
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// Get latest 10 news
app.get("/api/news/latest", async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 }).limit(10);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch latest news" });
  }
});

// Search news by title or description
app.get("/api/news/search", async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchText = query.trim();
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const results = await News.find({
      $or: [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
      ],
    })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      count: results.length,
      articles: results,
    });
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));