import React, { useEffect, useState } from "react";
import assets from "../assets/assets.js";
import { toast } from "react-toastify";

import Sidebar from "./MainSection/Sidebar.jsx";
import HomePage from "./MainSection/HomePage.jsx";
import ProfilePage from "./MainSection/ProfilePage.jsx";
import AdminEmployeesTab from "./MainSection/AdminEmployeesTab.jsx";
import AdminTasksTab from "./MainSection/AdminTasksTab.jsx";
import CreateNewTaskAPI, { loadEmployeesData } from "../api/database.js";

const HeroSection = ({ activeSidebarTab, setActiveSidebarTab }) => {
  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const userRole = session?.role;
  const user = session?.user;

  const [employeeName] = useState(user.employeeName || user.adminName);
  const [openSideBar, setSideBar] = useState(false);
  const [employeesData, setemployeesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminTasksStats, setAdminTasksStats] = useState([]);
  const [adminTasksInfo, setAdminTasksInfo] = useState([]);
  const [createNewTaskBtn, setCreateNewTaskBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [errors, setErrors] = useState({});
  const [changesMode, setChangesMode] = useState(false);
  const [openMenuTaskId, setOpenMenuTaskId] = useState(null);
  const [editMode,setEditMode] = useState(false);

  function getPerformanceLabel(score) {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  }

  let employeeCompletion = 10;
  let employeePending = 6;
  let adminAssigned;
  let adminCompletedByemployee = 10;
  let adminPendingByemployee = 6;

  let sideBarOptions = [];
  let statusBoxes = [];
  let profile = [];

  adminAssigned = employeesData.reduce(
    (sum, employee) => sum + employee.assignedCount,
    0,
  );
  adminCompletedByemployee = employeesData.reduce(
    (sum, employee) => sum + employee.completedCount,
    0,
  );

  let taskCompletionRate = (adminCompletedByemployee / adminAssigned) * 100;
  let employeeProductivity =
    employeesData.length === 0 ? 0 : employeeCompletion / employeesData.length;
  let employeePerformanceScore = Math.min(employeeProductivity * 10, 100);
  let adminPerformanceScore =
    taskCompletionRate * 0.5 + employeePerformanceScore * 0.2;

  adminPerformanceScore = Math.round(adminPerformanceScore);
  adminPendingByemployee = adminAssigned - adminCompletedByemployee;

  if (userRole === "employee") {
    sideBarOptions = [
      { id: "employeeProfile", label: "Profile" },
      { id: "employeeLabel", label: "Assigned Tasks" },
      { id: "employeePending", label: "Pending Tasks" },
      { id: "employeeLogout", label: "Logout" },
    ];
    statusBoxes = [
      ["Completed", employeeCompletion],
      ["Pending", employeePending],
      ["Progress", employeePerformanceScore],
    ];
    profile = [
      { label: "Name", value: user?.employeeName },
      { label: "Email", value: user?.employeeMail },
      { label: "Total Tasks Completed", value: employeeCompletion },
      { label: "Performance Score", value: employeePerformanceScore },
    ];
  } else {
    sideBarOptions = [
      { id: "adminProfile", label: "Profile" },
      { id: "adminemployees", label: "employees" },
      { id: "adminTasks", label: "Tasks" },
      { id: "adminLogout", label: "Logout" },
    ];
    statusBoxes = [
      ["Tasks Assigned", adminAssigned],
      ["Completed", adminCompletedByemployee],
      ["Pending", adminPendingByemployee],
    ];
    profile = [
      { label: "Name", value: user?.adminName },
      { label: "Email", value: user?.adminMail },
      { label: "Total Tasks Created", value: adminAssigned },
      { label: "Performance Score", value: adminPerformanceScore },
    ];
  }

  const handleNewTaskCreationBtn = async () => {
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

    const data = await CreateNewTaskAPI(taskTitle,taskDesc,user?._id,selectedEmployees)
    if (data.success) {
      setCreateNewTaskBtn(false);
      toast.success("Created Task Successfully");
      loadAdminTasksInfo();
    } else {
      toast.error("Errorwhile adding task pls refresh to try again...");
    }
  };

  const loadAdminTasksInfo = async () => {
    try {
      if (!user?._id) return;

      const res = await fetch(
        "http://localhost:4000/api/v1/taskManager/getAdminTasksInfo",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ adminID: user?._id }),
        },
      );

      const data = await res.json();
      if (data.success) {
        setAdminTasksInfo(data.adminTasksInfo);
        toast.success("retrived admin Tasks details");
      }
    } catch (error) {
      console.log("error at admintasks info -", error.message);
    }
  };

  const loademployeesDataWithTasksStats = async () => {
    try {
      const data = await loadEmployeesData(user?._id);
      if (data.success) {
        toast.success("fetched employee stats successfully");
        setemployeesData(data.employees);
      } else {
        console.log("failed to fetch employee stats data");
      }
    } catch (error) {
      toast.error("failed to fetch employee stats data", error.message);
    }
  };

  const handleUpdateTask = async() => {

  }

  const loadAdminTasksStats = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/v1/taskManager/getAdminTasksStats",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ adminID: user._id }),
        },
      );

      const data = await res.json();
      if (data.success) {
        setAdminTasksStats(data.tasksInfo);
        toast.success("fetched admin tasks stats data");
      } else {
        setAdminTasksStats([]);
        toast.error("failed to retrieve tasks Stats of admin", data.message);
      }
    } catch (error) {
      console.log("admintasksstatsRetriever", error.message);
    }
  };

  useEffect(() => {
    if (user?._id) {
      loademployeesDataWithTasksStats();
      loadAdminTasksStats();
      loadAdminTasksInfo();
    } else {
      toast.error("please login first..!");
    }
  }, [user?._id]);

  return (
    <div
      className={`overflow-x-hidden pt-[64px] m-2 pl-15 pr-4 h-screen ${
        openSideBar ? "sm:pl-[250px] pl-[200px]" : "sm:pl-[60px] pl-[55px]"
      }`}
    >
      <Sidebar
        openSideBar={openSideBar}
        setSideBar={setSideBar}
        sideBarOptions={sideBarOptions}
        employeeName={employeeName}
        setActiveSidebarTab={setActiveSidebarTab}
        assets={assets}
      />

      <HomePage
        activeSidebarTab={activeSidebarTab}
        statusBoxes={statusBoxes}
        adminTasksStats={adminTasksStats}
      />

      <ProfilePage
        activeSidebarTab={activeSidebarTab}
        profile={profile}
        userRole={userRole}
        employeePerformanceScore={employeePerformanceScore}
        adminPerformanceScore={adminPerformanceScore}
        getPerformanceLabel={getPerformanceLabel}
        assets={assets}
      />

      <AdminEmployeesTab
        activeSidebarTab={activeSidebarTab}
        employeesData={employeesData}
        assets={assets}
      />

      <AdminTasksTab
        activeSidebarTab={activeSidebarTab}
        setCreateNewTaskBtn={setCreateNewTaskBtn}
        createNewTaskBtn={createNewTaskBtn}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDesc={taskDesc}
        setTaskDesc={setTaskDesc}
        employeesData={employeesData}
        selectedEmployees={selectedEmployees}
        setSelectedEmployees={setSelectedEmployees}
        open={open}
        setOpen={setOpen}
        errors={errors}
        setErrors={setErrors}
        handleNewTaskCreationBtn={handleNewTaskCreationBtn}
        adminTasksInfo={adminTasksInfo}
        openMenuTaskId={openMenuTaskId}
        setOpenMenuTaskId={setOpenMenuTaskId}
        handleUpdateTask={handleUpdateTask}
      />
    </div>
  );
};

export default HeroSection;
