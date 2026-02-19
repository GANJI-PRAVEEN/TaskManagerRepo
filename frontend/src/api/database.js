import { toast } from "react-toastify";

  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const userRole = session?.role;
  const user = session?.user;

export const createEmployeeAPI = async({
  empName,
  empEmail,
  empPassword
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/taskManager/create-employee`,{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({
      empName:empName,
      empEmail:empEmail,
      empPassword:empPassword,
      adminID:user?._id
    })

  })
  return res.json();
} 


export const deleteEmployeeAPI = async({empID}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/taskManager/deleteEmployee`,{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({empID})
  })
  return res.json();
}

export const fetchEmployeesAPI = async() => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/taskManager/findemployeeUnderAdmin`,{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({
      adminID:user?._id
    })
  })

}
export const getEmployeeByIDAPI = async({
  empID
}) => {
  const res =  await fetch(`${import.meta.env.VITE_API_URL}/api/v1/taskManager/getEmployeeByID`,{
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      empID:empID
    })
  })
  return res.json();
}
export const CreateNewTaskAPI = async ({
  taskTitle,
  taskDesc,
  selectedEmployees,
}) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/taskManager/create-taskByAdmin`,
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
      `${import.meta.env.VITE_API_URL}/api/v1/taskManager/getemployeeTasksStats`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ adminID: user?._id }),
      },
    );
    return res.json();

};

export const loadAdminTasksStatsForTasksTabAPI = async () => {
  console.log("🚀 loadAdminTasksStatsForTasksTabAPI CALLED");
  const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/taskManager/getAdminTasksStatsTaskTab`,
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
        `${import.meta.env.VITE_API_URL}/api/v1/taskManager/getAdminTasksStatsHomePage`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ adminID: user?._id }),
        }
      );
      return res.json();
}
export const updateTaskAPI = async({
  openMenuTaskId,taskTitle,taskDesc,employeeWithStatus
}) => {
  console.log("Called ",openMenuTaskId,taskTitle)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/taskManager/updateTask`,{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({openMenuTaskId,taskTitle,taskDesc,employeeWithStatus})
  })
  return res.json();
}

export const deleteTaskAPI = async({
  taskID
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/taskManager/deleteTask`,{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({taskID})
  })
  return res.json();
}


export const loadSpecificEmployeeTasksAPI = async({
  empID
}) => {
  try{
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/taskManager/getEmployeePersonalTasksList`,{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({empID})
  })
  return res.json();
}
catch(error){
  console.log("error ",error)
}
}


export const updateBulkStatusAPI = async({
  empID,
  updates
}) => {

  console.log("data got - ",updates)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/taskManager/updateBulkStatus`,{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({empID,updates})
  })
  return res.json();
}