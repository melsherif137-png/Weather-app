import React, { useEffect, useState } from "react";
import { Cloud } from "lucide-react";
import { getWeatherByCoords } from "../../../services/weatherService";
import { useWeather } from "../../../context/WeatherState";
const LocationTemp = ({ loading, SkeletonTemp }) => {
  const { current } = useWeather();

  if (!current) {
    return null;
  }
  return (
    <>
      {loading ? (
        <SkeletonTemp />
      ) : (
        <div className="flex flex-col md:flex-row lg:flex-row justify-between items-start gap-10 lg:mt-12 lg:p-6 md:p-6 p-2">
          {/* LEFT SIDE */}
          <div className="flex gap-6">
            <div className="flex flex-col">
              <h2 className="text-white text-2xl lg:text-4xl font-semibold tracking-wide">
                {current.name}, {current.sys?.country}
              </h2>

              <h1 className="text-white text-[90px] lg:text-[150px] font-bold leading-none drop-shadow-xl">
                {Math.round(current.main?.temp)}
                <span className="text-amber-300">°</span>
              </h1>

              {/* TIME */}
              <div className="mt-15 flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse mt-2"></div>

                <div className="flex flex-col">
                  <p className="text-white text-2xl lg:text-base font-bold">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <p className="text-gray-300 text-xs lg:text-sm">
                    {new Date().toLocaleDateString([], {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT INFO */}
            <div className="flex  min-h-40 flex-col gap-3 lg:mt-26 bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-5 rounded-3xl shadow-2xl">
              <p className="text-amber-400 text-3xl lg:text-4xl capitalize font-bold">
                {current.weather?.[0]?.description}
              </p>

              <p className="text-white text-xl lg:text-2xl font-medium">
                Feels like{" "}
                <span className="text-cyan-300">
                  {Math.round(current.main?.feels_like)}°
                </span>
              </p>

              <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 rounded-full bg-sky-400"></div>
                <span className="text-gray-300 text-sm lg:text-base">
                  Live Weather Update
                </span>
              </div>
            </div>
          </div>
          {/* WEATHER CARD */}
          <div className="w-full lg:w-[560px] bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10 flex flex-col items-center text-center shadow-xl shadow-black/40 hover:-translate-y-3 transition-all duration-300 cursor-pointer">
            <div className="mb-6 inline-flex items-center justify-center p-5 rounded-2xl bg-amber-400/20">
              <Cloud size={72} className="text-amber-400" />
            </div>

            <h3 className="text-white text-xl font-semibold">
              Current Condition
            </h3>

            <p className="text-gray-300 mt-3 text-lg capitalize">
              {current.weather?.[0]?.main}
            </p>

            <p className="text-gray-400 text-sm mt-5">Updated just now</p>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationTemp;
