import "./App.css";
import Landing from "./components/Landing";
import { useState } from "react";
import { useEffect } from "react";
import { getUserLocation } from "./utils/geolocation";
import {
  getCurrentWeather,
  getForecast,
  getAirQuality,
  getWeatherDetails,
  getWeatherByCoords,
} from "./services/weatherService";
import { useWeather } from "./context/WeatherState";

function App() {
  const { loadWeather } = useWeather();
  // Silder open
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const init = async () => {
      await loadWeather();
    };

    init();
  }, []);
  return (
    <>
      <Landing
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        getCurrentWeather={getCurrentWeather}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}

export default App;
