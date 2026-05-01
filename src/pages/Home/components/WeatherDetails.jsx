import React from "react";
import { Clock10 } from "lucide-react";
import { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherState";
import { getWeatherIcon } from "../../../components/weatherIcons";

const WeatherDetails = () => {
  const { weather, loading, error } = useWeather();

  const date = new Date();

  const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date,
  );
  const day = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date,
  );
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  const result = `${dayName}, ${day} ${month} | ${time}`;

  return (
    <div className="weather lg:mt-5 mt-5 p-6">
      <div className="container">
        <div className="text-weather">
          {loading ? (
            <div className="w-35 h-30 bg-white/30 rounded-2xl animate-pulse">
              {" "}
            </div>
          ) : (
            <h1 className="text-[120px] md:text-[130px] lg:text-[150px] font-bold text-white leading-none">
              {weather?.main?.temp !== undefined
                ? Math.round(weather.main.temp)
                : "--"}
              <sup className="text-8xl md:text-8xl lg:text-8xl text-amber-300">
                °
              </sup>
            </h1>
          )}
          <div className="weather-status flex items-center gap-2 p-2 mb-2">
            {loading ? (
              <div className="w-15 h-15 bg-white/30 rounded-2xl mt-10 animate-pulse">
                {" "}
              </div>
            ) : (
              <p className="mt-2.5">
                {getWeatherIcon(weather?.weather?.[0]?.main)}
              </p>
            )}
            {loading ? (
              <div className="w-85 h-5 bg-white/30 rounded-2xl mt-10 animate-pulse">
                {" "}
              </div>
            ) : (
              <span className="font-bold text-white text-5xl  break-words">
                {weather?.weather?.[0]?.description}
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="w-55 h-5 bg-white/30 rounded-2xl  animate-pulse">
            {" "}
          </div>
        ) : (
          <div className="details-weather text-white flex items-center gap-2 text-xl lg:text-xl">
            <Clock10 className="text:lg" size={20} />
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDetails;
