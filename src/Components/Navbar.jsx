import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaChartBar, FaCog } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Profile from "../Pages/Profile";

const Navbar = () => {
  return (
    <div className="h-screen w-20 text-white fixed flex flex-col items-center py-50 space-y-8 bg-[#1e293b] z-10 ml-8">
      

        <Profile />

      {/* Home */}
      <div className="group relative flex flex-col items-center mb-10">
        <Link to="/">
          <FaHome className="nav-icons hover:text-gray-400" />
        </Link>
        <span className="icon-hover font-ubuntu font-[550]">
          Home
        </span>
      </div>


      {/* Reports */}
      <div className="group relative flex flex-col items-center mb-10">
        <Link to="/reports">
          <FaChartBar className="nav-icons hover:text-gray-400" />
        </Link>
        <span className="icon-hover font-ubuntu font-[550]">
          Reports
        </span>
      </div>

      {/* Settings */}
      <div className="group relative flex flex-col items-center mb-10">
        <Link to="/settings">
          <FaCog className="nav-icons hover:text-gray-400" />
        </Link>
        <span className="icon-hover font-ubuntu font-[550]">
          Settings
        </span>
      </div>
    </div>
  );
};

export default Navbar;
