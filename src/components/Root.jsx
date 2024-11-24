import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Snowfall } from "snowfallreact";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Slider from "./Slider/Slider";
import snowflakeImage from "/src//assets/snow.png";

const Root = () => {
  const location = useLocation();

  return (
    <div className="relative">
      <div className="fixed inset-0 pointer-events-none z-[20]">
        <Snowfall
          imageSrc={snowflakeImage}
          windSpeed={1}
          windDirection={45}
          particleCount={15}
        />
      </div>
      <Navbar />
      {location.pathname === "/" && <Slider />}
      <div className="min-h-[calc(100vh-50px)] mt-15">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
