import React from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../../context/SearchContext";
import { useWeather } from "../../../context/WeatherState";
import { getUserLocation } from "../../../utils/geolocation";
import { getMonthlyForecast } from "../../../services/weatherService";
const formatCoordinate = (value, positiveDirection, negativeDirection) => {
  const direction = value >= 0 ? positiveDirection : negativeDirection;
  return `${Math.abs(value).toFixed(2)}°${direction}`;
};

const Suggestions = ({ visible, setVisible }) => {
  const { loadWeather } = useWeather();
  const navigate = useNavigate();
  const {
    query,
    selectSuggestion,
    suggestions,
    recentCities,
    setRecentCities,
  } = useSearch();

  const handleSelect = async (city) => {
    const didSelect = await selectSuggestion(city);
    if (!didSelect) return;

    addRecentCity(city);

    await loadWeather(city); // 👈 ده الوحيد اللي يعمل fetch

    setVisible(false);
    navigate("/Home");
  };

  const highlight = (text) => {
    const loweredText = text.toLowerCase();
    const loweredQuery = query.trim().toLowerCase();
    const index = loweredText.indexOf(loweredQuery);

    if (index === -1 || !loweredQuery) {
      return <span>{text}</span>;
    }

    return (
      <>
        {text.slice(0, index)}
        <span className="font-semibold text-yellow-300">
          {text.slice(index, index + loweredQuery.length)}
        </span>
        {text.slice(index + loweredQuery.length)}
      </>
    );
  };

  if (!visible || !query.trim() || suggestions.length === 0) {
    return null;
  }

  const addRecentCity = (city) => {
    setRecentCities((prev) => {
      // نشيل المدينة لو موجودة قبل كده (علشان منكررش)
      const filtered = prev.filter(
        (item) => item.lat !== city.lat || item.lon !== city.lon,
      );

      // نضيف الجديدة في الأول ونقص على 4 بس
      return [city, ...filtered].slice(0, 4);
    });
  };

  return (
    <div
      className="absolute left-0 top-full z-50 mt-2 w-full"
      onMouseDown={(event) => event.preventDefault()}
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/70 shadow-xl backdrop-blur-xl">
        <div className="max-h-72 overflow-y-auto">
          {suggestions.map((city) => {
            const isExact = city.name
              .toLowerCase()
              .startsWith(query.trim().toLowerCase());
            const subtitle = city.state
              ? `${city.state}, ${city.country}`
              : city.country;

            return (
              <button
                key={`${city.name}-${city.country}-${city.lat}-${city.lon}`}
                type="button"
                onClick={() => handleSelect(city)}
                className={`flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left transition last:border-none hover:bg-white/15 cursor-pointer ${
                  isExact ? "bg-yellow-300/10" : ""
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/8 text-white/70">
                  <MapPin size={16} />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-white">
                    {highlight(city.name)}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-400">{subtitle}</div>
                  <div className="mt-1 text-[11px] text-gray-500">
                    {formatCoordinate(city.lat, "N", "S")} ·{" "}
                    {formatCoordinate(city.lon, "E", "W")}
                  </div>
                </div>

                <span
                  className={`rounded-lg border px-2 py-0.5 text-xs font-semibold ${
                    city.country === "EG"
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                      : "border-yellow-300/20 bg-yellow-300/10 text-yellow-300"
                  }`}
                >
                  {city.country}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
