import React from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  User,
  Mail,
  MapPin,
  Phone,
  Camera,
  Save,
  Check,
  Wind,
  Droplets,
  Clock,
} from "lucide-react";

const ProfileState = createContext();

const WEATHER_MAP = [
  {
    min: 38,
    icon: Sun,
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20",
    label: "Scorching",
  },
  {
    min: 30,
    icon: Sun,
    color: "text-amber-300",
    bg: "bg-amber-300/10 border-amber-300/20",
    label: "Sunny",
  },
  {
    min: 24,
    icon: Cloud,
    color: "text-blue-300",
    bg: "bg-blue-300/10 border-blue-300/20",
    label: "Partly Cloudy",
  },
  {
    min: 18,
    icon: CloudRain,
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
    label: "Rainy",
  },
  {
    min: 10,
    icon: CloudLightning,
    color: "text-purple-300",
    bg: "bg-purple-300/10 border-purple-300/20",
    label: "Stormy",
  },
  {
    min: -99,
    icon: CloudSnow,
    color: "text-cyan-300",
    bg: "bg-cyan-300/10 border-cyan-300/20",
    label: "Snowy",
  },
];

const getWeather = (temp) =>
  WEATHER_MAP.find((w) => temp >= w.min) ?? WEATHER_MAP.at(-1);

const INITIAL_FORM = {
  name: "Alex River",
  location: "Reykjavík, Iceland",
  email: "alex.river@aether-observer.io",
  phone: "+354 555 0124",
};

const STATS = [
  { value: "142", label: "Reports" },
  { value: "38", label: "Days" },
  { value: "12", label: "Cities" },
  { value: "4.9", label: "Rating" },
];

// ─── FloatingField ────────────────────────────────────────
const FloatingField = ({
  id,
  label,
  icon: Icon,
  iconColor,
  type = "text",
  value,
  onChange,
}) => (
  <div className="relative w-full">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      autoComplete="off"
      className="
              peer w-full h-[50px] sm:h-[54px]
              pt-[18px] pb-[6px] pl-[42px] pr-4
              bg-white/[0.04]
              border border-white/[0.09]
              rounded-2xl
              text-[13.5px] text-white/95
              outline-none
              caret-blue-400
              transition-all duration-200
              focus:border-blue-400/40
              focus:bg-blue-400/[0.05]
              placeholder-transparent
            "
    />

    <label
      htmlFor={id}
      className="
              absolute left-[42px] top-1/2 -translate-y-1/2
              text-[13px] text-white/30 pointer-events-none
              transition-all duration-200
      
              peer-focus:top-[10px]
              peer-focus:translate-y-0
              peer-focus:text-[10.5px]
              peer-focus:text-white/40
      
              peer-[&:not(:placeholder-shown)]:top-[10px]
              peer-[&:not(:placeholder-shown)]:translate-y-0
              peer-[&:not(:placeholder-shown)]:text-[10.5px]
              peer-[&:not(:placeholder-shown)]:text-white/40
            "
    >
      {label}
    </label>

    <Icon
      size={15}
      className={`
              absolute left-[14px] top-1/2 -translate-y-1/2
              ${iconColor} opacity-60
            `}
    />
  </div>
);

const ProfileContextProvider = ({ children }) => {
  // profile details
  const [form, setForm] = useState(() => {
    const savedForm = localStorage.getItem("profile-form");

    return savedForm ? JSON.parse(savedForm) : INITIAL_FORM;
  });

  useEffect(() => {
    localStorage.setItem("profile-form", JSON.stringify(form));
  }, [form]);

  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem("profile-avatar") || null;
  });

  const [saved, setSaved] = useState(false);

  return (
    <ProfileState.Provider
      value={{
        form,
        setForm,
        avatar,
        setAvatar,
        saved,
        setSaved,
        getWeather,
        STATS,
        FloatingField,
      }}
    >
      {children}
    </ProfileState.Provider>
  );
};
export default ProfileContextProvider;
export const useProfile = () => {
  const context = useContext(ProfileState);
  if (!context) {
    throw new Error("useSearch must be used inside SearchContextProvider");
  }
  return context;
};
