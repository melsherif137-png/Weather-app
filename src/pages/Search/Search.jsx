import React from "react";
import Input from "./components/Input";
import RecentSearches from "./components/RecentSearches";
import SearchPageFooterWidget from "./components/SearchWightFooter";

const Search = () => {
  return (
    <div
      className={`content
      mt-13
      lg:mt-0
      md:mt-0
      flex flex-col
      min-h-screen
      lg:p-6 md:p-4 p-4
      w-full
      transition-all duration-300 ease-in-out overflow-hidden
      `}
    >
      <Input />
      <RecentSearches />
      <SearchPageFooterWidget />
    </div>
  );
};

export default Search;
