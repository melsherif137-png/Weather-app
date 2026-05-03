import { createContext, useContext, useMemo, useState } from "react";
import { useWeather } from "./WeatherState";

const NotificationContext = createContext(null);

const STORAGE_KEY = "notification-settings";
const DEFAULT_SETTINGS = {
  masterOn: true,
  states: { 0: true, 1: true, 2: true },
};

const severeConditions = new Set([
  "Thunderstorm",
  "Tornado",
  "Squall",
  "Ash",
  "Dust",
  "Sand",
]);

const precipitationConditions = new Set(["Rain", "Drizzle", "Snow"]);

const getSavedSettings = () => {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

  if (!saved) return DEFAULT_SETTINGS;

  return {
    masterOn: saved.masterOn ?? DEFAULT_SETTINGS.masterOn,
    states: { ...DEFAULT_SETTINGS.states, ...(saved.states || {}) },
  };
};

export const NotificationProvider = ({ children }) => {
  const { weather, forecast, city } = useWeather();
  const [settings, setSettings] = useState(getSavedSettings);

  const updateSettings = (nextSettings) => {
    setSettings(nextSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings));
  };

  const setMasterOn = (value) => {
    updateSettings({
      masterOn: value,
      states: { 0: value, 1: value, 2: value },
    });
  };

  const setNotificationState = (id, value) => {
    updateSettings({
      ...settings,
      states: { ...settings.states, [id]: value },
    });
  };

  const alerts = useMemo(() => {
    if (!settings.masterOn) return [];

    const activeAlerts = [];
    const temp = weather?.main?.temp;
    const condition = weather?.weather?.[0]?.main;
    const description = weather?.weather?.[0]?.description;
    const nextForecast = forecast?.list?.[0];
    const nextCondition = nextForecast?.weather?.[0]?.main;

    if (
      settings.states[0] &&
      (temp >= 35 || severeConditions.has(condition))
    ) {
      activeAlerts.push({
        id: "severe",
        title: temp >= 35 ? "High temperature" : "Severe weather",
        message:
          temp >= 35
            ? `${city} is ${Math.round(temp)}° right now.`
            : `${description || condition} is happening in ${city}.`,
      });
    }

    if (
      settings.states[2] &&
      (precipitationConditions.has(condition) ||
        precipitationConditions.has(nextCondition))
    ) {
      activeAlerts.push({
        id: "precipitation",
        title: "Precipitation warning",
        message: `${condition || nextCondition} expected around ${city}.`,
      });
    }

    if (settings.states[1] && nextForecast?.main?.temp >= 35) {
      activeAlerts.push({
        id: "daily",
        title: "Daily forecast alert",
        message: `The next forecast for ${city} reaches ${Math.round(
          nextForecast.main.temp,
        )}°.`,
      });
    }

    return activeAlerts;
  }, [city, forecast, settings, weather]);

  return (
    <NotificationContext.Provider
      value={{
        alerts,
        hasAlerts: alerts.length > 0,
        settings,
        setMasterOn,
        setNotificationState,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }

  return context;
};
