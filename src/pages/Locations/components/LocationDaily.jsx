import React from "react";
import { useWeather } from "../../../context/WeatherState";
import { useState } from "react";
import { getUserLocation } from "../../../utils/geolocation";
import {
  CalendarDays,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Droplets,
} from "lucide-react";
const LocationDaily = ({ loading }) => {
  const { locationDaily } = useWeather();
  if (!locationDaily || locationDaily.length === 0) {
    return (
      <div className="text-center text-gray-900 mt-6 text-sm">
        No Forecast Data
      </div>
    );
  }

  const getWeatherInfo = (temp) => {
    if (temp >= 35)
      return {
        icon: <Sun size={20} />,
        color: "text-yellow-300",
        bg: "bg-yellow-400/20",
        label: "Sunny",
      };
    if (temp >= 28)
      return {
        icon: <Cloud size={20} />,
        color: "text-gray-300",
        bg: "bg-gray-400/20",
        label: "Cloudy",
      };
    if (temp >= 20)
      return {
        icon: <CloudRain size={20} />,
        color: "text-blue-300",
        bg: "bg-blue-400/20",
        label: "Rainy",
      };
    if (temp >= 12)
      return {
        icon: <CloudLightning size={20} />,
        color: "text-purple-300",
        bg: "bg-purple-400/20",
        label: "Storm",
      };
    return {
      icon: <CloudSnow size={20} />,
      color: "text-cyan-300",
      bg: "bg-cyan-400/20",
      label: "Snow",
    };
  };

  return (
    <div className="mt-6 p-4 lg:p-6 md:p-5">
      <div className="flex items-center gap-2 mb-8 px-1">
        <CalendarDays className="text-yellow-400" size={25} />
        <h2 className="text-3xl font-semibold text-white tracking-wide">
          5-Day Forecast
        </h2>
      </div>

      {/* ✅ w-full + كل كارت flex-1 عشان يملوا العرض كله */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 w-full">
        {locationDaily.map((day, index) => {
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const dateNum = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          });
          const isToday = index === 0;
          const weather = getWeatherInfo(day.averageTemp);
          const humidity = 60 + index * 5;

          return (
            <div key={index} className="flex-1 min-w-0">
              <div
                className={`
                  flex flex-col justify-center items-center gap-2 py-3 px-1 rounded-2xl w-full lg:max-w-[270px]
                  border transition-all duration-300 relative overflow-hidden 
                  ${
                    isToday
                      ? "bg-yellow-400/25 border-yellow-400/50 shadow-lg shadow-yellow-400/10"
                      : "bg-white/8 backdrop-blur-2xl border-white/10 hover:bg-white/12 hover:border-white/20"
                  }
                `}
              >
                {isToday && (
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent pointer-events-none rounded-2xl" />
                )}

                <span
                  className={`text-xl font-bold tracking-wider uppercase ${isToday ? "text-yellow-300" : "text-gray-400"}`}
                >
                  {isToday ? "Today" : dayName}
                </span>

                <span className="text-[12px] text-gray-300">{dateNum}</span>

                <div
                  className={`p-3 rounded-xl ${weather.bg} ${weather.color}`}
                >
                  {weather.icon}
                </div>

                <span
                  className={`text-2xl font-bold leading-none ${isToday ? "text-white" : "text-gray-200"}`}
                >
                  {day.averageTemp}°
                </span>

                <div className="flex items-center gap-1">
                  <Droplets size={12} className="text-blue-300" />
                  <span className="text-[11px] text-gray-400">{humidity}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationDaily;
