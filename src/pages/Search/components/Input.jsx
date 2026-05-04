import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../../context/SearchContext";
import Suggestions from "./Suggestions";
import { motion } from "framer-motion";

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
      <motion.h1
        className="text-2xl font-bold text-white md:text-4xl lg:text-5xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        viewport={{ once: true }}
      >
        Explore the Atmosphere
      </motion.h1>

      <div className="w-full max-w-2xl">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2,
          }}
          view={{ once: true, amount: 0.2 }}
        >
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

          <Suggestions visible={visible} setVisible={setVisible} />
        </motion.div>

        <motion.div
          className="mt-3 h-5 px-2 text-sm text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.3,
          }}
          view={{ once: true, amount: 0.2 }}
        >
          {isLoadingSuggestions && query.trim().length >= 2
            ? "Finding the best matches..."
            : query.trim().length >= 2
              ? "Press Enter or choose a suggestion."
              : "Type at least 2 characters to see suggestions."}
        </motion.div>
      </div>
    </div>
  );
};

export default Input;
