import {useEffect, useState} from "react";
import Card from "../Components/Card";

const Reports = ({ heading }) => {
  const [data, setEmployee] = useState([]);
  const [numberOfEmployee, setnumberOfEmployee] = useState(0);
  useEffect(() => {
    fetchNumberOfEmployee()
  }, [])
  
  const fetchNumberOfEmployee = async ()=>{

    fetch("https://localhost:7157/api/employee").then(response => response.json()).then(data => setEmployee(data.data));
    setnumberOfEmployee(data.numberOfEmployee);
    console.log(numberOfEmployee);
    

    // const response = await fetch("https://localhost:7157/api/employee");
    // const data = await response.json();
    // setEmployee(data);
    // if(response.ok){
    //  setnumberOfEmployee = employee.length()
    // // let count = 0;
    // // employee.map((employee)=>(
    // //  employee.id ? count= count+1: console.log("No data")
    // // ))
    // console.log(numberOfEmployee);
    
    // // setnumberOfEmployee = count;
    // }else{
    //   console.log("Failed to get the number of employee");
    // }
  }

  return (
    <>
      <div className="w-max h-max flex flex-col gap-10 ">
        <Card heading={heading} page={"Reports"} />
        <div className="home-container ">
          <div className="card top-30 w-[400px]">
            <h2 className="text-2xl font-semibold font-ubuntu">Number Of Employee</h2>
            <span className="font-ubuntu italic text-2xl text-slate-800">{numberOfEmployee}</span>
            {/* {cardFor(page)} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
