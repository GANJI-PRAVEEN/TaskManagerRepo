import { toast } from "react-toastify";

export const CreateNewTaskAPI = async ({
  taskTitle,
  taskDesc,
  adminID,
  selectedEmployees,
}) => {
  try {
    const res = await fetch(
      "http://localhost:4000/api/v1/taskManager/create-taskByAdmin",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          taskTitle,
          taskDesc,
          adminID:adminID,
          assignments: selectedEmployees,
        }),
      },
    );
    return res.json();
  } catch (error) {
    toast("unable to create task");
  }
};

export const loadEmployeesData = async ({ adminID }) => {
  try {
    const res = await fetch(
      "http://localhost:4000/api/v1/taskManager/getemployeeTasksStats",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ adminID: adminID }),
      },
    );
  } catch (error) {
    toast.error("failed to fetch employee stats data", error.message);
  }
};
