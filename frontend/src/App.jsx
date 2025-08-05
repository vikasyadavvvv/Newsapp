import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import HeroSection from "./components/HeroSection";
import CarouselSection from "./components/CarouselSection";
import { Sun, Moon } from "lucide-react";

function App() {
  const [latestNews, setLatestNews] = useState([]);
  const [olderNews, setOlderNews] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
  const fetchNews = async () => {
    try {
      const latest = await axios.get("https://newsappbackend-lake.vercel.app/api/news/latest");
      const all = await axios.get("https://newsappbackend-lake.vercel.app/api/news");

      // Sort by publishedAt (descending)
      const sortedLatest = latest.data.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      const sortedAll = all.data.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      setLatestNews(sortedLatest);
      setOlderNews(sortedAll.slice(5)); // anything after top 5
    } catch (err) {
      console.error("Error fetching news:", err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchNews();
}, []);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    try {
      const res = await axios.get(`https://newsappbackend-lake.vercel.app/api/news/search?query=${query}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search error:", err.message);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-6 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
              📰 News Portal
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:scale-110 transition"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
            </button>
          </div>

          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          {loading ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12 text-lg font-medium">
              Loading news...
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Search Results
              </h2>
              <HeroSection articles={searchResults} />
            </>
          ) : (
            <>
              <HeroSection articles={latestNews} />
              <CarouselSection articles={olderNews} />
            </>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default App;


