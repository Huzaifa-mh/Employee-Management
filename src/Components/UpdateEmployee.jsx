import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEmployee = ({ onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    contactNo: "",
    designation: "",
    dateOfJoining: "",
    role: "user" // Added role field with default value
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Added role change handler
  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7157/api/employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
         },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Employee Added successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          style: { backgroundColor: "#1E293B", color: "white" },
          progressStyle: { backgroundColor: "white" },
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        onUpdate();
        onClose();
      } else {
        console.error("Failed to update employee");
        toast.error("Error Adding employee.Unauthorized.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div
      className={`absolute top-0 right-0 w-1/4 h-screen transition-transform duration-500 z-0 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-700 absolute top-40 left-1/2 transform -translate-x-1/2">
        Add Employee
      </h2>
      <div className="bg-gradient-to-br from-slate-50 to-slate-400 h-full flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
          <label className="flex flex-col">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-slate-300 text-black text-lg"
              required
            />
          </label>
          <label className="flex flex-col">
            Father Name
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-slate-300 text-black text-lg"
              required
            />
          </label>
          <label className="flex flex-col">
            Contact No
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-slate-300 text-black text-lg"
              required
            />
          </label>
          <label className="flex flex-col">
            Designation
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-slate-300 text-black text-lg"
              required
            />
          </label>
          <label className="flex flex-col">
            Date Of Joining
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-slate-300 text-black text-lg"
              required
            />
          </label>

          {/* Role Selector - Updated to match your color scheme
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
            <div className="relative bg-slate-300 p-1 rounded-lg border border-slate-400">
              <div className="flex">
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 text-center font-medium z-10 rounded-md ${
                    formData.role === 'user' ? 'text-slate-800' : 'text-slate-600'
                  }`}
                  onClick={() => handleRoleChange('user')}
                >
                  User
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 text-center font-medium z-10 rounded-md ${
                    formData.role === 'admin' ? 'text-slate-800' : 'text-slate-600'
                  }`}
                  onClick={() => handleRoleChange('admin')}
                >
                  Admin
                </button>
              </div>
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-white rounded-md shadow-sm transition-all duration-300 ease-in-out ${
                  formData.role === 'user' ? 'left-1' : 'left-[calc(50%+0.125rem)]'
                }`}
              ></div>
            </div>
          </div> */}

          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="group inline-flex min-w-0 items-center gap-2 rounded bg-red-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-red-500/40 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="group inline-flex min-w-0 items-center gap-2 rounded bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-slate-500/40 active:scale-95"
            >
              Submit
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 w-0 transition-all group-hover:w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;