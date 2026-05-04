import React from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Thermometer,
  Sun,
  Cloud,
  Activity,
} from "lucide-react";
import { useWeather } from "../../../context/WeatherState";

const rowVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const LocationGrid = ({ loading, SkeletonGrid }) => {
  const { current } = useWeather();
  if (!current) return null;

  const items = [
    {
      title: "Humidity",
      value: `${current.main?.humidity}%`,
      icon: <Droplets size={18} />,
      color: "text-blue-300",
      bg: "bg-blue-400/15",
    },
    {
      title: "Wind",
      value: `${current.wind?.speed} m/s`,
      icon: <Wind size={18} />,
      color: "text-cyan-300",
      bg: "bg-cyan-400/15",
    },
    {
      title: "Pressure",
      value: `${current.main?.pressure} hPa`,
      icon: <Gauge size={18} />,
      color: "text-orange-300",
      bg: "bg-orange-400/15",
    },
    {
      title: "Visibility",
      value: `${(current.visibility / 1000).toFixed(1)} km`,
      icon: <Eye size={18} />,
      color: "text-purple-300",
      bg: "bg-purple-400/15",
    },
    {
      title: "Feels Like",
      value: `${Math.round(current.main?.feels_like)}°`,
      icon: <Thermometer size={18} />,
      color: "text-red-300",
      bg: "bg-red-400/15",
    },
    {
      title: "Min Temp",
      value: `${Math.round(current.main?.temp_min)}°`,
      icon: <Cloud size={18} />,
      color: "text-gray-300",
      bg: "bg-gray-400/15",
    },
    {
      title: "Max Temp",
      value: `${Math.round(current.main?.temp_max)}°`,
      icon: <Sun size={18} />,
      color: "text-yellow-300",
      bg: "bg-yellow-400/15",
    },
    {
      title: "Air Quality",
      value: "Good",
      icon: <Activity size={18} />,
      color: "text-green-300",
      bg: "bg-green-400/15",
    },
  ];

  // تقسيم rows (4 عناصر لكل صف)
  const rows = [];
  for (let i = 0; i < items.length; i += 4) {
    rows.push(items.slice(i, i + 4));
  }

  return (
    <div className="mt-8 lg:p-6 md:p-5 p-2">
      {loading ? (
        <SkeletonGrid />
      ) : (
        <div className="flex flex-col gap-4">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3"
              variants={rowVariants}
              initial="hidden"
              whileInView="show"
              transition={{
                delayChildren: rowIndex * 0.15,
              }}
            >
              {row.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/8 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 py-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-3">
                      <span className="text-gray-400 text-sm font-medium">
                        {item.title}
                      </span>
                      <h2 className="text-white text-2xl font-bold">
                        {item.value}
                      </h2>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}
                    >
                      {item.icon}
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-white/10 my-3" />

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-white">Live Data</span>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationGrid;
