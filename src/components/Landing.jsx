import React from "react";
import Silder from "./Silder";
import Content from "../pages/Home/Content";
import { Routes, Route, Navigate } from "react-router-dom";
import Search from "../pages/Search/Search";
import NavBar from "./NavBar";
import AddCity from "./AddCity";
import MainContent from "./MainContent";
const Landing = ({
  isOpen,
  setIsOpen,
  getCurrentWeather,
  setOpenModal,
  openModal,
}) => {
  return (
    <div
      className="Landing relative flex min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/thunderstorm-countryside.jpg')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <Silder isOpen={isOpen} setIsOpen={setIsOpen} />
      <MainContent
        className="relative z-10"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setOpenModal={setOpenModal}
        openModal={openModal}
        getCurrentWeather={getCurrentWeather}
      />
    </div>
  );
};

export default Landing;
