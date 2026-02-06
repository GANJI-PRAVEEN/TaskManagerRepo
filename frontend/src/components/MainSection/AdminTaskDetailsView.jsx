import React, { useEffect, useState } from "react";
import CreateTaskPopup from "./CreateTaskPopup";
import { deleteTaskAPI, loadAdminTasksStatsForTasksTabAPI, loadAdminTasksStatsTableForHomePageAPI } from "../../api/database";
import { toast } from "react-toastify";

const AdminTaskDetailsView = ({
  setRefreshData,
  setAdminTasksInfo,
  adminTasksInfo,
  editMode,
  setEditMode,
  openMenu,
  setOpenMenu,
  setCreateNewTaskBtn,
  openMenuTaskId,
  setOpenMenuTaskId,
}) => {
  const [currentTaskDetail,setCurrentTaskDetail]= useState({});
  const handleEditTaskBtn = (taskDetail) => {
    setCreateNewTaskBtn(true);
    setEditMode(true);
    console.log("taskDetail ",taskDetail);
    setCurrentTaskDetail(taskDetail);
  }


  const loadAdminTasksInfoTasksTab = async () => {
    try {
          const data = await loadAdminTasksStatsForTasksTabAPI();
          if (data.success) {
            setAdminTasksInfo(data.adminTasksInfo);
            toast.success("retrived admin Tasks details");
          }
        } catch (error) {
          console.log("error at admintasks info -", error.message);
        }
  }


  const handleDeleteTaskBtn = async(taskID) => {
    try {
      const res = await deleteTaskAPI({taskID});
      if(res.success){
        toast.success(res.message);
        setOpenMenu(false);
        loadAdminTasksInfoTasksTab();
      }
      else {
      toast.error(res.message);
      console.log("failed to delete",res)
      }
      
    } catch (error) {
      console.log("Failed to update",error.message);
    }
  }


  return (
    
    <div className="w-full">
      {adminTasksInfo?.length===0 && (
          <p className='text-lg sm:text-xl font-bold text-center text-red-700'>Create Task and Upgrade Your Employees</p>
      )}
      <div className="border bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-5 py-2 text-left">TaskTitle</th>
                <th className="px-5 py-2 text-left">TaskDesc</th>
                <th className="px-5 py-2 text-left">AssignedTo</th>
                <th className="px-5 py-2 text-left">Completed</th>
                <th className="px-5 py-2 text-left">Pending</th>
                <th className="px-5 py-2 text-left">Changes</th>
              </tr>
            </thead>

            <tbody>
              {adminTasksInfo &&
                adminTasksInfo.map((taskDetail) => (
                  <tr key={taskDetail._id} className="border-t">
                    <td className="px-5 py-2 text-left">
                      {taskDetail.taskTitle}
                    </td>
                    <td className="px-5 py-2 text-left">
                      {taskDetail.taskDesc}
                    </td>
                    <td className="px-5 py-2 text-left">
                      {taskDetail.totalAssignedTo}
                    </td>

                    <td
                      className={`${
                        taskDetail.completedEmployees?.length === 0
                          ? "text-center"
                          : "px-5 py-2 text-left"
                      }`}
                    >
                      {taskDetail.completedEmployees?.length > 0 ? (
                        taskDetail.completedEmployees.map((emp, idx) => (
                          <div key={idx} className="text-green-600">
                            {emp.employeeName}
                          </div>
                        ))
                      ) : (
                        <span className="text-center font-bold">-</span>
                      )}
                    </td>

                    <td
                      className={`${
                        taskDetail.pendingEmployees?.length === 0
                          ? "text-center"
                          : "px-5 py-2 text-left"
                      }`}
                    >
                      {taskDetail.pendingEmployees?.length > 0 ? (
                        taskDetail.pendingEmployees.map((emp, idx) => (
                          <div key={idx} className="text-red-600">
                            {emp.employeeName}
                          </div>
                        ))
                      ) : (
                        <span className="text-center">-</span>
                      )}
                    </td>

                    <td className="text-center hover:cursor-pointer relative">
                      <span
                        onClick={() =>{
                          setOpenMenu(true);
                          setOpenMenuTaskId(
                            openMenuTaskId === taskDetail._id
                              ? null
                              : taskDetail._id
                          )
                        }}
                        className="material-symbols-outlined"
                      >
                        tv_options_edit_channels
                      </span>

                      <div
                        className={`absolute right-12 top-0 mt-2 ${
                          openMenuTaskId === taskDetail._id
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <div className={`${openMenu ? 'block':'hidden'} w-[120px] bg-white shadow-lg border rounded-md p-2`}>
                          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100" onClick={() => setEditMode(true)} >
                            Edit
                          </button>
                          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-600" onClick={()=>{handleDeleteTaskBtn(taskDetail._id)}}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTaskDetailsView;
