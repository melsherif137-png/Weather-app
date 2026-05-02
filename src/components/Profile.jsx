import React, { useState, useRef, useCallback, useEffect } from "react";
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
import { useProfile } from "../context/ProfileContext";
// ─── constants ────────────────────────────────────────────

// ─── Weather Widget ───────────────────────────────────────
const WeatherWidget = ({ temp, city, weather }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const WeatherIcon = weather.icon;

  useEffect(() => {
    const tick = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

      setDate(
        now.toLocaleDateString([], {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
      );
    };

    tick();

    const id = setInterval(tick, 30000);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="
        flex flex-col
        sm:flex-row sm:items-center

        gap-5
      min-h-fit
        bg-white/[0.045]
        border border-white/[0.08]

        rounded-[30px]

        px-5 py-5
        sm:px-6 sm:py-6
        xl:px-8 xl:py-7

        backdrop-blur-xl
      "
    >
      {/* icon */}
      <div
        className={`
          w-[64px] h-[64px]
          rounded-full
          border
          flex items-center justify-center
          ${weather.bg}
        `}
      >
        <WeatherIcon size={28} className={weather.color} strokeWidth={1.5} />
      </div>

      {/* temp */}
      <div className="flex flex-col gap-1">
        <p className="font-['Syne',sans-serif] text-[2.3rem] font-black text-white leading-none">
          {temp}
          <span className="text-amber-300/80 text-sm ml-1">°C</span>
        </p>

        <p className="text-white/45 text-sm">{weather.label}</p>
      </div>

      <div className="hidden sm:block w-px h-14 bg-white/[0.08]" />

      {/* details */}
      <div className="flex flex-col gap-2 flex-1">
        {[
          { icon: Droplets, label: "Humidity", value: "63%" },
          { icon: Wind, label: "Wind", value: "14 km/h" },
          { icon: Clock, label: "Updated", value: time },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-[12.5px] text-white/45"
          >
            <Icon size={13} />

            <span>{label}</span>

            <span className="ml-auto text-white/80 font-medium">{value}</span>
          </div>
        ))}
      </div>

      {/* city */}
      <div className="sm:text-right">
        <p className="font-['Syne',sans-serif] font-bold text-white/90 text-[15px]">
          {city}
        </p>

        <p className="text-white/30 text-[11px] mt-1">{date}</p>
      </div>
    </div>
  );
};

// ─── Profile ──────────────────────────────────────────────
const Profile = () => {
  const {
    current,
    form,
    setForm,
    avatar,
    setAvatar,
    saved,
    setSaved,
    getWeather,
    STATS,
    FloatingField,
    initials,
  } = useProfile();

  const temp = Math.round(current?.main?.temp ?? 28);
  const city = current?.name ?? "Cairo, EG";

  const weather = getWeather(temp);

  const fileRef = useRef(null);
  const timerRef = useRef(null);

  const setField = useCallback(
    (key) => (e) =>
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      })),
    [],
  );

  const handleSave = () => {
    setSaved(true);

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setSaved(false);
    }, 2200);
  };

  const handleImg = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);

      localStorage.setItem("profile-avatar", reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      className="
        w-full min-h-fit
        bg-[#0b1120]/60 backdrop-blur-xl
        lg:m-4
        rounded-3xl
        px-3 py-4
        sm:px-5 sm:py-5
        lg:px-8 lg:py-8
        2xl:px-14
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1650px]

          grid
          gap-4
          lg:gap-5
          xl:gap-6

          grid-cols-1
          xl:grid-cols-[360px_minmax(0,1fr)]
        "
      >
        {/* LEFT */}
        <div
          className="
            xl:row-span-2

            flex flex-col items-center

            bg-white/[0.045]
            border border-white/[0.08]

            rounded-[30px]

            px-5 py-7
            sm:px-6 sm:py-8
            xl:px-7 xl:py-9

            backdrop-blur-xl
          "
        >
          {/* avatar */}
          <div
            role="button"
            aria-label="Change avatar"
            className="relative mb-5 cursor-pointer group"
            onClick={() => fileRef.current?.click()}
          >
            <div
              className="
                w-[88px] h-[88px]
                sm:w-[100px] sm:h-[100px]
                xl:w-[115px] xl:h-[115px]

                rounded-full
                overflow-hidden

                bg-gradient-to-br
                from-blue-400/15
                to-purple-500/15

                border border-white/10

                flex items-center justify-center

                text-white/90
                text-[1.8rem]
                font-black

                transition-transform duration-200
                group-hover:scale-[1.03]
              "
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div
              className="
                absolute inset-0
                rounded-full
                bg-black/55

                flex items-center justify-center

                opacity-0
                group-hover:opacity-100

                transition-opacity duration-200
              "
            >
              <Camera size={22} className="text-white" />
            </div>

            <span
              className="
                absolute bottom-1 right-1
                w-[15px] h-[15px]
                rounded-full

                bg-emerald-400
                border-2 border-[#0b1120]
              "
            />

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImg}
            />
          </div>

          {/* name */}
          <h2
            className="
              text-white
              text-center
              font-black

              text-[1.3rem]
              sm:text-[1.45rem]

              leading-tight
            "
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {form.name || "—"}
          </h2>

          <p className="text-white/40 text-sm mt-2 mb-7">
            Weather Observer · Active
          </p>

          {/* divider */}
          <div className="w-full h-px bg-white/[0.07] mb-6" />

          {/* stats */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="
                  bg-white/[0.04]
                  border border-white/[0.08]

                  rounded-2xl

                  p-4

                  flex flex-col gap-1
                "
              >
                <span
                  className="
                    text-white
                    text-[1.2rem]
                    font-black
                    leading-none
                  "
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {value}
                </span>

                <span
                  className="
                    text-white/30
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                  "
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WEATHER */}
        <WeatherWidget temp={temp} city={city} weather={weather} />

        {/* FORM */}
        <div
          className="
            bg-white/[0.045]
            border border-white/[0.08]

            rounded-[30px]

            px-5 py-5
            sm:px-6 sm:py-6
            xl:px-8 xl:py-8

            flex flex-col gap-4

            backdrop-blur-xl
          "
        >
          <p
            className="
              text-[10.5px]
              text-white/28
              uppercase
              tracking-[0.2em]
              font-semibold
            "
          >
            Profile Details
          </p>

          {/* row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingField
              id="fn"
              label="Full name"
              icon={User}
              iconColor="text-blue-300"
              value={form.name}
              onChange={setField("name")}
            />

            <FloatingField
              id="floc"
              label="Location"
              icon={MapPin}
              iconColor="text-emerald-300"
              value={form.location}
              onChange={setField("location")}
            />
          </div>

          <FloatingField
            id="fe"
            label="Email address"
            icon={Mail}
            iconColor="text-purple-300"
            type="email"
            value={form.email}
            onChange={setField("email")}
          />

          <FloatingField
            id="fph"
            label="Phone number"
            icon={Phone}
            iconColor="text-indigo-300"
            type="tel"
            value={form.phone}
            onChange={setField("phone")}
          />

          {/* button */}
          <button
            onClick={handleSave}
            className="
              w-full h-[52px]

              mt-2

              flex items-center justify-center gap-2

              bg-blue-400/10
              border border-blue-400/20

              rounded-2xl

              text-white
              text-sm
              font-bold

              transition-all duration-200

              hover:bg-blue-400/20
              hover:border-blue-400/40
              hover:-translate-y-0.5

              active:scale-[0.99]
            "
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <Save size={16} />
            Save Changes
          </button>

          {saved && (
            <p
              className="
                flex items-center justify-center gap-1.5

                text-[12px]
                text-emerald-400

                font-medium
              "
            >
              <Check size={13} />
              Changes saved successfully
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
