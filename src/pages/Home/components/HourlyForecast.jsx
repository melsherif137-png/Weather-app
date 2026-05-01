import { useEffect } from "react";
import { getForecast } from "../../../services/weatherService";
import { useWeather } from "../../../context/WeatherState";

const HourlyForecast = () => {
  const { forecast } = useWeather();

  return (
    <div className="mt-8 text-white bg-white/10 backdrop-blur-md rounded-3xl p-5 mx-6 my-10 flex flex-col h-100">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Hourly Forecast</h2>
        <p className="text-purple-400 text-sm">
          Temperature trends for the next 24 hours
        </p>
      </div>

      {/* Scroll Container */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 overflow-x-auto pb-2 scrollbar-hide mt-auto">
        {forecast?.list?.slice(0, 8).map((item, index) => (
          <div
            key={index}
            className="min-w-[90px] bg-white/10 rounded-2xl p-4 text-center flex-shrink-0"
          >
            <p className="text-sm text-white/70">
              {item.dt_txt.split(" ")[1].slice(0, 5)}
            </p>

            <p className="text-2xl font-bold mt-2">
              {Math.round(item.main.temp)}°
            </p>

            <p className="text-xs text-white/60">{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
