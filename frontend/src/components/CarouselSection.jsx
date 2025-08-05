import React from "react";
import { ExternalLink } from "lucide-react";

const CarouselSection = ({ articles }) => {
  return (
    <section className="mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        🕰️ Older News
      </h2>

      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        {articles.map((a, idx) => (
          <div
            key={idx}
            className="min-w-[260px] bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
          >
            {a.urlToImage && (
              <img
                src={a.urlToImage}
                alt={a.title}
                className="w-full h-36 object-cover"
              />
            )}

            <div className="p-4 flex flex-col justify-between h-full">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                {a.title}
              </h3>

              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Read <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarouselSection;
