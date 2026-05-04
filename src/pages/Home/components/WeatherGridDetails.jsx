import { Droplets, Wind, Navigation, Gauge } from "lucide-react";
import { useWeather } from "../../../context/WeatherState";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 1000) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof target !== "number") {
      setValue(0);
      return;
    }

    const easeOutQuad = (t) => 1 - (1 - t) ** 2;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(easeOutQuad(progress) * target);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

const AnimatedNumber = ({ value, decimals = 0 }) => {
  const animated = useCountUp(value, 1000, 800);

  if (typeof value !== "number") return <span>--</span>;

  return <span>{animated.toFixed(decimals)}</span>;
};

const getWindDirectionLabel = (deg) => {
  if (typeof deg !== "number") return "Unavailable";
  const directions = [
    "North",
    "North East",
    "East",
    "South East",
    "South",
    "South West",
    "West",
    "North West",
  ];
  const normalized = ((deg % 360) + 360) % 360;
  const index = Math.round(normalized / 45) % directions.length;
  return directions[index];
};

const WeatherGridDetails = () => {
  const { gridDetails, loading } = useWeather();

  const weatherData = [
    {
      title: "Humidity",
      value: gridDetails?.humidity ?? null,
      suffix: "%",
      decimals: 0,
      desc:
        typeof gridDetails?.dewPoint === "number"
          ? `Dew point ${Math.round(gridDetails.dewPoint)}°`
          : "Dew point is unavailable right now",
      icon: Droplets,
    },
    {
      title: "Wind",
      value: gridDetails?.windSpeed ?? null,
      suffix: " km/h",
      decimals: 1,
      desc: `From ${getWindDirectionLabel(gridDetails?.windDirection)}`,
      icon: Wind,
    },
    {
      title: "Wind Direction",
      value: gridDetails?.windDirection ?? null,
      suffix: "°",
      decimals: 0,
      desc:
        typeof gridDetails?.windDirection === "number"
          ? `${Math.round(gridDetails.windDirection)}° heading`
          : "Current wind heading is unavailable",
      icon: Navigation,
      iconRotation: gridDetails?.windDirection,
    },
    {
      title: "Pressure",
      value: gridDetails?.pressure ?? null,
      suffix: " mb",
      decimals: 0,
      desc: "Current atmospheric pressure",
      icon: Gauge,
    },
  ];

  return (
    <div className="mt-8 px-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden min-h-44 rounded-3xl bg-white/10 p-5 backdrop-blur-md"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmerX" />
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-white/20" />
                  <div className="h-4 w-20 rounded bg-white/20" />
                </div>
                <div className="space-y-3">
                  <div className="h-8 w-24 rounded bg-white/20" />
                  <div className="h-4 w-full rounded bg-white/20" />
                  <div className="h-4 w-3/4 rounded bg-white/20" />
                </div>
              </div>
            ))
          : weatherData.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="min-h-44 rounded-3xl border border-white/10 bg-white/10 p-5 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/15 overflow-hidden"
                  initial={{ y: 175 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                      <Icon
                        className="text-amber-300"
                        size={24}
                        style={{
                          transform:
                            typeof item.iconRotation === "number"
                              ? `rotate(${item.iconRotation}deg)`
                              : undefined,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white/70">
                      {item.title}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-4xl font-bold tracking-tight">
                      {item.value === null ? (
                        <span>--</span>
                      ) : (
                        <AnimatedNumber
                          value={item.value}
                          decimals={item.decimals}
                        />
                      )}
                      <span className="text-xl ml-1 text-white/70">
                        {item.value !== null ? item.suffix : ""}
                      </span>
                    </h2>
                    <p className="text-sm leading-relaxed text-white/70">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
};

export default WeatherGridDetails;
