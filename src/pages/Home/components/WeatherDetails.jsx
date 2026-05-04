import React from "react";
import { Clock10 } from "lucide-react";
import { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherState";
import { getWeatherIcon } from "../../../components/weatherIcons";
import { motion } from "framer-motion";

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

  const smooth = {
    type: "spring",
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  };
  return (
    <div className="weather lg:mt-5 mt-5 p-6">
      <div className="container">
        <div className="text-weather">
          {loading ? (
            <div className="w-35 h-30 bg-white/30 rounded-2xl animate-pulse">
              {" "}
            </div>
          ) : (
            <motion.h1
              className="text-[120px] md:text-[130px] lg:text-[150px] font-bold text-white leading-none"
              initial={{ opacity: 0, y: 75 }}
              animate={{ opacity: 1, y: 0 }}
              transition={smooth}
            >
              {weather?.main?.temp !== undefined
                ? Math.round(weather.main.temp)
                : "--"}
              <sup className="text-8xl md:text-8xl lg:text-8xl text-amber-300">
                °
              </sup>
            </motion.h1>
          )}
          <div className="weather-status flex items-center gap-2 p-2 mb-2">
            {loading ? (
              <div className="w-15 h-15 bg-white/30 rounded-2xl mt-10 animate-pulse">
                {" "}
              </div>
            ) : (
              <motion.p
                className="mt-2.5"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.2,
                }}
              >
                {getWeatherIcon(weather?.weather?.[0]?.main)}
              </motion.p>
            )}
            {loading ? (
              <div className="w-85 h-5 bg-white/30 rounded-2xl mt-10 animate-pulse">
                {" "}
              </div>
            ) : (
              <motion.span
                className="font-bold text-white text-5xl  break-words"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.2,
                }}
              >
                {weather?.weather?.[0]?.description}
              </motion.span>
            )}
          </div>
        </div>
        <div className="details-weather text-white flex items-center gap-2 text-xl lg:text-xl">
          {loading ? (
            <div className="w-55 h-5 bg-white/30 rounded-2xl animate-pulse" />
          ) : (
            <motion.div
              key={result}
              className="flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.3,
              }}
            >
              <Clock10 size={20} />
              {result}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
