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
      className="Lnading flex min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: "url('/images/new (1).jpg')",
      }}
    >
      <Silder isOpen={isOpen} setIsOpen={setIsOpen} />
      <MainContent
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
