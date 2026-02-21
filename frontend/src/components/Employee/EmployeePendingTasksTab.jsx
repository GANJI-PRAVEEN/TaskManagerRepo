import React, { useEffect, useState } from "react";
import { loadSpecificEmployeeTasksAPI } from "../../api/database";

const EmployeePendingTasksTab = () => {
  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const user = session?.user;
  const userRole = session?.role;
  const [employeeTasksData, setEmployeeTasksData] = useState(null);
  const [viewTask,setViewTask] = useState(false);
  const [currentTask,setCurrentTask] = useState(null);
  useEffect(() => {
    const fetchEmployeeTasks = async () => {
      const res = await loadSpecificEmployeeTasksAPI({ empID: user?._id });
      if (res.success) {
        let data = res.personalTasksDetails;
        data=data.filter(emp => emp.status!=="completed");
        setEmployeeTasksData(data);
        console.log("personalTasksDetails", res.personalTasksDetails);
      } else
        console.log("something went wrong while fetching personalTasksDetails");
    };
    fetchEmployeeTasks();
  }, [user?._id]);
  const formatDate = (datestr) => {
    const date = new Date(datestr);
    const day = String(date.getDate()).padStart(2,"0");
    const month = String(date.getMonth()+1).padStart(2,"0");
    const year =date.getFullYear();
    return `${day}-${month}-${year}`;

  }

  const getDelaysFromAssignedDate = (assignedDatestr) => {
    const assignedDate = new Date(assignedDatestr);
    const today = new Date();

    assignedDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    const diffTime = today - assignedDate;
    const delayDays = Math.floor(diffTime/(1000*60*60*24));
    return delayDays>=0? delayDays:0;
  }




  return (
    <div className="relative grid grid-cols-1 gap-10 z-50
      place-items-center
      sm:place-items-stretch
      sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
      ">
        {employeeTasksData?.length===0 && (
          <p className='text-xl sm:text-2xl font-bold text-center text-green-600'>All are killed, No Pending Tasks Available </p>
        )}
      {employeeTasksData &&
        employeeTasksData.map((emp) => (
          <div key={emp._id} className="relative sm:w-[350px] sm:h-[250px] w-[280px] h-[200px] shadow-md shadow-black/60 rounded-md bg-[#f8961e]/30 p-3">
            <div className="flex flex-col items-start flex-1 gap-2">
              <div className="flex w-full  items-center justify-between">
                <p className="rounded-md px-3 py-1 bg-[#023047] text-white text-sm">
                  {formatDate(emp.createdAt)}
                </p>
              </div>
              <p className="sm:font-2xl font-lg font-bold line-clamp-1">{emp.taskTitle}</p>
              <p className="sm:font-sm font-sm line-clamp-3">
                {emp.taskDesc}
              </p>
              <p>
                AssignedBy : <span className="font-bold text-yellow-600">{emp.adminDetails?.[0]?.adminName}</span>
              </p>
              <p className='absolute bottom-2 left-2 text-gray-600 font-bold '>{getDelaysFromAssignedDate(emp.createdAt)} days ago</p>
              <button className="absolute bottom-3 right-2 bg-green-500 rounded-lg py-1 px-4 font-bold hover:bg-green-400 hover:cursor-pointer" onClick={() => {
                setViewTask(true);
                setCurrentTask(emp);
              }}>
                View
              </button>
            </div>
          </div>
        ))}
        {viewTask && 
        <div className=' fixed inset-0 bg-black/50 flex justify-center'>
          <div className={`absolute top-20 w-[350px] h-[450px] sm:w-[500px] border bg-white rounded-lg`}>
            <span className="absolute right-3 top-4 hover:cursor-pointer top-1 material-symbols-outlined" onClick={() => setViewTask(false)}>close</span>
            <div className='flex flex-col gap-5 p-4'>
              <p className='underline text-xl text-center sm:text-3xl'>Task Details</p>
              <p className='text-xl sm:text-2xl font-style '>{currentTask.taskTitle}</p>
              <p className='bg-[#a2d2ff]/30  h-[150px] overflow-y-auto p-2 rounded-md'>{currentTask.taskDesc}</p>
              <p>Status : <span className={`${currentTask.status==="pending"? 'text-yellow-800 bg-yellow-600/30':'text-green-600 bg-green-600/40'} rounded-md py-1 px-2`}>{currentTask.status}</span></p>
            </div>
            <div className='absolute bottom-4 right-4 flex items-center gap-2 bg-[#00b4d8] rounded-lg p-2 text-white'>
              <p>{formatDate(currentTask.createdAt)}</p>
            <span className=" material-symbols-outlined">calendar_clock</span>

            </div>
          </div>
        
        </div>
        }
        </div>
  );
}

export default EmployeePendingTasksTab;
