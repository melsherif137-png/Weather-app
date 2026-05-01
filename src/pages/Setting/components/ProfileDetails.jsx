import React from "react";

const ProfileDetails = () => {
  const UserData = [
    {
      top: "Location",
      bottom: "Reykjavík, IS",
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
      className="w-full max-w-[750px] min-h-[300px] p-6 sm:p-8 rounded-3xl 
                bg-white/5 backdrop-blur-2xl border border-white/10
                shadow-2xl shadow-black/20"
    >
      {/* header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4 items-center">
          {/* avatar */}
          <div className="relative shrink-0">
            <img
              src="/images/Another anime girl in the rain.jpg"
              alt=""
              className="w-20 h-20 rounded-2xl object-cover border border-white/20"
            />
            {/* online dot */}
            <span
              className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 rounded-full
                         bg-emerald-400 border-2 border-white/20"
            />
          </div>

          <div>
            <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wide leading-tight">
              Mohamed ELsherif
            </h1>
            <p className="text-gray-400 text-xs mt-0.5 tracking-wide">
              melsherif137@gmail.com
            </p>
            {/* badge */}
            <span
              className="inline-block mt-2 text-[10px] font-semibold tracking-widest uppercase
                         bg-indigo-500/20 text-indigo-300 border border-indigo-400/30
                         px-2.5 py-0.5 rounded-full"
            >
              Pro Member
            </span>
          </div>
        </div>

        <button
          className="shrink-0 text-xs font-semibold tracking-wide uppercase
                       px-4 py-2 rounded-xl border border-white/15
                       bg-white/5 hover:bg-white/10 text-gray-300
                       hover:text-white transition-all duration-200"
        >
          Edit Profile
        </button>
      </div>

      {/* divider */}
      <div className="w-full h-px bg-white/10 my-5" />

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
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
              {data.top}
            </p>
            <p className="text-lg font-black text-white leading-none">
              {data.bottom}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetails;
