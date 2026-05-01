import {
  Home,
  CalendarDays,
  Search,
  MapPin,
  Settings,
  Cloudy,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Silder = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 1, title: "Home", icon: Home, path: "/home" },
    { id: 2, title: "Search", icon: Search, path: "/search" },
    { id: 3, title: "Location", icon: MapPin, path: "/location" },
    { id: 4, title: "Calender", icon: CalendarDays, path: "/Calender" },
    { id: 5, title: "Settings", icon: Settings, path: "/setting" },
  ];

  return (
    <>
      {/* ================= MOBILE TOP NAV ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden md:hidden h-16 px-4 bg-black/30 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between">
        <NavLink to={"/home"}>
          <div className="flex items-center gap-2">
            <Cloudy className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-lg">SkyCast</span>
          </div>
        </NavLink>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white cursor-pointer"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 lg:hidden md:hidden bg-black/40 backdrop-blur-2xl border-b border-white/10 overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-96 opacity-100 py-3"
            : "max-h-0 opacity-0 py-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-4 gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `h-12 rounded-2xl px-4 flex items-center gap-3 text-white transition ${
                    isActive ? "bg-white/20" : "hover:bg-white/10"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`hidden lg:block md:block fixed left-2 top-[2.5dvh] h-[95dvh] ${
          isOpen ? "w-64" : "w-20"
        } bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/20 z-50 overflow-hidden transition-all duration-300`}
      >
        <div className="flex h-full flex-col py-4 px-2">
          {/* LOGO */}
          <div className="mb-8">
            <div
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-between gap-3 bg-gray-800 px-3 py-3 rounded-2xl cursor-pointer w-full mb-2"
            >
              <div className="flex items-center gap-2">
                <Cloudy className="w-7 h-7 text-white ml-2 mb-1" />
                <span
                  className={`text-white font-semibold text-lg whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isOpen ? "opacity-100 max-w-[120px]" : "opacity-0 max-w-0"
                  }`}
                >
                  SkyCast
                </span>
              </div>

              {isOpen && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </div>

          {/* MENU */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `h-12 pl-2 rounded-2xl flex items-center transition ${
                      isActive ? "bg-white/20" : "hover:bg-white/10"
                    }`
                  }
                >
                  <div className="w-12 flex justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <span
                    className={`text-white whitespace-nowrap overflow-hidden transition-all duration-300 ${
                      isOpen ? "opacity-100 max-w-[140px]" : "opacity-0 max-w-0"
                    }`}
                  >
                    {item.title}
                  </span>
                </NavLink>
              );
            })}
          </nav>

          {/* FOOTER */}
          <div className="mt-auto h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            {isOpen ? (
              <span className="text-white text-sm">Weather App</span>
            ) : (
              <Cloudy className="w-5 h-5 text-white" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Silder;
