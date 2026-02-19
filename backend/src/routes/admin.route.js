import {Router} from "express";
import {createemployee,createAdmin,createTaskByAdmin,
    findemployeeUnderAdmin,getemployeeTasks,
    loginAdminemployee,
    getemployeeTasksStats,
    getAdminTasksStatsHomePage,
    getAdminTasksStatsTaskTab,
    getEmployeeStats,
    updateTask,
    deleteTask,
    deleteEmployee,
    getEmployeeTasksData,
    getEmployeePersonalTasksList,
    getEmployeeByID,
    updateBulkStatus
 } 
 from "../controllers/admin.controller.js"

const router = Router();
router.route("/create-employee").post(createemployee); //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/create-employee
router.route("/create-admin").post(createAdmin); //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/create-admin
router.route("/create-taskByAdmin").post(createTaskByAdmin); //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/create-taskByAdmin
router.route("/findemployeeUnderAdmin").post(findemployeeUnderAdmin); //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/findemployeeUnderAdmin
router.route("/user-login").post(loginAdminemployee);  //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/user-login
router.route('/getemployeeTasksStats').post(getemployeeTasksStats) //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/getemployeeTasksStats
router.route('/getAdminTasksStatsHomePage').post(getAdminTasksStatsHomePage) //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/getAdminTasksStatsHomePage
router.route("/getAdminTasksStatsTaskTab").post(getAdminTasksStatsTaskTab) //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/getAdminTasksStatsTaskTab
router.route("/getemployeeTasks").post(getemployeeTasks) //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/getemployeeTasks
router.route('/updateTask').post(updateTask)  //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/updateTask
router.route('/deleteTask').post(deleteTask)  //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/deleteTask
router.route('/deleteEmployee').post(deleteEmployee)  //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/deleteEmployee
router.route('/getEmployeeTasksData').post(getEmployeeTasksData)  //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/getEmployeeTasksData
router.route('/getEmployeePersonalTasksList').post(getEmployeePersonalTasksList)  //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/getEmployeePersonalTasksList
router.route('/getEmployeeByID').post(getEmployeeByID)  //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/getEmployeeByID
router.route('/updateBulkStatus').post(updateBulkStatus) //https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/updateBulkStatus


export default router;