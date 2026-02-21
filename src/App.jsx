import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Reports from "./Pages/Reports";
import Settings from "./Pages/Settings";
import CreateAccount from "./Components/CreateAccount";
import Login from "./Components/Login";
import { UserContext } from "./Context";

function App() {
  const [heading, setHeading] = useState("");
  // // Add profile state that can be shared across components
  // const [profileData, setProfileData] = useState({
  //   name: "Login",
  //   role: "...",
  //   // Add other profile fields as needed
  // });

  const {profileData, setProfileData, createUser, setCreateUser} = useContext(UserContext);

  return (
    <Router>
      <div className="flex">
        <Navbar profileData={profileData} />
        <div className="flex-1 ml-20"> {/* Main content area */}
          {/* Profile header will now appear on all pages */}
          <div className="bg-slate-700 w-full h-16 fixed top-0 right-0 ml-20 z-40">
            <Profile profileData={profileData} setProfileData={setProfileData} />
          </div>
          
          {/* Content area with padding to account for fixed header */}
          <div className="pt-16 p-5 w-full">
            <Routes>
              <Route 
                path="/" 
                element={<Home heading="DashBoard" profileData={profileData} />} 
              />
              <Route 
                path="/profile" 
                element={
                  <Profile 
                    heading="User Info" 
                    profileData={profileData} 
                    setProfileData={setProfileData} 
                  />
                } 
              />
              <Route 
                path="/reports" 
                element={<Reports heading="Reports OverView" />} 
              />
              <Route 
                path="/settings" 
                element={<Settings heading="Settings Panel" />} 
              />
              <Route path="/CreateAccount" element={<CreateAccount />}/>
              <Route path="/Login" element={<Login />}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;