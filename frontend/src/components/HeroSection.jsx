import React, { useEffect, useState } from "react";
import assets from "../assets/assets.js";
import { toast } from "react-toastify";

import Sidebar from "./MainSection/Sidebar.jsx";
import HomePage from "./MainSection/HomePage.jsx";
import ProfilePage from "./MainSection/ProfilePage.jsx";
import AdminEmployeesTab from "./MainSection/AdminEmployeesTab.jsx";
import AdminTasksTab from "./MainSection/AdminTasksTab.jsx";
import EmployeeAssignedTasksTab from './Employee/EmployeeAssignedTasksTab.jsx'
import {loadAdminTasksStatsForTasksTabAPI, loadAdminTasksStatsTableForHomePageAPI, loadEmployeesDataAPI } from "../api/database.js";
import EmployeePendingTasksTab from "./Employee/EmployeePendingTasksTab.jsx";

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
  const [refreshData,setRefreshData] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      await loadAdminStatsTasksTab();
      await loadAdminStatsHomePage();
      await loademployeesDataWithTasksStats();
    }
    if(refreshData){
      fetchData();
    }
  },[refreshData])


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
      { id: "employeeProfileTab", label: "Profile" },
      { id: "employeeAssignedTasksTab", label: "Assigned Tasks" },
      { id: "employeePendingTasksTab", label: "Pending Tasks" },
      { id: "employeeLogoutTab", label: "Logout" },
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

  const loadAdminStatsTasksTab = async () => {
    try {
      if (!user?._id) return;
      const data = await loadAdminTasksStatsForTasksTabAPI();
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
      const data = await loadEmployeesDataAPI();
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

  const loadAdminStatsHomePage = async () => {
    try {
      const data = await loadAdminTasksStatsTableForHomePageAPI();
      if (data.success) {
        setAdminTasksStats(data.tasksInfo);
        console.log(data.tasksInfo)
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
    if (userRole==="admin") {
      loademployeesDataWithTasksStats();
      loadAdminStatsTasksTab();
      loadAdminStatsHomePage();
    } else {
      toast.success("loading employeee data")
    }
  }, [user?._id]);

  return (
    <div
      className={`overflow-x-hidden pt-[64px] m-2 pl-15 pr-4 h-screen 
        // openSideBar ? "sm:pl-[250px] pl-[200px]" : "sm:pl-[60px] pl-[55px]"
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
      {activeSidebarTab==="" &&
        <HomePage
          statusBoxes={statusBoxes}
          adminTasksStats={adminTasksStats}
        />
      }
      { (activeSidebarTab === "employeeProfileTab" || activeSidebarTab === "adminProfile") &&
        <ProfilePage

          employeesData = {employeesData}
        />
      }
      {activeSidebarTab=="adminemployees" && 
        <AdminEmployeesTab
          employeesData={employeesData}
          setemployeesData={setemployeesData}
          setRefreshData={setRefreshData}
        />
      }
      {activeSidebarTab === "adminTasks" && 
        <AdminTasksTab
          setRefreshData={setRefreshData}
          setemployeesData={setemployeesData}
          employeesData={employeesData}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
          open={open}
          setOpen={setOpen}
          errors={errors}
          setErrors={setErrors}
          adminTasksInfo={adminTasksInfo}
          setAdminTasksInfo={setAdminTasksInfo}
          openMenuTaskId={openMenuTaskId}
          setOpenMenuTaskId={setOpenMenuTaskId}
          handleUpdateTask={handleUpdateTask}
        />
      }
      {activeSidebarTab === "employeeAssignedTasksTab" && 
      <EmployeeAssignedTasksTab/>
      }
      {activeSidebarTab==="employeePendingTasksTab" && 
      <EmployeePendingTasksTab/>
      }

    </div>
  );
};

export default HeroSection;
