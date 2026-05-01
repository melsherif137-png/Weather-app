import React from "react";

const Footer = () => {
  const links = ["Privacy", "Satellite Map", "API Resources"];
  return (
    <div className="footer ">
      <div className="wrapper flex justify-between items-center gap-4  text-gray-300 px-8 mt-3">
        <div className="left">
          <span className="lg:text-[14px] md:text-md text-[10px] hover:text-white transition-all duration-300 ease-in-out">
            © 2026 Aether Weather System. All Atmospheric Data is Real-time.
          </span>
        </div>

        <div className="rigth flex gap-3 ">
          {links.map((name, index) => {
            return (
              <span
                key={index}
                className="text-gray-300 lg:text-[14px] md:text-md text-[10px] hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
              >
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
