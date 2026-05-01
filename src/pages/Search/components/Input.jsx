import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../../context/SearchContext";
import Suggestions from "./Suggestions";

const Input = () => {
  const navigate = useNavigate();
  const hideTimer = useRef(null);
  const [visible, setVisible] = useState(false);
  const {
    clearSuggestions,
    isLoadingSuggestions,
    query,
    setQuery,
    submitSearch,
  } = useSearch();

  useEffect(() => {
    return () => {
      clearTimeout(hideTimer.current);
    };
  }, []);

  const hideSuggestions = () => {
    hideTimer.current = setTimeout(() => setVisible(false), 150);
  };

  const handleSubmit = async () => {
    const didSearch = await submitSearch();

    if (!didSearch) {
      return;
    }

    clearTimeout(hideTimer.current);
    setVisible(false);
    clearSuggestions();
    navigate("/Home");
  };

  return (
    <div className="wrapper flex h-40 w-full flex-col items-center justify-center gap-4 md:h-80 lg:h-60">
      <h1 className="text-4xl font-bold text-white md:text-4xl lg:text-5xl">
        Explore the Atmosphere
      </h1>

      <div className="w-full max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={query}
            placeholder="Search for a city or airport..."
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(true);
            }}
            onFocus={() => {
              clearTimeout(hideTimer.current);
              setVisible(true);
            }}
            onBlur={hideSuggestions}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
              }
            }}
            className="h-14 w-full rounded-full border border-white/10 backdrop-blur-3xl bg-black/40 px-6 pr-16 text-base text-gray-100 outline-none transition focus:border-white/30 md:h-16 md:px-8 md:text-lg lg:h-18 lg:text-xl"
          />

          {/* <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleSubmit}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-300 text-black transition hover:scale-105 hover:bg-yellow-200"
            aria-label="Search city weather"
          >
            <Search size={18} />
          </button> */}

          <Suggestions visible={visible} setVisible={setVisible} />
        </div>

        <div className="mt-3 h-5 px-2 text-sm text-gray-300">
          {isLoadingSuggestions && query.trim().length >= 2
            ? "Finding the best matches..."
            : query.trim().length >= 2
              ? "Press Enter or choose a suggestion."
              : "Type at least 2 characters to see suggestions."}
        </div>
      </div>
    </div>
  );
};

export default Input;
