import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
} from "lucide-react";

export const getWeatherIcon = (main) => {
  switch (main) {
    case "Clear":
      return <Sun size={50} className="text-yellow-400" />;

    case "Clouds":
      return <Cloud size={50} className="text-gray-300" />;

    case "Rain":
      return <CloudRain size={50} className="text-blue-400" />;

    case "Thunderstorm":
      return <CloudLightning size={50} className="text-purple-400" />;

    case "Snow":
      return <Snowflake size={50} className="text-blue-200" />;

    case "Mist":
    case "Fog":
      return <CloudFog size={50} className="text-gray-400" />;

    default:
      return <Cloud size={50} className="text-gray-300" />;
  }
};
