import React, { useState } from "react";

const CreateTaskPopup = ({
  editMode,
  setEditMode,
  createNewTaskBtn,
  setCreateNewTaskBtn,
  employeesData,
  selectedEmployees,
  setSelectedEmployees,
  open,
  setOpen,
  errors,
  setErrors,
  handleNewTaskCreationBtn,
}) => {
  const [taskTitle,setTaskTitle] = useState("");
  const [taskDesc,setTaskDesc] = useState("");
  const [selectedEmployees,setSelectedEmployees] = useState([]);
  const [createNewTaskAPI,setCreateNewTaskAPI] = useState(false);
  const [errors, setErrors] = useState({});

  return (
    <div
      className={`${createNewTaskBtn ? "flex" : "hidden"} fixed inset-0 items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div
        className={`absolute ml-3 p-2 sm:ml-0 top-20 w-[280px] h-[480px] sm:w-[500px] border bg-white`}
      >
        <div className="p-2 relative">
          <p className={`text-lg sm:text-2xl font-bold text-center`}>
            Create New Task
          </p>
          <span
            className="absolute right-1 hover:cursor-pointer top-1 material-symbols-outlined"
            onClick={() => setCreateNewTaskAPI(false)}
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
              onClick={() => setOpen(!open)}
              className="w-full p-1 border bg-gray-400/30 py-2 flex justify-between items-center hover:cursor-pointer"
            >
              <span className={``}>
                {selectedEmployees.length > 0
                  ? employeesData
                      .filter((emp) => selectedEmployees.includes(emp._id))
                      .map((emp) => emp.employeeName)
                      .join(", ")
                  : "Select Employees"}
              </span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </div>

            {errors.setEmployees && (
              <p className="text-red-600 text-sm">{errors.setEmployees}</p>
            )}

            {open && (
              <div className="absolute top-20 w-full border flex flex-col p-2 rounded-md mt-2 bg-white">
                {employeesData.map((emp) => (
                  <label key={emp._id}>
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp._id)}
                      onChange={() => {
                        setSelectedEmployees((prev) =>
                          prev.includes(emp._id)
                            ? prev.filter((id) => id !== emp._id)
                            : [...prev, emp._id]
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
                onClick={handleCreateNewTask}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPopup;
