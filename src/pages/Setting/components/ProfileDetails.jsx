import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../../../context/ProfileContext";
const ProfileDetails = () => {
  const { form, setForm, avatar, setAvatar } = useProfile();
  const UserData = [
    {
      top: "Location",
      bottom: ` ${form.location || "__"}`,
    },
    {
      top: "Joined",
      bottom: "Oct 2023",
    },
    {
      top: "Devices",
      bottom: "3 Active",
    },
  ];
  return (
    <div
      className="w-full max-w-[750px] min-h-[300px] p-3 sm:p-8 rounded-3xl 
                bg-white/5 backdrop-blur-2xl border border-white/10
                shadow-2xl shadow-black/20"
    >
      {/* header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4 items-center">
          {/* avatar */}
          <div className="relative shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-18 h-18 lg:w-22 lg:h-22 rounded-2xl object-cover border border-white/20"
              />
            ) : (
              initials
            )}
            {/* online dot */}

            <span
              className="absolute bottom-1.5 right-1.5 lg:w-2.5 lg:h-2.5 w-2 h-2 rounded-full
                         bg-emerald-400 border-2 border-white/20"
            />
          </div>

          <div>
            <h1 className="text-white text-md lg:text-2xl font-bold tracking-wide leading-tight">
              {form.name || "__"}
            </h1>
            <p className="text-gray-400 text-[10px] lg:xs mt-0.5 tracking-wide">
              {form.email || "__"}
            </p>
            {/* badge */}
            <span
              className="inline-block mt-2 lg:text-xs text-[9px] font-semibold tracking-widest uppercase
                         bg-indigo-500/20 text-indigo-300 border border-indigo-400/30
                         px-2.5 py-0.5 rounded-full"
            >
              Pro Member
            </span>
          </div>
        </div>
        <Link to={"./profile"}>
          <button
            className="shrink-0 lg:text-xs text-[10px]  font-semibold tracking-wide uppercase
                       px-4 py-2 rounded-xl border border-white/15
                       bg-white/5 hover:bg-white/10 text-gray-300
                       hover:text-white transition-all duration-200"
          >
            Edit Profile
          </button>
        </Link>
      </div>

      {/* divider */}
      <div className="w-full h-px bg-white/10 my-6" />

      {/* stats */}
      <div className="grid grid-cols-3 gap-3 mt-10">
        {UserData.map((data, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1
                   p-4 rounded-2xl
                   bg-white/5 border border-white/10
                   hover:bg-white/10 hover:border-white/20
                   transition-all duration-200"
          >
            <p className="lg:text-xs text-[8px] text-gray-400 uppercase tracking-widest font-medium">
              {data.top}
            </p>
            <p className="lg:text-xs text-[16px] font-black text-white leading-none">
              {data.bottom}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetails;
