import { createContext, useContext, useState, useEffect } from "react";
import { getUserLocation } from "../utils/geolocation";
import {
  getAirQuality,
  getCurrentWeather,
  getForecast,
  getForecastByCoords,
  getNearbyWeather,
  getWeatherByCoords,
  getWeatherDetails,
  getWeatherDetailsByCoords,
  getDailyForecast,
  getMonthlyForecast,
} from "../services/weatherService";

const WeatherContext = createContext(null);

const isCoordinateSearch = (value) =>
  Boolean(
    value &&
    typeof value === "object" &&
    typeof value.lat === "number" &&
    typeof value.lon === "number",
  );

const validateWeatherResponse = (data) => {
  if (!data?.coord || !data?.main || !data?.weather) {
    throw new Error(data?.message || "Weather data is unavailable");
  }
};

const validateForecastResponse = (data) => {
  if (!Array.isArray(data?.list) || data.list.length === 0) {
    throw new Error(data?.message || "Forecast data is unavailable");
  }
};

const validateAirQualityResponse = (data) => {
  if (!Array.isArray(data?.list) || data.list.length === 0) {
    throw new Error("Air quality data is unavailable");
  }
};

export const WeatherProvider = ({ children }) => {
  // =========================
  // SEARCH STATE
  // =========================
  const [city, setCity] = useState("Cairo");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [gridDetails, setGridDetails] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [nearbyCities, setNearbyCities] = useState([]);

  const [calenderWeather, setCalenderWeather] = useState([]);

  // =========================
  // GLOBAL STATE
  // =========================
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(true);
  const [error, setError] = useState(null);

  // location temp
  const [current, setCurrent] = useState(null);
  // lat and lot
  const [coords, setCoords] = useState(null);
  // location daily
  const [locationDaily, setLocationDaily] = useState(null);
  // =====================================================
  // 🔥 MASTER FUNCTION (SEARCH / CITY / COORDS)
  // =====================================================

  const loadWeather = async (searchTarget = null) => {
    try {
      setLoading(true);
      setError(null);

      let lat, lon;
      let weatherData;
      let forecastData;
      let detailsData;
      let nearby;
      let airData;
      let calendarData;
      let dailyData;

      // -------------------------
      // CASE 1: CITY NAME
      // -------------------------
      if (typeof searchTarget === "string" && searchTarget.trim()) {
        weatherData = await getCurrentWeather(searchTarget);
        forecastData = await getForecast(searchTarget);

        validateWeatherResponse(weatherData);
        validateForecastResponse(forecastData);

        lat = weatherData.coord.lat;
        lon = weatherData.coord.lon;

        setCity(weatherData.name || searchTarget);
      }

      // -------------------------
      // CASE 2: COORDINATES
      // -------------------------
      else if (isCoordinateSearch(searchTarget)) {
        lat = searchTarget.lat;
        lon = searchTarget.lon;

        weatherData = await getWeatherByCoords(lat, lon);
        forecastData = await getForecastByCoords(lat, lon);

        validateWeatherResponse(weatherData);
        validateForecastResponse(forecastData);

        setCity(searchTarget.name || weatherData.name);
      }

      // -------------------------
      // CASE 3: FALLBACK GPS
      // -------------------------
      else {
        const location = await getUserLocation();

        lat = location.lat;
        lon = location.lon;

        weatherData = await getWeatherByCoords(lat, lon);
        forecastData = await getForecastByCoords(lat, lon);

        validateWeatherResponse(weatherData);
        validateForecastResponse(forecastData);

        setCity(weatherData.name);
      }

      // =========================
      // COMMON DATA (ALL CASES)
      // =========================
      [nearby, airData, detailsData, calendarData, dailyData] =
        await Promise.all([
          getNearbyWeather(lat, lon),
          getAirQuality(lat, lon),
          getWeatherDetailsByCoords(lat, lon),
          getMonthlyForecast(lat, lon),
          getDailyForecast(lat, lon),
        ]);

      if (
        !Array.isArray(nearby) ||
        nearby.length === 0 ||
        nearby.some((item) => !item?.main || !item?.weather)
      ) {
        throw new Error("Nearby cities data is unavailable");
      }

      validateAirQualityResponse(airData);

      if (
        !detailsData ||
        !Array.isArray(calendarData) ||
        !Array.isArray(dailyData)
      ) {
        throw new Error("Some weather data is unavailable");
      }

      // =========================
      // SET STATE (SEARCH)
      // =========================
      setWeather(weatherData);
      setForecast(forecastData);
      setNearbyCities(nearby);
      setAirQuality(airData);
      setGridDetails(detailsData);
      setCalenderWeather(calendarData);
      setLocationDaily(dailyData);

      // optional sync
    } catch (err) {
      console.log(err);
      setError(
        navigator.onLine
          ? err.message || "Failed to load weather"
          : "No internet connection",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLocationLoading(true);

        const location = await getUserLocation();

        setCoords({
          lat: location.lat,
          lon: location.lon,
        });

        const data = await getWeatherByCoords(location.lat, location.lon);
        validateWeatherResponse(data);
        setCurrent(data);
        console.log(data);

        const dailyForecast = await getDailyForecast(
          location.lat,
          location.lon,
        );
        setLocationDaily(dailyForecast);
      } catch (error) {
        console.error("Failed to get location:", error.message);
      } finally {
        setLocationLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        // search
        city,
        setCity,
        weather,
        forecast,
        gridDetails,
        airQuality,
        nearbyCities,

        calenderWeather,

        loading,
        locationLoading,
        error,

        loadWeather,

        setCalenderWeather,
        current,
        locationDaily,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeather must be used inside WeatherProvider");
  }

  return context;
};
