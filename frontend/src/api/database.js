import { toast } from "react-toastify";

  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const userRole = session?.role;
  const user = session?.user;

export const CreateNewTaskAPI = async ({
  taskTitle,
  taskDesc,
  selectedEmployees,
}) => {
    const res = await fetch(
      "http://localhost:4000/api/v1/taskManager/create-taskByAdmin",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          taskTitle,
          taskDesc,
          adminID:user?._id,
          assignments: selectedEmployees,
        }),
      },
    );
    return res.json();
};

export const loadEmployeesDataAPI = async () => {
    const res = await fetch(
      "http://localhost:4000/api/v1/taskManager/getemployeeTasksStats",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ adminID: user?._id }),
      },
    );
    return res.json();

};

export const loadAdminTasksStatsForTasksTabAPI = async () => {
  const res = await fetch(
        "http://localhost:4000/api/v1/taskManager/getAdminTasksStatsTaskTab",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ adminID: user?._id }),
        },
  );
  return res.json();
}

export const loadAdminTasksStatsTableForHomePageAPI = async () => {
  const res = await fetch(
        "http://localhost:4000/api/v1/taskManager/getAdminTasksStatsHomePage",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ adminID: user?._id }),
        }
      );
      return res.json();
}
