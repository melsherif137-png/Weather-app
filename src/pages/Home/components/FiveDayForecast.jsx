import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { getWeatherIcon } from "../../../components/weatherIcons";
import { useWeather } from "../../../context/WeatherState";

const getDayName = (date) =>
  new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);

const getShortDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(date);

const getClosestToMidday = (items) =>
  items.reduce((closest, item) => {
    const itemHour = new Date(item.dt * 1000).getHours();
    const closestHour = new Date(closest.dt * 1000).getHours();

    return Math.abs(itemHour - 12) < Math.abs(closestHour - 12)
      ? item
      : closest;
  }, items[0]);

const getFiveDayForecast = (forecast) => {
  if (!Array.isArray(forecast?.list)) return [];

  const today = new Date().toISOString().slice(0, 10);
  const groupedByDate = forecast.list.reduce((days, item) => {
    const dateKey = item.dt_txt.split(" ")[0];
    days[dateKey] = [...(days[dateKey] || []), item];
    return days;
  }, {});

  const dailyForecast = Object.entries(groupedByDate)
    .filter(([dateKey]) => dateKey !== today)
    .map(([dateKey, items]) => {
      const temps = items.map((item) => item.main.temp);
      const representative = getClosestToMidday(items);

      return {
        date: new Date(`${dateKey}T12:00:00`),
        minTemp: Math.round(Math.min(...temps)),
        maxTemp: Math.round(Math.max(...temps)),
        condition: representative.weather?.[0]?.main || "Clouds",
        description: representative.weather?.[0]?.description || "Unavailable",
      };
    });

  return dailyForecast.slice(0, 5);
};

const MotionArticle = motion.article;

const FiveDayForecast = () => {
  const { forecast, loading, city } = useWeather();
  const dailyForecast = getFiveDayForecast(forecast);

  return (
    <section className="flex min-h-[200px] w-full flex-col px-6 py-8 text-white">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">5-Day Forecast</h2>
          <p className="mt-1 text-sm font-semibold text-purple-400 md:text-base">
            Upcoming weather for {city || "your location"}
          </p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md md:h-14 md:w-14">
          <CalendarDays className="text-amber-300" size={24} />
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="min-h-52 rounded-3xl bg-white/10 p-5 backdrop-blur-md"
              >
                <div className="mb-4 h-5 w-20 rounded bg-white/20" />
                <div className="mb-6 h-16 w-16 rounded-2xl bg-white/20" />
                <div className="h-9 w-28 rounded bg-white/20" />
                <div className="mt-3 h-4 w-full rounded bg-white/20" />
              </div>
            ))
          : dailyForecast.map((day, index) => (
              <MotionArticle
                key={day.date.toISOString()}
                className="flex min-h-52 flex-col justify-between rounded-3xl border border-white/10 bg-white/10 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.06 * index,
                }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold">
                      {getDayName(day.date)}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">
                      {getShortDate(day.date)}
                    </p>
                  </div>
                  <div className="[&_svg]:h-10 [&_svg]:w-10">
                    {getWeatherIcon(day.condition)}
                  </div>
                </div>

                <div>
                  <p className="text-4xl font-bold leading-none">
                    {day.maxTemp}
                    {"\u00b0"}
                    <span className="ml-2 text-xl text-white/55">
                      {day.minTemp}
                      {"\u00b0"}
                    </span>
                  </p>
                  <p className="mt-4 text-base capitalize leading-relaxed text-white/70">
                    {day.description}
                  </p>
                </div>
              </MotionArticle>
            ))}
      </div>
    </section>
  );
};

export default FiveDayForecast;
