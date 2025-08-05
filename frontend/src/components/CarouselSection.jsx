import React, { useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, Clock } from "lucide-react";

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
    <section className="mt-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 flex items-center">
          <span className="bg-amber-500/10 p-2 rounded-lg mr-3">
            <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </span>
          {title}
        </h2>
        
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="p-2 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 dark:hover:bg-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
              className="p-2 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 dark:hover:bg-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

      {/* Mobile pagination dots */}
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

const ArticleCard = ({ article }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col border border-amber-100 dark:border-amber-500/20">
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

    <div className="p-4 flex flex-col flex-grow">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-amber-50 mb-2 line-clamp-3">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-gray-600 dark:text-amber-100/80 text-sm line-clamp-2 mb-3">
            {article.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-xs text-amber-600 dark:text-amber-400/80">
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
        >
          Read <ExternalLink className="ml-1 w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
);

export default CarouselSection;