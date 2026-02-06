import React,{useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import { loadSpecificEmployeeTasksAPI } from '../../api/database';

const EmployeeTasksStatsTable = () => {
  const [employeeTasksData,setEmployeeTasksData] = useState(null);
  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const user = session?.user;
  const userRole = session?.role;
  // "response": {
  //       "completedTasks": [
  //           {
  //               "_id": "696f9fbcbb042273d7a5a05d",
  //               "taskTitle": "ggg",
  //               "taskDesc": "play a level devil game",
  //               "adminID": "6965044fce7f04bd1f74ea63",
  //               "assignments": [
  //                   {
  //                       "employeeID": "6969c3f7096f4907ec708600",
  //                       "status": "completed",
  //                       "_id": "696f9fbcbb042273d7a5a05e"
  //                   },
  //                   {
  //                       "employeeID": "696b77617e9bd2a2dee6a097",
  //                       "status": "pending",
  //                       "_id": "696f9fbcbb042273d7a5a05f"
  //                   }
  //               ],
  //               "createdAt": "2026-01-20T15:31:08.312Z",
  //               "updatedAt": "2026-01-20T15:31:08.312Z",
  //               "__v": 0,
  //               "employeeAssignment": {
  //                   "employeeID": "6969c3f7096f4907ec708600",
  //                   "status": "completed",
  //                   "_id": "696f9fbcbb042273d7a5a05e"
  //               }
  //           }
  //       ],
  //       "pendingTasks": [
  //           {
  //               "_id": "696f9edabb042273d7a5a04d",
  //               "taskTitle": "level-devil",
  //               "taskDesc": "play a level devil game",
  //               "adminID": "6965044fce7f04bd1f74ea63",
  //               "assignments": [
  //                   {
  //                       "employeeID": "6969c3f7096f4907ec708600",
  //                       "status": "pending",
  //                       "_id": "696f9edabb042273d7a5a04e"
  //                   }
  //               ],
  //               "createdAt": "2026-01-20T15:27:22.705Z",
  //               "updatedAt": "2026-01-20T15:27:22.705Z",
  //               "__v": 0,
  //               "employeeAssignment": {
  //                   "employeeID": "6969c3f7096f4907ec708600",
  //                   "status": "pending",
  //                   "_id": "696f9edabb042273d7a5a04e"
  //               }
  //           },


  const getSpecificEmployeeTasks = async() => {
    console.log("called")
    const res = await loadSpecificEmployeeTasksAPI({empID:user?._id});
    if(res.success){
      setEmployeeTasksData(res.personalTasksDetails);
      toast.success(res.message);
      console.log("personalizedTasks ",res.personalTasksDetails);
    }
    else{
      toast.error(res.message);
    }
  }

  useEffect(() => {
    
    const fetchEmployee = async() => {
      await getSpecificEmployeeTasks();
    }
    
    fetchEmployee();

    
  },[user?._id]);

  const formatDate = (datestr) => {
    const date = new Date(datestr);
    const day = String(date.getDate()).padStart(2,"0");
    const month = String(date.getMonth()+1).padStart(2,"0");
    const year =date.getFullYear();
    return `${day} - ${month} - ${year}`;

  }


  return (
    <div className='w-full mt-8'>
      {employeeTasksData?.length===0 && (
        <p className='text-lg sm:text-xl font-bold text-center text-red-700'>No one has been Assigned To You, Meanwhile upgrade</p>
      )}
      <div className='border rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse'>
            <thead className='bg-gray-200'>
              <tr >
                <th className='px-4 py-2 text-left'>TaskTitle</th>
                <th className='px-4 py-2 text-left'>TaskDesc</th>
                <th className='px-4 py-2 text-left'>Given by</th>
                <th className='px-4 py-2 text-left'>Date</th>
                <th className='px-4 py-2 text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {employeeTasksData && employeeTasksData.map((emp) => (
                <tr key={emp._id} className='border-t'>
                  <td className='px-4 py-2 text-left'>{emp.taskTitle}</td>
                  <td className='px-4 py-2 text-left'>{emp.taskDesc}</td>
                  <td className='px-4 py-2 text-left'>{emp.adminDetails?.[0]?.adminName || "unknown"}</td>
                  <td className='px-4 py-2 text-left'>{formatDate(emp.createdAt)}</td>
                  <td className={`${emp.status==='pending'? 'text-yellow-600':'text-green-600'} px-4 py-2 text-left`}>{emp.status}</td>
                </tr>
              ))}
              
            </tbody>

          </table>

        </div>

      </div>
    </div>
  )
}

export default EmployeeTasksStatsTable
