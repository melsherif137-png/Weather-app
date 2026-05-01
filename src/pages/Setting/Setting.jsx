import React from "react";
import Notification from "./components/Notification";
import ProfileDetails from "./components/ProfileDetails";
import DownBar from "./components/DownBar";

const Setting = () => {
  return (
    <div
      className={`content
      mt-13
      lg:mt-0
      md:mt-0
      flex flex-col
      min-h-screen
      w-full
      md:p-6
    lg:p-6
      transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <div className="flex lg:flex-row md:flex-col flex-col gap-4">
        <ProfileDetails className="flex-1" />
        <Notification className="flex-1" />
      </div>
      <DownBar />
    </div>
  );
};

export default Setting;
