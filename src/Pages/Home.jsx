import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Card from "../Components/Card";
import EditEmployeeModal from "../Components/EditEmployeeModal";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import { MdPersonAddAlt1 } from "react-icons/md";
import UpdateEmployee from "../Components/UpdateEmployee";

const Home = ({ heading }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      // const response = await fetch("https://localhost:7157/api/employee");
      // const data = await response.json();
      // setEmployees(data);
      // if (response.ok) {
      //   setLoading(false);
      // }

      const response = await fetch("https://localhost:7157/api/employee",{
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        setEmployees(data);
        console.log(data);   
      }else{
        throw new Error("UnAuthorized User Or You have not Login yet")
      }
      
    } catch (error) {
      console.log("Error Fetching Employees:", error);
    } finally {
    }
  };
  //Handle Add
  const handleAdd = () => {
    setIsAddOpen(true);
  };
  const handleCloseAdd = () => {
    setIsAddOpen(false);
  };

  // Handle Edit
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };
  const handleUpdate = async () => {
    await fetchEmployee(); // Refresh list after update
    setIsEditOpen(false);
    setIsAddOpen(false);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7157/api/employee/${id}`,
        {
          method: "DELETE",
          headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (!response.ok) {
        const errorData = response.json();
        toast.error(errorData.message || "Unauthorized", {
          position: "bottom-right",
          autoClose: 3000,
          style: { backgroundColor: "#1E293B", color: "white" }, // bg-slate-800
          progressStyle: { backgroundColor: "white" },
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        throw new Error("Delete request failed");
      } else {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== id)
        );
        toast.success("Employee deleted successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          style: { backgroundColor: "#1E293B", color: "white" }, // bg-slate-800
          progressStyle: { backgroundColor: "white" },
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };

  return (
    <>
      <Card heading={heading} page={"Home"} />
    <div className="mt-20">
      <ToastContainer />
      <div className=" ml-20 max-h-[400px] w-[90%]">
        {loading ? (
          <div className="flex justify-center gap-10">
            <p className="text-center text-gray-500 mt-60">Loading...</p>
            <div className="flex items-start justify-center min-h-screen mt-60">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-slate-600"></div>
            </div>
            {/* <div className="flex items-start justify-center min-h-screen">
              <div className="w-8 h-8 bg-blue-500 rounded-full animate-ping">Loading...</div>
            </div> */}
          </div>
        ) : (
          <div className="mt-60 overflow-auto max-h-[500px] border border-gray-300 rounded-lg relative">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-slate-800 text-white sticky top-0 z-0">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Father Name</th>
                  <th className="py-3 px-4 text-left">Contact No</th>
                  <th className="py-3 px-4 text-left">Designation</th>
                  <th className="py-3 px-4 text-left">Date of Joining</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-200">
                    <td className="py-5 px-4">{employee.id}</td>
                    <td className="py-5 px-4">{employee.name}</td>
                    <td className="py-5 px-4">{employee.fatherName}</td>
                    <td className="py-5 px-4">{employee.contactNo}</td>
                    <td className="py-5 px-4">{employee.designation}</td>
                    <td className="py-5 px-4">
                      {new Date(employee.dateOfJoining).toLocaleDateString()}
                    </td>
                    <td className="py-5 px-4 flex space-x-2 gap-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        onClick={() => handleEdit(employee)}
                      >
                        <FaEdit className="text-xl" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleAdd}
              class="group flex fixed bottom-20 right-30 z-0 min-w-0 gap-2 rounded bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-slate-500/40 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
            >
              <MdPersonAddAlt1 className="size-5 align-middle" />
              Add Employee
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
        )}
       
      </div>
      {isEditOpen && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={handleCloseEdit}
          onUpdate={handleUpdate}
        />
      )}

      {isAddOpen && (
        <UpdateEmployee onClose={handleCloseAdd} onUpdate={handleUpdate} />
      )}
      </div>
    </>
  );
};

export default Home;
