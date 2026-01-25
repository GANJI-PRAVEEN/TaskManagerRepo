import React from "react";
import AdminTaskDetailsView from "./AdminTaskDetailsView";
import CreateTaskPopup from "./CreateTaskPopup";

const AdminTasksTab = ({
  activeSidebarTab,
  setCreateNewTaskBtn,
  createNewTaskBtn,

  taskTitle,
  setTaskTitle,
  taskDesc,
  setTaskDesc,

  employeesData,
  selectedEmployees,
  setSelectedEmployees,

  open,
  setOpen,

  errors,
  setErrors,

  handleNewTaskCreationBtn,
  handleUpdateTask,

  adminTasksInfo,
  openMenuTaskId,
  setOpenMenuTaskId,
}) => {
  return (
    <div
      className={`${activeSidebarTab === "adminTasks" ? "block" : "hidden"} relative`}
    >
      <div className="flex justify-between items-center px-10 py-5">
        <p className="sm:text-2xl text-lg font-bold underline">Task Details</p>

        <button
          className="border p-2 rounded-lg bg-blue-600 text-white text-sm sm:text-lg shadow shadow-md hover:cursor-pointer hover:bg-blue-500"
          onClick={() => setCreateNewTaskBtn(true)}
        >
          Create Task
        </button>
      </div>

      {/* POPUP WINDOW */}
      <CreateTaskPopup
        createNewTaskBtn={createNewTaskBtn}
        setCreateNewTaskBtn={setCreateNewTaskBtn}
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
        handleUpdateTask={handleUpdateTask}
      />

      {/* TABLE */}
      <AdminTaskDetailsView
        adminTasksInfo={adminTasksInfo}
        openMenuTaskId={openMenuTaskId}
        setOpenMenuTaskId={setOpenMenuTaskId}
        createNewTaskBtn={createNewTaskBtn}
        setCreateNewTaskBtn={setCreateNewTaskBtn}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDesc={taskDesc}
        setTaskDesc={setTaskDesc}
        selectedEmployees={selectedEmployees}
        setSelectedEmployees={setSelectedEmployees}
        open={open}
        setOpen={setOpen}
        errors={errors}
        setErrors={setErrors}
        handleNewTaskCreationBtn={handleNewTaskCreationBtn}
      />
    </div>
  );
};

export default AdminTasksTab;
