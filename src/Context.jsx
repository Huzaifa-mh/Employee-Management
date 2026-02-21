import React, { createContext, useState } from "react";

// Create context
export const UserContext = createContext();

// Create provider
export const UserProvider = ({ children }) => {
  // Add profile state that can be shared across components
    const [profileData, setProfileData] = useState({
      name: "Login First",
      role: "",
      // Add other profile fields as needed
    });
    const [createUser, setCreateUser] = useState(null)
    const [login, setLogin] = useState(false)

  return (
    <UserContext.Provider value={{ profileData, setProfileData, createUser, setCreateUser, login, setLogin }}>
      {children}
    </UserContext.Provider>
  );
};