import React, { useState, useRef, useEffect, useContext } from "react";
import { CgProfile, CgChevronDown, CgChevronUp } from "react-icons/cg";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context";
import { ToastContainer } from "react-toastify";

const Profile = ({heading}) => {

  const{profileData, login, setProfileData, setLogin} = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  //for the button dsappear
  const [createAccountbutton, setCreateAccountbutton] = useState(false);
  const [loginbutton, setLoginbutton] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  // const navigate= useNavigate();
  const createAccount =  ()=>{
    setCreateAccountbutton = true;
    console.log("CreateAccount page");
  }
  

  return (
    <>
      <div className="bg-slate-800 w-full h-16 flex items-center justify-end px-8 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex mr-10">
        
          <Link to="/CreateAccount">
          {/* Create Account (Outlined style with light blue theme) */}
          {(!login)&&
          <button className="px-5 py-2.5 mr-6 rounded-lg border border-blue-300 text-blue-300 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-500 hover:text-white transition duration-300 text-sm font-medium shadow-sm hover:shadow-md" onClick={()=> setCreateAccountbutton (true)}>
            Create Account
          </button>}
          </Link>

          <Link to="/Login" >
          {/* Login (Filled style with matching gradient) */}
          {!login &&
          <button className="px-5 py-2.5 mr-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 text-white transition duration-300 text-sm font-medium shadow-sm hover:shadow-md" onClick={()=> {setLoginbutton(true); setCreateAccountbutton(ture)}}>
            Login
          </button>}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div
            ref={dropdownRef}
            className="flex items-center gap-3 cursor-pointer relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex flex-col items-end">
              <span className="font-ubuntu font-medium text-white text-sm">
                {profileData.name}
              </span>
              <span className="font-ubuntu text-gray-300 text-xs">{profileData.role}</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="bg-slate-600 p-1 rounded-full">
                <CgProfile className="text-white text-xl" />
              </div>
              {isOpen ? (
                <CgChevronUp className="text-white text-lg" />
              ) : (
                <CgChevronDown className="text-white text-lg" />
              )}
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 top-10 bg-white rounded-md shadow-lg py-2 w-48 z-50 border border-gray-200">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                  onClick={() => {
                    // Handle settings click
                    setIsOpen(false);
                  }}
                >
                  <FiSettings className="text-gray-500" />
                  Settings
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                  onClick={() => {
                    // Handle logout click
                    setIsOpen(false);
                    localStorage.removeItem("token");
                    setProfileData({name: "Login First", role: ""})
                    setLogin(false);
                  }}
                >
                  <FiLogOut className="text-gray-500" />
                  Logout
                </button>
              </div>
            )}
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
