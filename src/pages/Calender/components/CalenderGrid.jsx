import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";
import { motion } from "framer-motion";
import { useWeather } from "../../../context/WeatherState";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ───────────────────────────── */
/* Weather Icon */
/* ───────────────────────────── */

const getWeatherIcon = (temp) => {
  if (temp >= 35) {
    return <Sun size={22} className="text-amber-300" />;
  }

  if (temp >= 28) {
    return <Sun size={22} className="text-yellow-400" />;
  }

  if (temp >= 22) {
    return <Cloud size={22} className="text-blue-300" />;
  }

  if (temp >= 16) {
    return <CloudRain size={22} className="text-blue-400" />;
  }

  if (temp >= 8) {
    return <CloudLightning size={22} className="text-purple-400" />;
  }

  return <CloudSnow size={22} className="text-cyan-300" />;
};

/* ───────────────────────────── */
/* Weather Background */
/* ───────────────────────────── */

const getWeatherBg = (temp) => {
  if (temp >= 35) {
    return "from-orange-500/20 to-amber-500/10";
  }

  if (temp >= 28) {
    return "from-yellow-500/20 to-orange-400/10";
  }

  if (temp >= 22) {
    return "from-sky-500/20 to-blue-400/10";
  }

  if (temp >= 16) {
    return "from-blue-600/20 to-indigo-500/10";
  }

  if (temp >= 8) {
    return "from-purple-600/20 to-violet-500/10";
  }

  return "from-cyan-500/20 to-blue-300/10";
};

/* ───────────────────────────── */
/* Card */
/* ───────────────────────────── */

