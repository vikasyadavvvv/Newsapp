import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import HeroSection from "./components/HeroSection";
import CarouselSection from "./components/CarouselSection";
import { Newspaper } from "lucide-react";

function App() {
  const [latestNews, setLatestNews] = useState([]);
  const [olderNews, setOlderNews] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setError(null);
        setLoading(true);
        
        const [latestResponse, allResponse] = await Promise.all([
          axios.get("https://newsapp-theta-sandy.vercel.app/api/news/latest"),
          axios.get("https://newsapp-theta-sandy.vercel.app/api/news")
        ]);

        const latestArticles = Array.isArray(latestResponse.data) 
          ? latestResponse.data 
          : latestResponse.data?.articles || [];
        
        const allArticles = Array.isArray(allResponse.data) 
          ? allResponse.data 
          : allResponse.data?.articles || [];

        const sortedLatest = [...latestArticles].sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );

        const sortedAll = [...allArticles].sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );

        setLatestNews(sortedLatest);
        setOlderNews(sortedAll.slice(31));
      } catch (err) {
        console.error("Error fetching news:", {
          message: err.message,
          response: err.response?.data
        });
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

 const handleSearch = async (query) => {
  if (!query.trim()) {
    setSearchResults([]);
    setSearching(false);
    return;
  }

  setSearching(true);
  setError(null);
  try {
    const res = await axios.get(
      `https://newsapp-theta-sandy.vercel.app/api/news/search?query=${encodeURIComponent(query)}`
    );
    
    // Adjusting the response parsing based on your backend structure
    setSearchResults(res.data?.articles || []);
  } catch (err) {
    console.error("Search error:", err.message);
    setError("Search failed. Please try again.");
  } finally {
    setSearching(false);
  }
};

  return (
    <div className="dark">
      <div className="min-h-screen bg-black text-amber-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b border-amber-500/30 pb-4">
            <div className="flex items-center space-x-3">
              <Newspaper className="w-8 h-8 text-amber-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                News Portal
              </h1>
            </div>
          </div>

          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {error && (
            <div className="bg-amber-900/20 border border-amber-700 text-amber-400 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={() => {
                  setError(null);
                  fetchNews();
                }}
                className="font-medium hover:text-amber-300 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
              <p className="text-amber-500/80 text-lg font-medium">
                Loading news...
              </p>
            </div>
          ) : searching ? (
            <div className="text-center py-12 text-amber-500/80 text-lg font-medium">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-amber-400">
                Search Results ({searchResults.length})
              </h2>
              <HeroSection articles={searchResults} />
              <button
                onClick={() => setSearchResults([])}
                className="mt-4 text-amber-500 hover:text-amber-400 hover:underline transition-colors"
              >
                ← Back to all news
              </button>
            </>
          ) : (
            <>
              <HeroSection articles={latestNews.slice(0, 31)} />
              <CarouselSection 
                articles={olderNews} 
                title={
                  <span className="text-xl font-semibold text-amber-400">
                    Old Headlines
                  </span>
                } 
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;