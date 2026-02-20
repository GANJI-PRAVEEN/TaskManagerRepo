import React, { useState,useEffect } from "react";
import AdminTasksStatsTable from "./AdminTasksStatsTable";
import EmployeeTasksStatsTable from "../Employee/EmployeeTasksStatsTable";
import { loadEmployeesDataAPI, loadSpecificEmployeeTasksAPI } from "../../api/database";

const HomePage = ({adminTasksStats,setRefreshData }) => {
  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const user = session.user;
  const userRole = session.role;
  let statusBoxes=[];

  const [employeeData,setEmployeeData] = useState([]);
  const [personalizedEmployeeData,setPersonalizedEmployeeData] = useState([]);

  useEffect(() => {
    const fetchAdminEmployeeStats = async() => {
      const res = await loadEmployeesDataAPI();
      if(res.success){
        setEmployeeData(res.employees);
        console.log("employeedata - ",res.employees);
      }
    }
    const fetchEmployeeStats = async() => {
      const res = await loadSpecificEmployeeTasksAPI({empID:user?._id});
      if(res.success){
        setPersonalizedEmployeeData(res.personalTasksDetails);
      }
      else {
        setPersonalizedEmployeeData([]);
      }
    }
    if(userRole==="admin")fetchAdminEmployeeStats();
    else fetchEmployeeStats();

  },[user?._id]);
  

  let employeeTotals,adminTotals;
  if(userRole==="admin"){
      adminTotals = employeeData.reduce(
      (acc,admin) => {
        acc.totalAdminCompleted+= admin.completedCount || 0;
        acc.totalAdminPending += 
        (admin.assignedCount || 0) - (admin.completedCount || 0);
      return acc;

      },
      {totalAdminCompleted:0,totalAdminPending:0}
    );
  }

  else{
    employeeTotals = personalizedEmployeeData.reduce(
      (acc,emp) => {
        acc.totalEmployeeCompleted+=emp.status==="completed"? 1:0,
        acc.totalEmployeePending+=emp.status==="pending"? 1:0
            return acc;
      },
      {totalEmployeeCompleted:0,totalEmployeePending:0}
    );
  }
  
  if(userRole==="employee"){
    console.log("employeeTotals ",employeeTotals)
    statusBoxes = [
      ["Completed", employeeTotals.totalEmployeeCompleted],
      ["Pending", employeeTotals.totalEmployeePending],
      ["Progress", 0],
    ];
  }
  else{
    statusBoxes = [
      ["Tasks Assigned", adminTotals.totalAdminPending],
      ["Completed", adminTotals.totalAdminCompleted],
      ["Pending",0 ],
    ];
  }
  return (
    <div>
      <div className="p-4 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statusBoxes.map(([title, value], index) => (
            <div
              className="border border-black w-[120px] text-center sm:w-[200px]  sm:text-lg"
              key={index}
            >
              <p className="p-1 font-bold text-green-600">{title}</p>
              <hr />
              <p className="p-1 font-bold text-lg">{value}</p>
            </div>
          ))}
        </div>
      </div>
      {userRole==="admin" && 

        <AdminTasksStatsTable adminTasksStats={adminTasksStats}/>
      }
      {userRole==="employee"  && 
        <EmployeeTasksStatsTable/>
      }
    </div>
  );
};

export default HomePage;
