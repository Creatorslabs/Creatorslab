'use client'
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const AdminSearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-black dark:text-white hidden 
                  p-1 md:flex gap-2 rounded-md items-center transition-all duration-300 
                  ${isExpanded ? "w-full" : "w-12"} sm:w-full md:max-w-[370px] md:w-full`}
    >
      <FiSearch
        className="cursor-pointer text-gray-500 dark:text-gray-300"
        onClick={() => setIsExpanded(true)}
      />
      <input
        type="text"
        className={`outline-none border-none bg-transparent px-1 text-xs 
                    text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 
                    transition-all duration-300 
                    ${isExpanded ? "w-full opacity-100" : "w-0 opacity-0 px-0"} 
                    sm:w-full sm:opacity-100`}
        placeholder="Search"
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
      />
    </div>
  );
};

export default AdminSearchBar;