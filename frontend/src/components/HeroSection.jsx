import React from "react";
import { ExternalLink } from "lucide-react";

const HeroSection = ({ articles }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return isNaN(date) ? "" : date.toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        📰 Top Headlines
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300"
          >
            {a.urlToImage && (
              <img
                src={a.urlToImage}
                alt={a.title}
                className="w-full h-52 object-cover"
              />
            )}

            <div className="p-5 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                  {a.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                  {a.description}
                </p>
                {/* ✅ Published Date */}
                {a.publishedAt && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    📅 {formatDate(a.publishedAt)}
                  </p>
                )}
              </div>

              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-200"
              >
                Read more
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;