const SkeletonBox = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-white/10 rounded-xl ${className}`} />
  );
};
const rowVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const WeatherCard = ({ dateObj, isToday, day, dayAbbr }) => {
  const dateNum = dateObj.getDate();

  const monthAbbr = dateObj.toLocaleDateString("en-US", {
    month: "short",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: false, amount: 0.3 }}
      className={`
    relative rounded-2xl p-3
    flex flex-col items-center gap-2
    border
    cursor-default select-none
    backdrop-blur-lg overflow-hidden
    min-h-[170px]
    transition-transform duration-300

    ${
      isToday
        ? "bg-gradient-to-b from-indigo-600/35 to-purple-700/20 border-indigo-400/70 shadow-lg shadow-indigo-500/20 scale-[1.04] z-10"
        : day
          ? `bg-gradient-to-b ${getWeatherBg(day.maxTemp)} border-white/10 hover:border-white/20 hover:scale-[1.02]`
          : "bg-white/[0.03] border-white/5"
    }
  `}
    >
      {/* Today Badge */}
      {isToday && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
          <span
            className="
              text-[9px]
              font-bold
              tracking-widest
              uppercase
              bg-indigo-500
              text-white
              px-2.5 py-0.5
              rounded-b-lg
              shadow
            "
          >
            Today
          </span>
        </div>
      )}

      {/* Day */}
      <div
        className={`
          mt-3 text-[10px]
          font-bold tracking-widest uppercase

          ${isToday ? "text-indigo-300" : "text-gray-400"}
        `}
      >
        {dayAbbr}
      </div>

      {/* Date */}
      <div
        className={`
          text-xl font-black leading-none

          ${isToday ? "text-white" : "text-gray-200"}
        `}
      >
        {dateNum}
      </div>

      {/* Month */}
      <div className="text-[12px] text-gray-200 uppercase tracking-wide -mt-1">
        {monthAbbr}
      </div>

      {/* Weather */}
      {day && (
        <>
          <div
            className={`
              w-full h-px

              ${isToday ? "bg-indigo-400/40" : "bg-white/10"}
            `}
          />

          <div className="my-1">{getWeatherIcon(day.maxTemp)}</div>

          <div
            className={`
              text-lg font-black leading-none

              ${isToday ? "text-white" : "text-gray-100"}
            `}
          >
            {day.maxTemp}°
          </div>

          <div className="text-[11px] text-gray-400 font-medium">
            {day.minTemp}°
          </div>
        </>
      )}
    </motion.div>
  );
};

/* ───────────────────────────── */
/* Main Component */
/* ───────────────────────────── */

const CalenderGrid = () => {
  const { calenderWeather, loading } = useWeather();

  const today = new Date();

  const todayStr = today.toISOString().split("T")[0];

  const todayDayIndex = today.getDay();

  /* ───────────────────────────── */
  /* Current Week Dates */
  /* ───────────────────────────── */

  const weekDates = DAY_LABELS.map((_, i) => {
    const d = new Date(today);

    d.setDate(today.getDate() + (i - todayDayIndex));

    return d;
  });

  /* ───────────────────────────── */
  /* Convert Weather Array → Object */
  /* ───────────────────────────── */

  const weatherByDate = {};

  calenderWeather?.forEach((day) => {
    weatherByDate[day.date] = day;
  });

  /* ───────────────────────────── */
  /* Remove Duplicate Dates */
  /* ───────────────────────────── */

  const firstRowDateStrs = new Set(
    weekDates.map((d) => d.toISOString().split("T")[0]),
  );

  const remainingDays =
    calenderWeather?.filter((d) => !firstRowDateStrs.has(d.date)) || [];

  /* ───────────────────────────── */
  /* Loading State */
  /* ───────────────────────────── */
  if (loading) {
    return (
      <div className="px-4 pt-4 pb-6 space-y-3">
        {/* Week Skeleton */}
        <div className="grid grid-cols-7 gap-1 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 py-2">
              <SkeletonBox className="w-10 h-3" />
              <SkeletonBox className="w-6 h-3" />
            </div>
          ))}
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-3 border border-white/10 bg-white/5 backdrop-blur-xl min-h-[170px] flex flex-col items-center gap-3"
            >
              <SkeletonBox className="w-12 h-3" />
              <SkeletonBox className="w-8 h-8 rounded-full" />
              <SkeletonBox className="w-10 h-4" />
              <SkeletonBox className="w-6 h-3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ───────────────────────────── */
  /* Main Render */
  /* ───────────────────────────── */

  return (
    <div className="px-4 pt-4 pb-6 space-y-3">
      {/* ───────────────────────────── */}
      {/* Top Week Bar */}
      {/* ───────────────────────────── */}

      <div
        className="
          grid grid-cols-7
          rounded-2xl overflow-hidden
          border border-white/10
          bg-white/5 backdrop-blur-xl
        "
      >
        {DAY_LABELS.map((label, i) => {
          const isActiveDay = i === todayDayIndex;

          const dateNum = weekDates[i].getDate();

          return (
            <div
              key={label}
              className={`
                flex flex-col items-center justify-center
                py-2.5 gap-0.5
                transition-all duration-300

                ${
                  isActiveDay
                    ? "bg-gradient-to-b from-indigo-500/40 to-purple-500/20 border-b-2 border-indigo-400"
                    : "hover:bg-white/5 border-b-2 border-transparent"
                }
              `}
            >
              <span
                className={`
                  text-[11px]
                  font-semibold
                  tracking-widest
                  uppercase

                  ${isActiveDay ? "text-indigo-300" : "text-gray-400"}
                `}
              >
                {label}
              </span>

              <span
                className={`
                  text-xs font-bold

                  ${isActiveDay ? "text-white" : "text-gray-500"}
                `}
              >
                {dateNum}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="
          grid gap-3
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-5
          lg:grid-cols-7
        "
      >
        {[...weekDates, ...remainingDays].map((item) => {
          const dateObj = item.date ? new Date(item.date) : item;

          const dateStr = dateObj.toISOString().split("T")[0];

          const isToday = dateStr === todayStr;

          const day = weatherByDate?.[dateStr];

          const dayAbbr = DAY_LABELS[dateObj.getDay()];

          return (
            <WeatherCard
              key={dateStr}
              dateObj={dateObj}
              isToday={isToday}
              day={day}
              dayAbbr={dayAbbr}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalenderGrid;
