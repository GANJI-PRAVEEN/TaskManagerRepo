import React,{useEffect, useState} from "react";
import assets from "../../assets/assets.js";
import CreateEmployeeForm from "./CreateEmployeeForm.jsx";
import { toast } from "react-toastify";
import { deleteEmployeeAPI, loadEmployeesDataAPI, loadSpecificEmployeeTasksAPI } from "../../api/database.js";
import EmployeeFullTasksDetailsView from "./EmployeeFullTasksDetailsView.jsx";

const AdminEmployeesTab = ({ employeesData,setemployeesData,setRefreshData }) => {
  const [createEmployeeBtn,setCreateEmployeeBtn] = useState(false);
  const [empFullTasksViewTrigger,setEmpFullTasksViewTrigger] = useState(false);
  const [currentEmpID,setCurrentEmpID] = useState(null);

  const handleDeleteEmployee = async(empID) => {
    const res = await deleteEmployeeAPI({empID});
    if(res.success){
      toast.success("deleted successfully");
      const res2 = await loadEmployeesDataAPI();
      if(res2.success)setemployeesData(res2.employees);
    }
    else{
      toast.success(res.message);
    }

  }
  return (
    <div className='relative min-h-screen'>
      <div className='flex flex-1 justify-end mb-10 mr-7'>
        <button className='px-4 py-1 sm:text-lg text-sm  rounded-md shadow-md bg-[#03045e] text-white' onClick={() => setCreateEmployeeBtn(true)}>Create</button>
      </div>
      <div
        className={`grid
        max-w-[1000px]
        mx-auto
        gap-10
        grid-cols-1
        sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
      `}
      >
        {employeesData?.length===0 && (
          <p className='text-xl sm:text-2xl font-bold text-center'>You are not having any employee, yet please do create employee </p>
        )}
        {employeesData.map((employee) => (
          <div
            className="group relative w-[250px] h-[200px] text-sm sm:w-[300px] sm:h-[250px] border rounded-lg shadow shadow-md shadow-gray-800"
            key={employee._id} 
          >
            <div className="flex items-center">
              <img
                src={assets.profile}
                alt=""
                className="sm:w-[100px] sm:h-[100px] w-[70px] h-[70px] rounded-full"
              />
              <div className="flex flex-col items-center overflow-hidden hover:cursor-pointer w-full p-1" onClick={() => {
                setCurrentEmpID(employee._id); 
                setEmpFullTasksViewTrigger(true);

              }}>
                <p className="text-[13px] sm:text-lg break-words text-center">{employee.employeeName}</p>
                <p className="text-[12px] sm:text-sm break-all text-center">{employee.employeeMail}</p>
              </div>
              <img src={assets.deleteIcon} alt="" className='absolute right-4 top-3 w-[20px] h-[20px] opacity-0 group-hover:opacity-100 hover:cursor-pointer' onClick={() => handleDeleteEmployee(employee._id)}/>
            </div>

            <div className="border" />

            <div>
              <p className="text-sm sm:text-lg font-bold text-center">Performance Board</p>
              <div className="flex justify-between flex-col items-start p-4 sm:text-sm text-[12px]">
                <p className="text-orange-400 ">
                  Assigned :{" "}
                  <span className="font-bold sm:text-lg text-black">
                    {employee.assignedCount}
                  </span>
                </p>
                <p className="text-green-600">
                  Completed :{" "}
                  <span className="font-bold sm:text-lg text-black">
                    {employee.completedCount}
                  </span>
                </p>
                <p className="text-red-600">
                  Pending :{" "}
                  <span className="font-bold sm:text-lg text-black">
                    {employee.assignedCount - employee.completedCount}
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {createEmployeeBtn && 
        <CreateEmployeeForm
          setemployeesData={setemployeesData}
          setCreateEmployeeBtn={setCreateEmployeeBtn}
          createEmployeeBtn={createEmployeeBtn}
        />
      }
      {empFullTasksViewTrigger && 
        <EmployeeFullTasksDetailsView
        currentEmpID={currentEmpID}
        setEmpFullTasksViewTrigger={setEmpFullTasksViewTrigger}
        setRefreshData={setRefreshData}
    
        />
      }
    </div>
  );
};

export default AdminEmployeesTab;
