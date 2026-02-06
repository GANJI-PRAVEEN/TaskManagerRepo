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
router.route("/create-employee").post(createemployee); //http://localhost:4000/api/v1/taskManager/create-employee
router.route("/create-admin").post(createAdmin); //http://localhost:4000/api/v1/taskManager/create-admin
router.route("/create-taskByAdmin").post(createTaskByAdmin); //http://localhost:4000/api/v1/taskManager/create-taskByAdmin
router.route("/findemployeeUnderAdmin").post(findemployeeUnderAdmin); //http://localhost:4000/api/v1/taskManager/findemployeeUnderAdmin
router.route("/user-login").post(loginAdminemployee);  //http://localhost:4000/api/v1/taskManager/user-login
router.route('/getemployeeTasksStats').post(getemployeeTasksStats) //http://localhost:4000/api/v1/taskManager/getemployeeTasksStats
router.route('/getAdminTasksStatsHomePage').post(getAdminTasksStatsHomePage) //http://localhost:4000/api/v1/taskManager/getAdminTasksStatsHomePage
router.route("/getAdminTasksStatsTaskTab").post(getAdminTasksStatsTaskTab) //http://localhost:4000/api/v1/taskManager/getAdminTasksStatsTaskTab
router.route("/getemployeeTasks").post(getemployeeTasks) //http://localhost:4000/api/v1/taskManager/getemployeeTasks
router.route('/updateTask').post(updateTask)  //http://localhost:4000/api/v1/taskManager/updateTask
router.route('/deleteTask').post(deleteTask)  //http://localhost:4000/api/v1/taskManager/deleteTask
router.route('/deleteEmployee').post(deleteEmployee)  //http://localhost:4000/api/v1/taskManager/deleteEmployee
router.route('/getEmployeeTasksData').post(getEmployeeTasksData)  //http://localhost:4000/api/v1/taskManager/getEmployeeTasksData
router.route('/getEmployeePersonalTasksList').post(getEmployeePersonalTasksList)  //http://localhost:4000/api/v1/taskManager/getEmployeePersonalTasksList
router.route('/getEmployeeByID').post(getEmployeeByID)  //http://localhost:4000/api/v1/taskManager/getEmployeeByID
router.route('/updateBulkStatus').post(updateBulkStatus) //http://localhost:4000/api/v1/taskManager/updateBulkStatus


export default router;