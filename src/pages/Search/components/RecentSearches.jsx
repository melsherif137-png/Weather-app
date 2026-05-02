import React from "react";
import RecentGrid from "./RecentGrid";
import { useSearch } from "../../../context/SearchContext";
import { Trash2 } from "lucide-react";

const RecentSearches = () => {
  const { recentCities, setRecentCities } = useSearch();

  const handleClear = () => {
    setRecentCities([]);
  };

  return (
    <div
      className="
      min-h-screen
      overflow-hidden
        text-white mt-6
        px-4 sm:px-5 lg:px-8
        py-5 sm:py-6
        rounded-[28px]
        border border-white/10
        bg-gradient-to-br from-[#111320]/55 to-[#090b14]/55 backdrop-blur-2xl
        backdrop-blur-2xl
        shadow-[0_0_60px_rgba(0,0,0,0.35)]
      "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-7">
        <div>
          <h1
            className="
              text-xl sm:text-2xl lg:text-3xl
              font-bold tracking-tight
            "
          >
            Recent Searches
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />

              <p
                className="
                  text-sm sm:text-base lg:text-md
                  text-gray-400
                "
              >
                Quick access to your locations
              </p>
            </div>

            {recentCities.length > 0 && (
              <div
                className="
                min-h-full
                  px-3 py-1
                  rounded-xl
                  text-indigo-300
                  text-sm sm:text-base
                  border border-indigo-500/20
                  bg-indigo-500/10
                "
              >
                {recentCities.length} cities
              </div>
            )}
          </div>
        </div>

        {recentCities.length > 0 && (
          <button
            onClick={handleClear}
            className="
              flex items-center justify-center gap-2
              w-full sm:w-auto
              px-5 py-3
              rounded-2xl
              border border-white/15
              bg-white/5
              hover:bg-white/10
              transition-all duration-300
              text-white
              text-sm sm:text-base lg:text-[15px]
              font-medium
              cursor-pointer
            "
          >
            <Trash2 size={15} />
            Clear All
          </button>
        )}
      </div>

      {/* Empty State */}
      {recentCities.length === 0 ? (
        <div
          className="
          min-h-full
            text-center
            py-16
            rounded-3xl
            border border-dashed border-white/10
            bg-white/[0.03]
          "
        >
          <p
            className="
              text-2xl sm:text-3xl
              font-semibold text-gray-200
            "
          >
            No recent searches yet
          </p>

          <p
            className="
              text-sm sm:text-base
              text-gray-500 mt-3
            "
          >
            Start searching for a city 🌍
          </p>
        </div>
      ) : (
        <RecentGrid />
      )}
    </div>
  );
};

export default RecentSearches;
