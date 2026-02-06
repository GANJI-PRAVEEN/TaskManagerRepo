import React, { useState, useEffect } from "react";
import {
  getEmployeeByIDAPI,
  loadSpecificEmployeeTasksAPI,
  updateBulkStatusAPI,
} from "../../api/database";
import { toast } from "react-toastify";

const EmployeeFullTasksDetailsView = ({
  currentEmpID,
  setEmpFullTasksViewTrigger,
  setRefreshData
}) => {
  const [currentEmployeeData, setCurrentEmployeeData] = useState(null);
  const [status, setStatus] = useState("pending");
  const [employeeName, setEmployeeName] = useState("unknown");
  const [statusChangeTaskID, setStatusChangeTaskID] = useState([]);

  useEffect(() => {
    if (!currentEmpID) return;
    const fetch = async () => {
      const res = await loadSpecificEmployeeTasksAPI({ empID: currentEmpID });
      if (res.success) {
        
        setCurrentEmployeeData(res.personalTasksDetails);
        console.log("current employee - ", res.personalTasksDetails);
      } else {
        toast.error("something went wrong pls refresh");
      }

      const empNameRes = await getEmployeeByIDAPI({ empID: currentEmpID });
      if (empNameRes.success) {
        console.log("emp res", empNameRes);
        setEmployeeName(empNameRes.employee?.[0]?.employeeName);
      } else {
        console.log("name error ", empNameRes);
      }
    };
    fetch();
  }, [currentEmpID]);

  const getDelaysFromAssignedDate = (assignedDatestr) => {
    const assignedDate = new Date(assignedDatestr);
    const today = new Date();

    assignedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today - assignedDate;
    const delayDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return delayDays >= 0 ? delayDays : 0;
  };

  const handleStatusChange = (e,emp) => {
    const selectedStatus = e.target.value;
    const taskId = emp._id;
    setStatusChangeTaskID((prev) => {
       // User changed mind ->  remove from list
      const exists = prev.some((item) => item.taskId === taskId);
      if(selectedStatus==="updateStatus"){
        return prev.filter((id) => id!==taskId);
      }
       // Status changed -> add if not already present
      if(exists){
        return prev.map((item => 
          item.taskId === taskId ? {...item,selectedStatus} : item
        ))
      }
      //Already exist  -> no change
      return [...prev,{taskId,selectedStatus}];
    })
  }

  const handleStatusUpdates = async() => {
    const res = await updateBulkStatusAPI({empID:currentEmpID,updates:statusChangeTaskID});
    if(res.success){
      setRefreshData(true)
      toast.success(res.message);
      setEmpFullTasksViewTrigger(false);
    }
    else{
      toast.error(res.message);
      console.log("updates - ",res.message)
    }
  }


  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3">
      <div className="relative w-full max-w-[500px] max-h-[90vh] bg-white overflow-y-auto rounded-lg p-4">
        <div className="flex flex-col gap-5">
          <span
            className="absolute right-9 material-symbols-outlined text-red-600 cursor-pointer"
            onClick={() => setEmpFullTasksViewTrigger(false)}
          >
            close
          </span>

          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm sm:text-lg font-bold">👤{employeeName}</p>
              <p className="text-gray-600 text-[12px]">
                TotalTasks : <span>{currentEmployeeData?.length}</span>
              </p>
            </div>
          </div>

          {/* Header */}
          {currentEmployeeData &&
            currentEmployeeData.map((emp) => (
              <div className="w-full sm:text-sm text-[12px]" key={emp._id}>
                <div className="border rounded-lg p-2 w-full">
                  <p className="text-lg fonot-bold ">{emp?.taskTitle}</p>
                  <p className="text-[12px] text-gray-600">
                    AssignedOn{" "}
                    <span className="text-red-600">
                      {getDelaysFromAssignedDate(emp?.createdAt)} days ago
                    </span>
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px]">
                      Status:{" "}
                      <span
                        className={`${emp?.status === "completed" ? "text-green-700" : "text-red-600"} font-bold text-[12px]`}
                      >
                        {emp?.status}
                      </span>
                    </p>
                    <select
                      name="status"
                      id="statusUpdate"
                      className=" border rounded-lg p-1 bg-white text-gray-700"
                      onChange={(e) => {
                        (setStatus(e.target.value),
                        handleStatusChange(e,emp)
                      )
                      }}
                    >
                      <option value="updateStatus">update status</option>
                      <option value="pending">pending</option>
                      <option value="completed">completed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            {statusChangeTaskID.length>0 && (
              <div className='flex items-center justify-center'>
                <button className='bg-green-600 rounded-md p-2 text-[12px] sm:text-sm text-white place-items-center w-[200px] hover:bg-green-500 hover:cursor-pointer' onClick={handleStatusUpdates}>Apply Changes</button>
              </div>
            )}
            
        </div>
      </div>
    </div>
  );
};

export default EmployeeFullTasksDetailsView;
