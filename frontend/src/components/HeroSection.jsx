import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

const HeroSection = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return isNaN(date) ? "" : date.toLocaleDateString(undefined, options);
  };

  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = articles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-amber-50/30 dark:bg-black transition-colors duration-300">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-8">
        Top Headlines
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedArticles.map((article, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 border border-amber-100 dark:border-amber-500/20"
          >
            {article.urlToImage && (
              <div className="relative pt-[56.25%] overflow-hidden">
                <img
                  src={article.urlToImage}
                  alt={article.title || "News image"}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <div className="p-5 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-amber-50 line-clamp-2">
                  {article.title || "No title available"}
                </h2>
                <p className="text-sm text-gray-600 dark:text-amber-100/80 mt-2 line-clamp-3">
                  {article.description || "No description available."}
                </p>
                {article.publishedAt && (
                  <p className="text-xs text-amber-600 dark:text-amber-400/80 mt-3 flex items-center">
                    <span className="mr-1">🗓</span>
                    {formatDate(article.publishedAt)}
                  </p>
                )}
              </div>

              {article.url ? (
                <button
                  onClick={() => window.open(article.url, "_blank", "noopener,noreferrer")}
                  className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500/90 dark:hover:bg-amber-600 px-4 py-2 rounded-lg transition duration-200 group w-fit"
                >
                  Read more
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <div className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
                  No link available
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-700 text-white disabled:opacity-50"
        >
          ← Prev
        </button>
        <span className="text-amber-400 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-700 text-white disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
