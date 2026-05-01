import React from "react";
import { CloudRainWind, CloudFog, CloudLightning } from "lucide-react";

import { useWeather } from "../../context/WeatherState";
import { getCityImage } from "../../services/weatherService";
import AirQuality from "../Home/components/AirQuality";
const OtherCity = () => {
  const { loading } = useWeather();
  const { nearbyCities } = useWeather();
  const icons = [
    CloudRainWind,
    CloudFog,
    CloudLightning,
    CloudRainWind, // أو أي أيكون مناسب
  ];

  const labels = [
    "Coastline District",
    "Mountain Peak",
    "Urban Center",
    "River Valley",
  ];
  return (
    <div className="other mt-16 lg:mt-5">
      <div className="wrapper flex flex-col w-full gap-2">
        {!loading
          ? nearbyCities.map((item, index) => {
              const Icon = icons[index] || CloudRainWind;

              return (
                <div
                  key={index}
                  className="group relative w-full min-h-35 p-4 sm:p-6 flex justify-between items-center rounded-4xl text-white overflow-hidden cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out group-hover:scale-110"
                    style={{
                      backgroundImage: `url(https://picsum.photos/800/600?random=${index})`,
                    }}
                  />

                  <div className="absolute inset-0 bg-black/55"></div>

                  <div className="relative">
                    <span className="text-amber-400 font-bold tracking-widest">
                      {labels[index]}
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-bold">
                      {item.name}
                    </h2>

                    <div className="flex items-center gap-2">
                      <Icon size={18} />
                      <p>{item.weather?.[0]?.main}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <h1 className="text-4xl sm:text-6xl font-bold">
                      {Math.round(item.main?.temp)}°
                    </h1>
                  </div>
                </div>
              );
            })
          : Array.from({ length: 4 }).map((_, index) => {
              return (
                <div
                  key={index}
                  className="w-full min-h-35 bg-white/10 backdrop-blur-xl rounded-4xl overflow-hidden relative"
                >
                  <div className="absolute inset-0">
                    <div className="shimmer" />
                  </div>
                </div>
              );
            })}
      </div>
      <AirQuality />
    </div>
  );
};

export default OtherCity;
