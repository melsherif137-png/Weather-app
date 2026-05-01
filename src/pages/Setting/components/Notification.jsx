import React, { useState } from "react";
import { AlertTriangle, Sun, List } from "lucide-react";

const notifications = [
  {
    id: 0,
    title: "Severe Weather Alerts",
    desc: "Instant critical hazard notifications",
    category: "Critical",
    icon: AlertTriangle,
    iconColor: "text-red-400",
    iconBg: "bg-red-500/20 border border-red-400/20",
  },
  {
    id: 1,
    title: "Daily Forecast",
    desc: "Summary delivered every morning",
    category: "Daily",
    icon: Sun,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/20 border border-amber-400/20",
  },
  {
    id: 2,
    title: "Precipitation Warnings",
    desc: "Rain, snow & storm alerts",
    category: "Warning",
    icon: List,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/20 border border-indigo-400/20",
  },
];

const Toggle = ({ checked, onChange, disabled }) => (
  <button
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`
      relative w-10 h-[22px] rounded-full transition-colors duration-200
      ${checked ? "bg-indigo-500" : "bg-white/15"}
      ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
    `}
  >
    <span
      className={`
        absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white
        transition-transform duration-200
        ${checked ? "translate-x-[18px]" : "translate-x-0"}
      `}
    />
  </button>
);

const Notification = () => {
  const [masterOn, setMasterOn] = useState(true);
  const [states, setStates] = useState({ 0: true, 1: true, 2: true });

  const handleMaster = (val) => {
    setMasterOn(val);
    setStates({ 0: val, 1: val, 2: val });
  };

  const handleItem = (id, val) => {
    setStates((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <div className="p-4 bg-white/5 backdrop-blur-3xl rounded-3xl">
      {/* Master row */}
      <div
        className="
          flex items-center justify-between
          mb-4 px-4 py-3 rounded-2xl
          bg-white/5 border border-white/10
        "
      >
        <div className="flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="text-xs text-gray-400 font-medium tracking-wide">
            All notifications
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-medium ${masterOn ? "text-indigo-400" : "text-gray-500"}`}
          >
            {masterOn ? "Enabled" : "Disabled"}
          </span>
          <Toggle checked={masterOn} onChange={handleMaster} />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
        {notifications.map(
          ({ id, title, desc, category, icon: Icon, iconColor, iconBg }) => {
            const isOn = states[id];
            return (
              <div
                key={id}
                className={`
                group relative rounded-2xl p-4
                bg-white/5 border border-white/10
                flex flex-col gap-2
                transition-all duration-200
                ${!masterOn ? "opacity-40" : "hover:bg-white/10 hover:border-white/20"}
              `}
              >
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${iconBg}`}
                  >
                    <Icon size={15} className={iconColor} />
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                    {category}
                  </span>
                </div>

                {/* Title */}
                <p className="text-white font-bold text-sm leading-tight truncate mt-1">
                  {title}
                </p>

                {/* Desc */}
                <p className="text-gray-400 text-xs truncate -mt-1">{desc}</p>

                {/* Divider */}
                <div className="w-full h-px bg-white/8 mt-1" />

                {/* Toggle row */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-medium tracking-wide ${isOn && masterOn ? "text-indigo-400" : "text-gray-500"}`}
                  >
                    {isOn && masterOn ? "● Active" : "○ Off"}
                  </span>
                  <Toggle
                    checked={isOn}
                    onChange={(val) => handleItem(id, val)}
                    disabled={!masterOn}
                  />
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default Notification;
