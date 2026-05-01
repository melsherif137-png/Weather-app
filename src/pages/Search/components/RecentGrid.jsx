import React from "react";
import { useSearch } from "../../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { MapPin, Thermometer, Wind } from "lucide-react";

const RecentGrid = () => {
  const { recentCities, selectSuggestion } = useSearch();
  const navigate = useNavigate();

  const handleClick = async (city) => {
    const didSelect = await selectSuggestion(city);
    if (!didSelect) return;
    navigate("/Home");
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 mt-8">
      {recentCities.map((city, index) => (
        <div
          key={`${city.name}-${city.lat}-${city.lon}`}
          onClick={() => handleClick(city)}
          className="
            group cursor-pointer
            relative rounded-2xl p-4
            bg-white/5 border border-white/10
            backdrop-blur-2xl
            hover:bg-white/10 hover:border-white/20
            hover:scale-[1.03] active:scale-[0.98]
            transition-all duration-200
            flex flex-col gap-2
          "
        >
          {/* Top row: icon + country */}
          <div className="flex items-center justify-between">
            <div
              className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/20
                            flex items-center justify-center text-indigo-300"
            >
              <MapPin size={15} />
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
              {city.country}
            </span>
          </div>

          {/* City name */}
          <p className="text-white font-bold text-base leading-tight truncate mt-1">
            {city.name}
          </p>

          {/* State */}
          {city.state && (
            <p className="text-gray-200 text-xs truncate -mt-1">{city.state}</p>
          )}

          {/* divider */}
          <div className="w-full h-px bg-white/8 mt-1" />

          {/* Coords */}
          <p className="text-[10px] text-gray-300 tracking-wide">
            {city.lat.toFixed(2)}°N, {city.lon.toFixed(2)}°E
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecentGrid;
