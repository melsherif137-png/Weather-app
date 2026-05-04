// src/services/weatherService.js

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Current Weather
 */
export const getCurrentWeather = async (city) => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
  );

  return res.json();
};

/**
 * Forecast
 */
export const getForecast = async (city) => {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`,
  );

  return res.json();
};

/**
 * Air Quality
 */
export const getAirQuality = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );

  return res.json();
};

/**
 * Grid Details
 */
export const getWeatherDetails = async (city) => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
  );

  const data = await res.json();
  if (!data.coord) {
    throw new Error("Missing coordinates for weather details");
  }

  const { lat, lon } = data.coord;

  const extraRes = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  const extraData = await extraRes.json();

  return {
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,

    dewPoint: extraData.current?.dew_point || "--",
    uvIndex: extraData.current?.uvi || "--",
  };
};

/**
 * By Coordinates
 */
export const getWeatherByCoords = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  return res.json();
};

export const getForecastByCoords = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  return res.json();
};

export const getWeatherDetailsByCoords = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  const data = await res.json();
  if (!data.coord) {
    throw new Error("Missing coordinates for weather details");
  }

  const extraRes = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  const extraData = await extraRes.json();

  return {
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,
    dewPoint: extraData.current?.dew_point || "--",
    uvIndex: extraData.current?.uvi || "--",
  };
};

// المناطق المحيطه
export const getNearbyWeather = async (lat, lon) => {
  const offsets = [
    { lat: 0.5, lon: 0 },
    { lat: -0.5, lon: 0 },
    { lat: 0, lon: 0.5 },
    { lat: 0, lon: -0.5 },
  ];

  const results = await Promise.all(
    offsets.map(async (offset) => {
      const newLat = lat + offset.lat;
      const newLon = lon + offset.lon;

      const data = await getWeatherByCoords(newLat, newLon);
      return data;
    }),
  );

  return results;
};

// صور المدن القريبه
export const getCityImage = (index) => {
  return `https://picsum.photos/800/600?random=${index}`;
};

// دي الفانشكن بتاعه ال suggetions في السيرش
export const fetchCitySuggestions = async (query) => {
  if (!query || query.trim().length < 2) return [];

  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=8&appid=${API_KEY}`,
    );
    const data = await res.json();
    if (!Array.isArray(data)) {
      return [];
    }

    // بيرجع array من الـ locations
    return data.map((city) => ({
      name: city.name,
      country: city.country,
      state: city.state || null,
      lat: city.lat,
      lon: city.lon,
    }));
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

// دي فانكشن بترجع درجات الحراره في ايام معينه
export const getDailyForecast = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch forecast");
    }

    const data = await response.json();

    const groupedDays = {};

    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];

      if (!groupedDays[date]) {
        groupedDays[date] = [];
      }

      groupedDays[date].push(item.main.temp);
    });

    const dailyForecast = Object.entries(groupedDays).map(([date, temps]) => {
      const averageTemp =
        temps.reduce((acc, temp) => acc + temp, 0) / temps.length;

      return {
        date,
        averageTemp: Math.round(averageTemp),
      };
    });

    return dailyForecast.slice(0, 6);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// calender API
export const getMonthlyForecast = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=14`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch forecast");
    }

    const data = await response.json();

    const forecast15Days = data.daily.time.map((date, index) => ({
      date,
      maxTemp: Math.round(data.daily.temperature_2m_max[index]),
      minTemp: Math.round(data.daily.temperature_2m_min[index]),
      weatherCode: data.daily.weathercode[index],
    }));

    return forecast15Days;
  } catch (error) {
    console.log("Error fetching monthly forecast:", error);
    throw error;
  }
};
