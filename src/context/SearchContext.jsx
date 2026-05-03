import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Fuse from "fuse.js";
import { topCities } from "../pages/Search/components/topCities";
import { fetchCitySuggestions } from "../services/weatherService";
import { useWeather } from "./WeatherState";

const MIN_QUERY_LENGTH = 2;
const MAX_SUGGESTIONS = 6;
const API_DEBOUNCE_MS = 350;

const normalizeCity = (city) => ({
  name: city.name,
  country: city.country ?? "",
  state: city.state ?? null,
  lat: Number(city.lat),
  lon: Number(city.lon),
  pop: city.pop ?? 0,
});

const buildCityKey = (city) =>
  [
    city.name,
    city.country,
    city.state ?? "",
    Number(city.lat).toFixed(3),
    Number(city.lon).toFixed(3),
  ]
    .join("|")
    .toLowerCase();

const dedupeCities = (cities) => {
  const seen = new Set();

  return cities.filter((city) => {
    const key = buildCityKey(city);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

const rankSuggestions = (cities, rawQuery) => {
  const query = rawQuery.trim().toLowerCase();

  return [...cities].sort((a, b) => {
    const aStarts = a.name.toLowerCase().startsWith(query);
    const bStarts = b.name.toLowerCase().startsWith(query);

    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;

    const aCountryStarts = a.country.toLowerCase().startsWith(query);
    const bCountryStarts = b.country.toLowerCase().startsWith(query);

    if (aCountryStarts && !bCountryStarts) return -1;
    if (!aCountryStarts && bCountryStarts) return 1;

    if ((b.pop ?? 0) !== (a.pop ?? 0)) {
      return (b.pop ?? 0) - (a.pop ?? 0);
    }

    if (a.country === "EG" && b.country !== "EG") return -1;
    if (b.country === "EG" && a.country !== "EG") return 1;

    return a.name.localeCompare(b.name);
  });
};

const fuse = new Fuse(topCities.map(normalizeCity), {
  keys: ["name", "country"],
  threshold: 0.35,
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
});

const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  const { loadWeather } = useWeather();
  const [recentCities, setRecentCities] = useState(() => {
    const savedCities = JSON.parse(localStorage.getItem("recentCities")) || [];

    return savedCities.filter(
      (city) =>
        city?.name &&
        typeof city.lat === "number" &&
        typeof city.lon === "number",
    );
  });
  const [query, setQueryRaw] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const debounceTimer = useRef(null);
  const latestRequestId = useRef(0);

  const clearSuggestions = useCallback(() => {
    latestRequestId.current += 1;
    clearTimeout(debounceTimer.current);
    setSuggestions([]);
    setIsLoadingSuggestions(false);
  }, []);

  const setQuery = useCallback((value) => {
    setQueryRaw(value);
  }, []);

  useEffect(() => {
    clearTimeout(debounceTimer.current);

    const trimmedQuery = query.trim();

    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setIsLoadingSuggestions(false);
      return undefined;
    }

    const localResults = fuse.search(trimmedQuery).map((result) => result.item);

    setSuggestions(
      rankSuggestions(dedupeCities(localResults), trimmedQuery).slice(
        0,
        MAX_SUGGESTIONS,
      ),
    );
    setIsLoadingSuggestions(true);

    const requestId = latestRequestId.current + 1;
    latestRequestId.current = requestId;

    debounceTimer.current = setTimeout(async () => {
      const apiResults = (await fetchCitySuggestions(trimmedQuery)).map(
        normalizeCity,
      );

      if (latestRequestId.current !== requestId) {
        return;
      }

      const mergedResults = dedupeCities([...apiResults, ...localResults]);
      setSuggestions(
        rankSuggestions(mergedResults, trimmedQuery).slice(0, MAX_SUGGESTIONS),
      );
      setIsLoadingSuggestions(false);
    }, API_DEBOUNCE_MS);

    return () => {
      clearTimeout(debounceTimer.current);
    };
  }, [query]);

  const submitSearch = useCallback(
    async (rawValue = query) => {
      const trimmedQuery = rawValue.trim();

      if (trimmedQuery.length < MIN_QUERY_LENGTH) {
        return false;
      }

      const exactMatch = suggestions.find(
        (city) => city.name.toLowerCase() === trimmedQuery.toLowerCase(),
      );

      clearSuggestions();
      setQueryRaw(trimmedQuery);

      if (exactMatch) {
        await loadWeather({
          name: exactMatch.name,
          lat: exactMatch.lat,
          lon: exactMatch.lon,
        });
      } else {
        await loadWeather(trimmedQuery);
      }

      return true;
    },
    [clearSuggestions, loadWeather, query, suggestions],
  );

  const selectSuggestion = useCallback(
    async (city) => {
      if (!city?.name) {
        return false;
      }

      clearSuggestions();
      setQueryRaw(city.name);
      await loadWeather({
        name: city.name,
        lat: city.lat,
        lon: city.lon,
      });

      return true;
    },
    [clearSuggestions, loadWeather],
  );
  useEffect(() => {
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
  }, [recentCities]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        suggestions,
        isLoadingSuggestions,
        clearSuggestions,
        submitSearch,
        selectSuggestion,
        recentCities,
        setRecentCities,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const SearchProvider = SearchContextProvider;

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used inside SearchContextProvider");
  }

  return context;
};
