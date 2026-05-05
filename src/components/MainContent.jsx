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
import Profile from "./Profile";
import Login from "./Login";
import SignUp from "./SignUp";
import { useWeather } from "../context/WeatherState";
const MainContent = ({
  isOpen,
  setIsOpen,
  getCurrentWeather,
  setOpenModal,
  openModal,
}) => {
  const { error, loadWeather } = useWeather();

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
      transition-all duration-300 ease-in-out overflow-hidden
      relative z-10`}
    >
      <NavBar isOpen={isOpen} setOpenModal={setOpenModal} />
      {error ? (
        <div className="flex min-h-[70vh] items-center justify-center text-white">
          <div className="max-w-md rounded-3xl border border-red-400/20 bg-red-500/10 px-8 py-7 text-center backdrop-blur-xl">
            <p className="text-xl font-bold">Weather data unavailable</p>
            <p className="mt-3 text-sm text-gray-200">{error}</p>
            <button
              onClick={() => loadWeather()}
              className="mt-5 rounded-2xl bg-amber-300 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <>
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
            <Route path="/Profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
          <AddCity openModal={openModal} onClose={() => setOpenModal(false)} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainContent;
