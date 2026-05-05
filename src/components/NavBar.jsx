import React from "react";
import { Plus, Bell, Search } from "lucide-react";
import { useWeather } from "../context/WeatherState";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

const NavBar = ({ isOpen, setOpenModal }) => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const { alerts, hasAlerts } = useNotifications();
  const {
    weather,
    loading,
    error,
    setCity,
    city,
    fetchAllWeatherData,
    loadWeather,
  } = useWeather();

  return (
    <div className="nav-bar w-full min-h-16 flex flex-wrap justify-between items-center gap-3 p-4 sm:px-8 relative z-10">
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>

          <div className="space-y-2">
            <div className="w-28 h-4 bg-white/20 rounded animate-pulse"></div>
            <div className="w-16 h-3 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="city-left">
          <p className="text-[10px] md:text-sm lg:text-lxl text-amber-300 font-bold tracking-widest">
            CURRENT LOCATION
          </p>
          {!location.pathname.toLowerCase().includes("location") && (
            <span className="text-lg md:text-1xl lg:text-3xl text-white font-bold">
              {city?.toUpperCase()}
            </span>
          )}
        </div>
      )}

      <div className="nav-right flex gap-3 sm:gap-4 items-center">
        {!location.pathname.toLowerCase().includes("search") && (
          <div className="search relative items-center hidden md:hidden lg:flex ">
            <input
              type="search"
              className="bg-white/20 backdrop-blur-xl w-65 h-13 rounded-4xl p-4 pl-12 focus:outline-0 placeholder:text-gray-200 text-gray-300"
              placeholder="Search City..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute left-1/20 cursor-pointer text-gray-300  hover:scale-125 transition-all duration-300 ease-in-out">
              <Search
                size={16}
                onClick={() => {
                  loadWeather(search);
                }}
              />
            </button>
          </div>
        )}

        <button
          className="bg-white/20 backdrop-blur-xl p-2 rounded-full hover:bg-white/30 transition-all cursor-pointer"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <Plus className=" text-gray-400 " size={22} />
        </button>
        <div className="relative">
          <button
            className="relative bg-white/20 backdrop-blur-xl p-2 rounded-full hover:bg-white/30 transition-all cursor-pointer"
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <Bell className=" text-gray-400" size={22} />
            {hasAlerts && (
              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#111827]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-72 rounded-3xl border border-white/10 bg-black/80 p-4 text-white shadow-xl backdrop-blur-xl">
              <p className="mb-3 text-sm font-semibold">Weather Alerts</p>

              {alerts.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <p className="text-sm font-semibold text-red-200">
                        {alert.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-300">
                        {alert.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No active alerts</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
