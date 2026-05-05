import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../../../context/ProfileContext";
// import { useAuth } from "../../../context/LoginContext";
import { motion } from "framer-motion";

const ProfileDetails = () => {
  const { form, avatar, initials } = useProfile();
  // const { currentUser } = useAuth();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const isLocked = !currentUser;

  const UserData = [
    {
      top: "Location",
      bottom: form.location || "__",
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
    <motion.div
      className="relative w-full max-w-[750px] min-h-[300px] p-3 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/20"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: false, amount: 0.1 }}
    >
      {/* LOCK OVERLAY */}
      {isLocked && (
        <div className="absolute inset-0 rounded-3xl bg-black/50 backdrop-blur-md flex items-center justify-center z-20">
          <div className="text-center text-white">
            <p className="text-lg font-semibold">Profile Locked</p>
            <p className="text-sm text-white/60 mt-1">
              Please login to view and edit your profile
            </p>
            <Link to="/Login">
              <button className="mt-4 px-4 py-2 rounded-xl bg-purple-500/30 border border-purple-400/30 hover:bg-purple-500/40 transition">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div
        className={`flex items-center justify-between gap-4 ${isLocked ? "opacity-40" : ""}`}
      >
        <div className="flex gap-4 items-center">
          {/* AVATAR */}
          <div className="relative shrink-0">
            <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] xl:w-[115px] xl:h-[115px] rounded-full overflow-hidden bg-gradient-to-br from-blue-400/15 to-purple-500/15 border border-white/10 flex items-center justify-center text-white/90 text-[1.8rem] font-black">
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

            <span className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white/20" />
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-white text-md lg:text-2xl font-bold">
              {form.name || currentUser?.name || "—"}
            </h1>
            <p className="text-gray-300 text-xs mt-1 max-w-[180px] break-all">
              {currentUser?.email || "__"}
            </p>

            <span className="inline-block mt-2 text-[9px] lg:text-xs font-semibold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded-full">
              Pro Member
            </span>
          </div>
        </div>

        {/* EDIT BUTTON */}
        {currentUser ? (
          <Link to="/profile">
            <button className="text-xs font-semibold px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition">
              Edit Profile
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="text-xs font-semibold px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-500 cursor-not-allowed"
          >
            Locked
          </button>
        )}
      </div>

      {/* DIVIDER */}
      <div className="w-full h-px bg-white/10 my-6" />

      {/* STATS */}
      <div
        className={`grid grid-cols-3 gap-3 mt-10 ${isLocked ? "opacity-40" : ""}`}
      >
        {UserData.map((data, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1 p-4 rounded-2xl bg-white/5 border border-white/10"
          >
            <p className="text-[8px] lg:text-xs text-gray-400 uppercase tracking-widest font-medium">
              {data.top}
            </p>
            <p className="text-[12px] lg:text-xs font-black text-white">
              {data.bottom}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileDetails;
