import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`border border-[#3F3F3F] p-1 flex gap-1 rounded-md items-center transition-all duration-300
                ${isExpanded ? "w-full" : "w-10"} sm:w-full md:max-w-[450px] md:w-full`}
    >
      <FiSearch
        className={`cursor-pointer aspect-square`}
        onClick={() => setIsExpanded(true)}
      />
      <input
        type="text"
        className={`outline-none border-none bg-transparent px-1 text-xs transition-all duration-300
                    ${
                      isExpanded ? "w-full opacity-100" : "w-0 opacity-0 px-0"
                    } sm:w-full sm:opacity-100`}
        placeholder="Search projects, quests, creators"
        onBlur={() => setIsExpanded(false)} 
      />
    </div>
  );
};

export default SearchBar;
