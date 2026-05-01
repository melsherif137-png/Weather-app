import React, { useEffect, useState } from "react";
import LocationTemp from "./components/LocationTemp";
import LocationGrid from "./components/LocationGrid";
import LocationDaily from "./components/LocationDaily";
import { getUserLocation } from "../../utils/geolocation";
import {
  getWeatherByCoords,
  getDailyForecast,
} from "../../services/weatherService";
import { useWeather } from "../../context/WeatherState";
const Location = () => {
  const { loading } = useWeather();
  // loading Skelton for Grid
  const SkeletonCard = () => {
    return (
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 animate-pulse">
        {/* title */}
        <div className="h-3 w-1/2 bg-white/10 rounded mb-4"></div>

        {/* value */}
        <div className="h-6 w-3/4 bg-white/10 rounded mb-6"></div>

        {/* icon */}
        <div className="w-10 h-10 bg-white/10 rounded-xl"></div>
      </div>
    );
  };

  const SkeletonGrid = () => {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <SkeletonCard key={i} />
          ))}
      </div>
    );
  };

  // skelton for temp
  const SkeletonTemp = () => {
    return (
      <div className="h-80 bg-white/20 backdrop-blur-3xl animate-pulse rounded-2xl m-6" />
    );
  };
  return (
    <div className="content mt-13 lg:mt-0 md:mt-0 flex flex-col min-h-screen w-full transition-all duration-300 ease-in-out overflow-hidden">
      <LocationTemp loading={loading} SkeletonTemp={SkeletonTemp} />
      <LocationGrid loading={loading} SkeletonGrid={SkeletonGrid} />
      <LocationDaily loading={loading} />
    </div>
  );
};

export default Location;
