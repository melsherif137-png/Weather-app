import React from "react";
import { useWeather } from "../../../context/WeatherState";
import { Waves } from "lucide-react";

const AirQuality = () => {
  const { airQuality } = useWeather();

  const data = airQuality?.list?.[0]?.components || {};

  const Bar = ({ value, max = 150, color }) => (
    <div className="flex items-center gap-3">
      {/* name */}
      <span className="w-14 text-sm opacity-80">{value.name}</span>

      {/* bar */}
      <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full`}
          style={{
            width: `${Math.min((value.val / max) * 100, 100)}%`,
          }}
        />
      </div>

      {/* number */}
      <span className="w-10 text-right text-sm">{value.val}</span>
    </div>
  );

  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md text-white mt-6 min-h-60 pt-12">
      {/* header */}
      <div className="flex gap-4 items-center mb-6">
        <Waves className="bg-gray-800 p-3 w-12 h-12 rounded-2xl" />
        <div>
          <h2 className="text-2xl font-bold">Air Quality</h2>
          <p className="text-sm opacity-80">Moderate Index</p>
        </div>
      </div>

      {/* bars */}
      <div className="space-y-4">
        <Bar value={{ name: "PM2.5", val: data.pm2_5 }} color="bg-yellow-400" />

        <Bar value={{ name: "Ozone", val: data.o3 }} color="bg-white/70" />
      </div>
    </div>
  );
};

export default AirQuality;
