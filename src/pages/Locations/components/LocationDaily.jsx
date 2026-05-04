import React from "react";
import { motion } from "framer-motion";
import { useWeather } from "../../../context/WeatherState";
import {
  CalendarDays,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Droplets,
} from "lucide-react";

/* ───────────── Animation ───────────── */

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 1, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/* ───────────── Component ───────────── */

const LocationDaily = () => {
  const { locationDaily } = useWeather();

  if (!locationDaily || locationDaily.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-6 text-sm">
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
      };
    if (temp >= 28)
      return {
        icon: <Cloud size={20} />,
        color: "text-gray-300",
        bg: "bg-gray-400/20",
      };
    if (temp >= 20)
      return {
        icon: <CloudRain size={20} />,
        color: "text-blue-300",
        bg: "bg-blue-400/20",
      };
    if (temp >= 12)
      return {
        icon: <CloudLightning size={20} />,
        color: "text-purple-300",
        bg: "bg-purple-400/20",
      };
    return {
      icon: <CloudSnow size={20} />,
      color: "text-cyan-300",
      bg: "bg-cyan-400/20",
    };
  };

  return (
    <div className="mt-6 p-4 lg:p-6 md:p-5">
      {/* HEADER */}
      <motion.div
        className="flex items-center gap-2 mb-8 px-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CalendarDays className="text-yellow-400" size={25} />
        <h2 className="text-3xl font-semibold text-white">5-Day Forecast</h2>
      </motion.div>

      {/* GRID */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 w-full"
        variants={container}
        initial="hidden"
        whileInView="show"
      >
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
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -4 }}
              className="flex"
            >
              <div
                className={`
                  flex flex-col items-center justify-center gap-2
                  py-3 px-2 rounded-2xl w-full
                  border transition-all duration-300
                  relative overflow-hidden

                  ${
                    isToday
                      ? "bg-yellow-400/20 border-yellow-400/40"
                      : "bg-white/5 backdrop-blur-xl border-white/10"
                  }
                `}
              >
                <span
                  className={`text-lg font-bold uppercase ${
                    isToday ? "text-yellow-300" : "text-gray-400"
                  }`}
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
                  className={`text-xl font-bold ${
                    isToday ? "text-white" : "text-gray-200"
                  }`}
                >
                  {day.averageTemp}°
                </span>

                <div className="flex items-center gap-1">
                  <Droplets size={12} className="text-blue-300" />
                  <span className="text-[11px] text-gray-400">{humidity}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default LocationDaily;
