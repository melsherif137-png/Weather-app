import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Content from "../pages/Home/Content";
import Search from "../pages/Search/Search";
import AddCity from "./AddCity";
import Location from "../pages/Locations/Location";
import Footer from "../pages/Home/components/Footer";
import Calender from "../pages/Calender/Calender";
import Setting from "../pages/Setting/Setting";
const MainContent = ({
  isOpen,
  setIsOpen,
  getCurrentWeather,
  setOpenModal,
  openModal,
}) => {
  return (
    <div
      className={`content
      ${isOpen ? "lg:ml-64 md:ml-64" : "lg:ml-16 md:ml-17"}
      mt-13
      lg:mt-0
      md:mt-0
      flex flex-col
      min-h-screen
      w-full
      p-2 lg:p-6 
      overflow-y-auto
      transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <NavBar isOpen={isOpen} setOpenModal={setOpenModal} />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route
          path="/Home"
          element={
            <Content
              isOpen={isOpen}
              getCurrentWeather={getCurrentWeather}
              setOpenModal={setOpenModal}
              openModal={openModal}
            />
          }
        />
        <Route
          path="/Search"
          element={
            <Search
              isOpen={isOpen}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          }
        />
        <Route path="/Location" element={<Location />} />
        <Route path="/Calender" element={<Calender />} />
        <Route path="/Setting" element={<Setting />} />
      </Routes>
      <AddCity openModal={openModal} onClose={() => setOpenModal(false)} />
      <Footer />
    </div>
  );
};

export default MainContent;
