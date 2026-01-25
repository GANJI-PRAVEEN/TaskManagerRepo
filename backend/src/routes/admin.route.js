import {Router} from "express";
import {createemployee,createAdmin,createTaskByAdmin,
    findemployeeUnderAdmin,getemployeeTasks,
    loginAdminemployee,
    getemployeeTasksStats,
    getAdminTasksStats,
    getAdminTasksInfo,
 } 
 from "../controllers/admin.controller.js"

const router = Router();
router.route("/create-employee").post(createemployee); //http://localhost:4000/api/v1/taskManager/create-employee
router.route("/create-admin").post(createAdmin); //http://localhost:4000/api/v1/taskManager/create-admin
router.route("/create-taskByAdmin").post(createTaskByAdmin); //http://localhost:4000/api/v1/taskManager/create-taskByAdmin
router.route("/findemployeeUnderAdmin").post(findemployeeUnderAdmin); //http://localhost:4000/api/v1/taskManager/findemployeeUnderAdmin
router.route("/getemployeeTasks").post(getemployeeTasks); //http://localhost:4000/api/v1/taskManager/getemployeeTasks
router.route("/user-login").post(loginAdminemployee);  //http://localhost:4000/api/v1/taskManager/user-login
router.route('/getemployeeTasksStats').post(getemployeeTasksStats) //http://localhost:4000/api/v1/taskManager/getemployeeTasksStats
router.route('/getAdminTasksStats').post(getAdminTasksStats) //http://localhost:4000/api/v1/taskManager/getAdminTasksStats
router.route("/getAdminTasksInfo").post(getAdminTasksInfo) //http://localhost:4000/api/v1/taskManager/getAdminTasksInfo

export default router;