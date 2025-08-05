import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        type="text"
        placeholder="Search news..."
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                   placeholder-gray-400 dark:placeholder-gray-500 transition duration-200 ease-in-out"
        value={query}
        onChange={handleInput}
      />
    </div>
  );
};

export default SearchBar;

