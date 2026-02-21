import { useState, useEffect } from "react";
// import Toast from "./Toast";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS

const EditEmployeeModal = ({ employee, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...employee });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7157/api/employee/${formData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" ,
          "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Show success toast
        toast.success("Employee updated successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          style: { backgroundColor: "#1E293B", color: "white" }, // bg-slate-800
          progressStyle: { backgroundColor: "white" },
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        onUpdate(); // Refresh employee list
        onClose(); // Close the panel
        // <Toast />
      } else {
        const errordata =  response.json();
        console.error("Failed to update employee");
        toast.error(errordata.message || "Error updating employee.Unauthorized.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div
      className={`absolute top-0 right-0 w-1/4 h-screen transition-transform duration-500 z-10 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-700 absolute top-40 left-1/2 transform -translate-x-1/2">
        Edit Employee
      </h2>
      <div className="bg-gradient-to-br from-slate-50 to-slate-400 h-full flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            ID
            <input
              type="text"
              name="id"
              value={formData.id}
              disabled
              className="w-full rounded-xl p-2 bg-slate-300 text-black text-lg"
            />
          </label>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-slate-300 text-black text-lg"
            />
          </label>
          <label>
            Father Name
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-slate-300 text-black text-lg"
            />
          </label>
          <label>
            Contact Number
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-slate-300 text-black text-lg"
            />
          </label>
          <label>
            Designation
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-slate-300 text-black text-lg"
            />
          </label>
          <label>
            Date of Joining
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-slate-300 text-black text-lg"
            />
          </label>
          <div className="flex justify-center gap-10">
            <button
              type="button"
              onClick={onClose}
              className="group inline-flex min-w-0 items-center gap-2 rounded bg-red-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-red-500/40 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Cancel
            </button>
            {/* <button
              type="submit"
              className="bg-slate-800 text-white px-4 py-2 rounded-2xl hover:bg-slate-500"
            >
              Update
            </button> */}

            <button
              type="submit"
              class="group inline-flex min-w-0 items-center gap-2 rounded bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-slate-500/40 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Update
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4 w-0 transition-all group-hover:w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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

export default EditEmployeeModal;
