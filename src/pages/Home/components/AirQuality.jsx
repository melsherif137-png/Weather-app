import React from "react";
import { useWeather } from "../../../context/WeatherState";
import { Waves } from "lucide-react";
import { motion } from "framer-motion";
const Bar = ({ label, value, max = 150, color }) => {
  const num = Number(value) || 0;
  const percent = Math.min((num / max) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <span className="w-14 text-sm opacity-80">{label}</span>

      <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ amount: 0.3 }}
        />
      </div>

      <span className="w-10 text-right text-sm">{num.toFixed(1)}</span>
    </div>
  );
};

const AirQuality = () => {
  const { airQuality } = useWeather();

  // ✅ fallback لو data مجاش لسه
  const data = airQuality?.list?.[0]?.components ?? {};

  const bars = [
    { label: "PM2.5", value: data.pm2_5, max: 150, color: "bg-yellow-400" },
    { label: "PM10", value: data.pm10, max: 200, color: "bg-orange-400" },
    { label: "Ozone", value: data.o3, max: 180, color: "bg-white/70" },
    { label: "NO₂", value: data.no2, max: 200, color: "bg-purple-400" },
  ];

  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md text-white mt-6 min-h-60 pt-12">
      {/* Header */}
      <motion.div
        className="flex gap-4 items-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Waves className="bg-gray-800 p-3 w-12 h-12 rounded-2xl" />
        <div>
          <h2 className="text-2xl font-bold">Air Quality</h2>
          <p className="text-sm opacity-80">Moderate Index</p>
        </div>
      </motion.div>

      {/* Bars */}
      {Object.keys(data).length === 0 ? (
        // ✅ Loading state لو data فاضية
        <p className="text-sm opacity-50 text-center py-4">
          Loading air quality data...
        </p>
      ) : (
        <div className="space-y-4">
          {bars.map((bar) =>
            bar.value != null ? <Bar key={bar.label} {...bar} /> : null,
          )}
        </div>
      )}
    </div>
  );
};

export default AirQuality;
