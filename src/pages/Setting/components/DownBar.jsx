import React from "react";
import { Cloud, Lock, FileText, Info, Star } from "lucide-react";

const links = [
  {
    label: "Privacy Policy",
    sub: "Data & usage",
    icon: Lock,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10 border border-indigo-400/20",
    fn: "onPrivacy",
  },
  {
    label: "Terms of Use",
    sub: "Legal & conditions",
    icon: FileText,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border border-amber-400/20",
    fn: "onTerms",
  },
  {
    label: "About",
    sub: "App info & team",
    icon: Info,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border border-emerald-400/20",
    fn: "onAbout",
  },
  {
    label: "Rate App",
    sub: "Leave a review",
    icon: Star,
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10 border border-red-400/20",
    fn: "onRate",
  },
];

const DownBar = ({
  appName = "SkyCast",
  developer = "Mohamed Elsherif",
  version = "2.4.1",
  onPrivacy,
  onTerms,
  onAbout,
  onRate,
}) => {
  const handlers = { onPrivacy, onTerms, onAbout, onRate };

  return (
    <div
      className="
        w-full rounded-3xl
        p-4 sm:p-5 lg:p-6
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        flex flex-col gap-5 mt-10
      "
    >
      {/* App info */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div
            className="
              w-10 h-10 sm:w-12 sm:h-12
              rounded-2xl
              bg-indigo-500/15 border border-indigo-400/25
              flex items-center justify-center
              flex-shrink-0
            "
          >
            <Cloud
              size={20}
              className="text-indigo-400 sm:w-[22px] sm:h-[22px]"
            />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-sm sm:text-base lg:text-lg
                text-white font-bold
                truncate
              "
            >
              {appName}
            </p>

            <p
              className="
                text-[10px] sm:text-[11px] lg:text-md
                text-gray-300
                truncate
              "
            >
              by {developer} · v{version}
            </p>
          </div>
        </div>

        <div
          className="
            hidden sm:flex
            items-center gap-2
            text-[10px] sm:text-[11px]
            text-indigo-400
            bg-indigo-500/10
            border border-indigo-400/20
            rounded-lg
            px-2.5 sm:px-3
            py-1.5
            flex-shrink-0
          "
        >
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Up to date
        </div>
      </div>

      <div className="w-full h-px bg-white/10" />

      {/* Links grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {links.map(({ label, sub, icon: Icon, iconColor, iconBg, fn }) => (
          <button
            key={label}
            onClick={handlers[fn]}
            className="
              flex items-center justify-between
              p-3 sm:p-3.5
              rounded-2xl text-left
              bg-white/4 border border-white/8
              hover:bg-white/8 hover:border-white/14
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-200
              cursor-pointer
            "
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`
                  w-8 h-8 sm:w-9 sm:h-9
                  rounded-xl
                  flex items-center justify-center
                  flex-shrink-0
                  ${iconBg}
                `}
              >
                <Icon size={14} className={`${iconColor} sm:w-4 sm:h-4`} />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[11px] sm:text-[12px] lg:text-[13px]
                    font-semibold text-gray-200
                    truncate
                  "
                >
                  {label}
                </p>

                <p
                  className="
                    text-[9px] sm:text-[10px] lg:text-[11px]
                    text-gray-300 mt-0.5
                    truncate
                  "
                >
                  {sub}
                </p>
              </div>
            </div>

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="
                text-gray-600 flex-shrink-0
                w-3.5 h-3.5 sm:w-4 sm:h-4
              "
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>

      <div className="w-full h-px bg-white/10" />

      {/* Copyright */}
      <p
        className="
          text-[9px] sm:text-[10px] lg:text-[11px]
          text-gray-700 text-center
        "
      >
        © 2025 {appName}. All rights reserved.
      </p>
    </div>
  );
};

export default DownBar;
