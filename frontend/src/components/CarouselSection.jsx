import React, { useState } from "react";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

const CarouselSection = ({ articles, title = "More Headlines" }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const visibleArticles = articles.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="mt-12 px-4 sm:px-6 lg:px-8 bg-amber-50/30 dark:bg-black transition-colors duration-300 py-8 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent flex items-center">
          <span className="p-2 rounded-lg mr-3 bg-amber-500/10 dark:bg-amber-400/10">
            <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </span>
          {title}
        </h2>

        {totalPages > 1 && (
          <div className="flex items-center space-x-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="p-2 rounded-full bg-amber-600/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 hover:bg-amber-600/20 dark:hover:bg-amber-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              {currentPage + 1} / {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-full bg-amber-600/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 hover:bg-amber-600/20 dark:hover:bg-amber-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleArticles.map((article, idx) => (
          <ArticleCard key={idx} article={article} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 sm:hidden">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                currentPage === idx
                  ? "bg-amber-600 dark:bg-amber-400"
                  : "bg-amber-300 dark:bg-amber-600/30"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const ArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "" : date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 border border-amber-100 dark:border-amber-500/20 flex flex-col">
      {article.urlToImage && (
        <div className="relative pt-[56.25%] overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-5 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-amber-50 line-clamp-2">
            {article.title}
          </h3>
          {article.description && (
            <p className="text-sm text-gray-600 dark:text-amber-100/80 mt-2 line-clamp-3">
              {article.description}
            </p>
          )}
          {article.publishedAt && (
            <p className="text-xs text-amber-600 dark:text-amber-400/80 mt-3 flex items-center">
              <span className="mr-1">🗓</span>
              {formatDate(article.publishedAt)}
            </p>
          )}
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500/90 dark:hover:bg-amber-600 px-4 py-2 rounded-lg transition duration-200 group"
        >
          Read more
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default CarouselSection;
