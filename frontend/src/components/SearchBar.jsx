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
        <Search className="w-5 h-5 text-amber-500 dark:text-amber-400" />
      </div>
      <input
        type="text"
        placeholder="Search news..."
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-amber-500/30 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent 
                   bg-white dark:bg-gray-900 text-gray-800 dark:text-amber-50 
                   placeholder-gray-400 dark:placeholder-amber-300/70 transition-all duration-200 ease-in-out"
        value={query}
        onChange={handleInput}
      />
    </div>
  );
};

export default SearchBar;

