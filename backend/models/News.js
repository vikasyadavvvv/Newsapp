// Example model (models/News.js)
import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  source: {
    id: String,
    name: String
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String
}, { timestamps: true });

export default mongoose.model("News", newsSchema);