import { Droplets, Wind, Navigation, Gauge } from "lucide-react";
import { useWeather } from "../../../context/WeatherState";

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

const formatValue = (value, suffix = "") => {
  if (value === null || value === undefined || value === "--") return "--";
  return `${Math.round(value * 10) / 10}${suffix}`;
};

const WeatherGridDetails = () => {
  const { gridDetails, loading } = useWeather();

  const weatherData = [
    {
      title: "Humidity",
      value: formatValue(gridDetails?.humidity, "%"),
      desc:
        gridDetails?.dewPoint === "--" || gridDetails?.dewPoint === undefined
          ? "Dew point is unavailable right now"
          : `Dew point ${formatValue(gridDetails?.dewPoint, "°")}`,
      icon: Droplets,
    },
    {
      title: "Wind",
      value: formatValue(gridDetails?.windSpeed, " km/h"),
      desc: `From ${getWindDirectionLabel(gridDetails?.windDirection)}`,
      icon: Wind,
    },
    {
      title: "Wind Direction",
      value: getWindDirectionLabel(gridDetails?.windDirection),
      desc:
        typeof gridDetails?.windDirection === "number"
          ? `${Math.round(gridDetails.windDirection)}° heading`
          : "Current wind heading is unavailable",
      icon: Navigation,
      iconRotation: gridDetails?.windDirection,
    },
    {
      title: "Pressure",
      value: formatValue(gridDetails?.pressure, " mb"),
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
                {/* Shimmer */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmerX" />
                {/* Skeleton Content */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-white/20"></div>
                  <div className="h-4 w-20 rounded bg-white/20"></div>
                </div>

                <div className="space-y-3">
                  <div className="h-8 w-24 rounded bg-white/20"></div>
                  <div className="h-4 w-full rounded bg-white/20"></div>
                  <div className="h-4 w-3/4 rounded bg-white/20"></div>
                </div>
              </div>
            ))
          : weatherData.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="min-h-44 rounded-3xl border border-white/10 bg-white/10 p-5 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/15 animate-fadeInX"
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
                    <h2 className="text-3xl font-bold tracking-tight">
                      {item.value}
                    </h2>

                    <p className="text-sm leading-relaxed text-white/70">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default WeatherGridDetails;
