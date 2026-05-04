import { useEffect } from "react";
import { getForecast } from "../../../services/weatherService";
import { useWeather } from "../../../context/WeatherState";
import { motion } from "framer-motion";
const HourlyForecast = () => {
  const { forecast } = useWeather();

  return (
    <div className="mt-8 text-white bg-white/10 backdrop-blur-md rounded-3xl max-h-fit p-5 mx-6 my-10 flex flex-col h-100">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Hourly Forecast</h2>
        <motion.p
          className="text-purple-400 lg:text-md md:text-md text-sm font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          viewport={{ amount: 0.3 }}
        >
          Temperature trends for the next 24 hours
        </motion.p>
      </div>

      {/* Scroll Container */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 overflow-x-auto pb-2 scrollbar-hide mt-3">
        {forecast?.list?.slice(0, 8).map((item, index) => (
          <motion.div
            key={index}
            className="min-w-[90px] bg-white/10 rounded-2xl p-4 text-center flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1 * index,
            }}
            viewport={{ once: false, amount: 0.1 }}
          >
            <p className="text-sm text-white/70">
              {item.dt_txt.split(" ")[1].slice(0, 5)}
            </p>

            <p className="text-2xl font-bold mt-2">
              {Math.round(item.main.temp)}°
            </p>

            <p className="text-xs text-white/60">{item.weather[0].main}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
