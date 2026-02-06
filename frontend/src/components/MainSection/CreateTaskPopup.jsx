import React, { useEffect, useState } from "react";
import { CreateNewTaskAPI,deleteTaskAPI,loadAdminTasksStatsForTasksTabAPI,loadAdminTasksStatsTableForHomePageAPI,loadEmployeesDataAPI,updateTaskAPI } from "../../api/database";
import { toast } from "react-toastify";

const CreateTaskPopup = ({
  setRefreshData,
  editMode,
  setemployeesData,
  setEditMode,
  setOpenMenu,
  openMenuTaskId,
  setOpenMenuTaskId,
  employeesData,
  setCreateNewTaskBtn,
  createNewTaskBtn,
  adminTasksInfo,
  setAdminTasksInfo
}) => {
  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const userRole = session?.role;
  const user = session?.user;
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [openDropDown, setOpenDropDown] = useState(false);
  const [employeeWithStatus, setEmployeeWithStatus] = useState([]);
  const [tasksData,setTasksData] = useState(null);
  
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
  const taskDetail = adminTasksInfo.find((task) => openMenuTaskId === task._id);


  useEffect(() => {
    if (editMode && taskDetail) {
      setTaskTitle(taskDetail.taskTitle);
      setTaskDesc(taskDetail.taskDesc);
      setEmployeeWithStatus([
        ...taskDetail.completedEmployees.map((emp) => ({
          emp:emp,
          status: "completed",
        })),
        ...taskDetail.pendingEmployees.map((emp) => ({
          emp:emp,
          status: "pending",
        })),
      ]);
      const allEmployees = [
        ...taskDetail.completedEmployees.map((emp) => emp._id),
        ...taskDetail.pendingEmployees.map((emp) => emp._id),
      ];
      setSelectedEmployees(allEmployees);
      console.log("taskDtail ", taskDetail);
      console.log("adminTasksInfo - ", adminTasksInfo);

      setOpenMenu(false);
    }
  }, [editMode, taskDetail]);

  const handleUpdateTask = async () => {
    try {
     // update(openMenuTaskId,taskTitle,taskDesc,employeeWithStatus);
     const res = await updateTaskAPI(
      {openMenuTaskId,taskTitle,taskDesc,employeeWithStatus});
     if(res.success){
      toast.success(res.message);
      loadAdminTasksInfoTasksTab();
      const resp = await loadEmployeesDataAPI();
      if(resp.success)setemployeesData(resp.employees);
      setEditMode(false);
     }
     else {
      toast.error(res.message);
      console.log("failed to update",res)
     }
    } catch (error) {
      console.log("Failed to update",error.message);
    }
  };


  const handleCreateNewTask = async () => {
    try {
      let newErrors = {};
      if (!taskTitle.trim()) newErrors.taskTitle = "Task title is required";
      if (!taskDesc.trim()) newErrors.taskDesc = "TaskDesc is required";
      if (selectedEmployees.length == 0)
        newErrors.setEmployees = "Select at least one employee";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setErrors({});
      const data = await CreateNewTaskAPI({
        taskTitle: taskTitle,
        taskDesc: taskDesc,
        selectedEmployees: selectedEmployees,
      });
      if (data.success) {
        loadAdminTasksInfoTasksTab();
        const resp = await loadEmployeesDataAPI();
        if(resp.success)setemployeesData(resp.employees);
        setCreateNewTaskBtn(false);
        toast.success("Created Task Successfully");
      } else {
        toast.error("Errorwhile adding task pls refresh to try again...");
      }
    } catch (error) {
      console.log("server error");
    }
  };

  return (
    <div
      className={`${createNewTaskBtn || editMode ? "flex" : "hidden"} fixed inset-0 items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div
        className={`absolute ml-3 p-2 sm:ml-0 top-20 w-[280px] h-[480px] sm:w-[500px] border bg-white`}
      >
        <div className="p-2 relative">
          {!editMode && (
            <p className={`text-lg sm:text-2xl font-bold text-center`}>
              Create New Task
            </p>
          )}
          {editMode && (
            <p className={`text-lg sm:text-2xl font-bold text-center`}>
              Update Task
            </p>
          )}

          <span
            className="absolute right-1 hover:cursor-pointer top-1 material-symbols-outlined"
            onClick={() => {
              setCreateNewTaskBtn(false);
              setEditMode(false);
            }}
          >
            close
          </span>
        </div>

        <div className="flex flex-col items-start px-10 space-y-3">
          {/* Task Title */}
          <div className="w-full flex flex-col items-start">
            <p className="text-sm sm:text-lg">TaskTitle</p>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
                setErrors((prev) => ({ ...prev, taskTitle: "" }));
              }}
              placeholder="enter taskTitle..."
              className="p-1 w-full border bg-gray-400/30 py-1 focus:outline-none"
            />
            {errors.taskTitle && (
              <p className="text-red-500 text-sm">{errors.taskTitle}</p>
            )}
          </div>

          {/* Task Desc */}
          <div className="w-full flex flex-col items-start">
            <p className="text-sm sm:text-lg">TaskDescription</p>
            <textarea
              rows={4}
              value={taskDesc}
              onChange={(e) => {
                setTaskDesc(e.target.value);
                setErrors((prev) => ({ ...prev, taskDesc: "" }));
              }}
              placeholder="Describe the task..."
              className="p-1 w-full border bg-gray-400/30 focus:outline-none"
            />
            {errors.taskDesc && (
              <p className="text-red-500 text-sm">{errors.taskDesc}</p>
            )}
          </div>

          {/* Assign To */}
          <div className="relative w-full">
            <p className="text-sm sm:text-lg">Assign To</p>

            <div
              onClick={() => setOpenDropDown(!openDropDown)}
              className="w-full p-1 border bg-gray-400/30 py-2 flex justify-between items-center hover:cursor-pointer"
            >
              <span className={``}>
                {(selectedEmployees.length > 0) & (employeesData.length > 0) //selectedEmployees storing empId's
                  ? employeesData
                      .filter((emp) => selectedEmployees.includes(emp._id)) //only retrieve the emp who's id is in selectedEmployees
                      .map((emp) => emp.employeeName) //then fetch their name using empID
                      .join(", ")
                  : "Select Employees"}
              </span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </div>

            {errors.setEmployees && (
              <p className="text-red-600 text-sm">{errors.setEmployees}</p>
            )}

            {openDropDown && (
              <div className="absolute top-20 w-full border flex flex-col p-2 rounded-md mt-2 bg-white">
                {employeesData.map((emp) => (
                  <label key={emp._id}>
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp._id)} //tick all already selected employees
                      onChange={() => {
                        setEmployeeWithStatus((prev) =>
                          prev.some((item) => item?.emp?._id === emp?._id)
                            ? prev.filter((item) => item?.emp?._id !== emp?._id)
                            : [
                                ...prev,
                                {
                                  emp,
                                  status: "pending",
                                },
                              ],
                        );

                        setSelectedEmployees(
                          (prev) =>
                            prev.includes(emp._id) //if already empId exist in the selectedEmployee?
                              ? prev.filter((id) => id !== emp._id) //if exits remove it from selectedEmployees
                              : [...prev, emp._id], //else add the new empId into the selectedEmployees
                        );
                        setErrors((prev) => ({ ...prev, setEmployees: "" }));
                      }}
                    />
                    {emp.employeeName}
                  </label>
                ))}
              </div>
            )}

            <div className="text-center mt-4">
              <button
                className={`border bg-green-700 px-6 py-1 rounded-md text-white hover:cursor-pointer hover:bg-green-600`}
                onClick={editMode ? handleUpdateTask : handleCreateNewTask}
              >
                {editMode ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPopup;
