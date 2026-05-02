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
  const [loading, setLoading] = useState(false);
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
      let detailsData = null;
      let nearby = [];
      let airData = null;

      // -------------------------
      // CASE 1: CITY NAME
      // -------------------------
      if (typeof searchTarget === "string" && searchTarget.trim()) {
        weatherData = await getCurrentWeather(searchTarget);
        forecastData = await getForecast(searchTarget);

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

        setCity(weatherData.name);
      }

      // =========================
      // COMMON DATA (ALL CASES)
      // =========================
      nearby = await getNearbyWeather(lat, lon);
      airData = await getAirQuality(lat, lon);
      // locationWeather = await getWeatherByCoords(lat, lon)

      try {
        detailsData = await getWeatherDetailsByCoords(lat, lon);
      } catch {
        detailsData = null;
      }

      const calendarData = await getMonthlyForecast(lat, lon);
      const dailyData = await getDailyForecast(lat, lon);

      // =========================
      // SET STATE (SEARCH)
      // =========================
      setWeather(weatherData);
      setForecast(forecastData);
      setNearbyCities(nearby);
      setAirQuality(airData);
      setGridDetails(detailsData);
      setCalenderWeather(calendarData);
      // setDailyLocaion(dailyData);

      // optional sync
    } catch (err) {
      console.log(err);
      setError("Failed to load weather");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);

        const location = await getUserLocation();

        setCoords({
          lat: location.lat,
          lon: location.lon,
        });

        const data = await getWeatherByCoords(location.lat, location.lon);
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
        setLoading(false);
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
