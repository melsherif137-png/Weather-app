import { useState } from "react";
import AddCity from "../../components/AddCity";
import Footer from "./components/Footer";
import HourlyForecast from "./components/HourlyForecast";
import NavBar from "../../components/NavBar";
import WeatherDetails from "./components/WeatherDetails";
import WeatherGridDetails from "./components/WeatherGridDetails";
import OtherCity from "./OtherCity";

const Content = ({ isOpen, getCurrentWeather, openModal, setOpenModal }) => {
  return (
    <div
      className={`content
      mt-13
      lg:mt-0
      md:mt-0
      flex flex-col
      min-h-screen
      w-full
      overflow-x-hidden
      transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <div className="content-details flex flex-col md:flex-col lg:flex-row overflow-y-auto">
        <div className="left-side flex-[2.5]">
          <WeatherDetails getCurrentWeather={getCurrentWeather} />
          <WeatherGridDetails />
          <HourlyForecast />
        </div>
        <div className="right-side flex-1 md:p-6 sm:p-6 p-6 lg:p-0">
          <OtherCity />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Content;
