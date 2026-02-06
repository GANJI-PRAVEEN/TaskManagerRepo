import React,{useState} from "react";
import AdminTaskDetailsView from "./AdminTaskDetailsView";
import CreateTaskPopup from "./CreateTaskPopup";

const AdminTasksTab = ({
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
}) => {

  const [createNewTaskBtn,setCreateNewTaskBtn] = useState(false);
  const [openMenuTaskId, setOpenMenuTaskId] = useState(null);
  const [editMode,setEditMode] = useState(false);
  const [openMenu,setOpenMenu] = useState(false);
  return (

    <div
      className={`relative`}
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
      {(createNewTaskBtn || editMode) && 
        <CreateTaskPopup
          adminTasksInfo={adminTasksInfo}
          editMode={editMode}
          setEditMode={setEditMode}
          setOpenMenu={setOpenMenu}
          openMenuTaskId={openMenuTaskId}
          employeesData={employeesData}
          setOpenMenuTaskId={setOpenMenuTaskId}
          setCreateNewTaskBtn = {setCreateNewTaskBtn}
          createNewTaskBtn = {createNewTaskBtn}
        />
      }

      {/* TABLE */}
      <AdminTaskDetailsView
        editMode={editMode}
        setEditMode={setEditMode}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        adminTasksInfo={adminTasksInfo}
        openMenuTaskId={openMenuTaskId}
        setOpenMenuTaskId={setOpenMenuTaskId}
        setCreateNewTaskBtn={setCreateNewTaskBtn}
      />
    </div>
  );
};

export default AdminTasksTab;
