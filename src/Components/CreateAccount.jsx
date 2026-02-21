import React, { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { UserContext } from "../Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom"; // Import Link instead of useNavigate

const CreateAccount = ({ heading }) => {
  const { profileData, setProfileData } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    passwordHash: "",
    role: "User",
  });

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setData({ ...data, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://localhost:7157/api/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        //i think this should be done in login section.
        // setProfileData({
        //   username: data.username,
        //   role: data.role,
        //   ...responseData
        // });

        toast.success(responseData.message || "Account Created Successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark",
          style: { backgroundColor: "#1E293B", color: "white" },
          progressStyle: { backgroundColor: "white" },
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setRegisterSuccess(true);

        // No navigation here - we'll let the user click the link
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed", {
          position: "bottom-right",
          theme: "dark",
        });
      }
    } catch (exception) {
      console.error("Failed to register User", exception);
      toast.error("An error occurred during registration", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  if (registerSuccess) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
          <p className="mb-6 text-blue-500">Your account has been created successfully.</p>
          <Link
            to="/"
            // className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
          >
            {/* Back to Home */}

            {/* <button class="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-slate-600 py-1 pl-6 pr-14 font-medium text-neutral-50"><span class="z-10 pr-2">Back to Home</span><div class="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]"><div class="mr-3.5 flex items-center justify-center"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-50"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></div></button> */}
            <button class="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-slate-800 py-1 pl-14 pr-6 font-medium text-neutral-50">
              <span class="z-10 pr-2">Back to Home</span>
              <div class="absolute left-1 inline-flex h-12 w-12 items-center justify-start rounded-full bg-slate-500 transition-[width] group-hover:w-[calc(100%-8px)]">
                <div class="ml-3.5 flex items-center justify-center">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-neutral-50"
                  >
                    <path
                      d="M6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.70711 8H12.5C12.7761 8 13 7.77614 13 7.5C13 7.22386 12.7761 7 12.5 7H3.70711L6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </button>
          </Link>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 w-[90%] max-w-md p-8 rounded-2xl shadow-lg "
      >
        <h2 className="text-2xl font-bold text-center mb-6 bg-slate-500 text-white py-2 rounded-md">
          Create Account
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-800 font-medium mb-1"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={data.username}
            onChange={handleChange}
            className="w-full rounded-lg p-2 bg-slate-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-gray-800 font-medium mb-1"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="passwordHash"
            id="password"
            value={data.passwordHash}
            onChange={handleChange}
            className="w-full rounded-lg p-2 bg-slate-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black pr-10"
            required
          />
          <div
            className="absolute top-10 right-3 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {/* Role Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type
          </label>
          <div className="relative bg-slate-300 p-1 rounded-lg border border-slate-400">
            <div className="flex relative z-10">
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-center font-medium rounded-md transition-all duration-200 ${
                  data.role === "User"
                    ? "text-slate-800 font-bold"
                    : "text-slate-600"
                }`}
                onClick={() => handleRoleChange("User")}
              >
                User
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-center font-medium rounded-md transition-all duration-200 ${
                  data.role === "Admin"
                    ? "text-slate-800 font-bold"
                    : "text-slate-600"
                }`}
                onClick={() => handleRoleChange("Admin")}
              >
                Admin
              </button>
            </div>
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-white rounded-md shadow-sm transition-all duration-300 ease-in-out ${
                data.role === "User" ? "left-1" : "left-[calc(50%+0.125rem)]"
              }`}
            ></div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Sign Up
        </button>

        <ToastContainer />

        {/* Add a link to go back to home */}
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
