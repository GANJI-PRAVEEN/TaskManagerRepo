import AdminModel from "../models/admin.model.js";
import TaskModel from '../models/Tasks.model.js';
import employeeModel from '../models/employee.model.js';
import bcrypt from "bcrypt";
import TasksModel from "../models/Tasks.model.js";
import mongoose, { Mongoose } from "mongoose";

const createAdmin =async(req,res)=>{
    try {
        const {adminName,adminMail,adminPassword,adminGender} = req.body;
        if(!adminName || !adminMail || !adminPassword || !adminGender){
            return res.status(400).json({message:"please enter every admin field"});
        }
        const adminHashedPassword = await bcrypt.hash(adminPassword,10);
        const Admin = await AdminModel.create(
            {
                adminName:adminName,
                adminMail:adminMail,
                adminPassword:adminHashedPassword,
                adminGender:adminGender,
            }
        )
        return res.status(200).json({
            success:true,
            message:"successfully created a admin",
            user:Admin,
            role:"admin"

        });
    } catch (error) {
        return res.status(400).json({message:"some internal error occured",error:error.message});
    }
}

const createemployee = async(req,res)=>{
    try {
        const {employeeName,employeeMail,employeePassword,adminID} = req.body;
        if(!employeeName || !employeeMail || !employeePassword){
            return res.status(400).json({message:"pls enter all fields"});
        }
        const employeeHashedPassword = await bcrypt.hash(employeePassword,10);
        const employee = await employeeModel.create(
            {

                employeeName:employeeName,
                employeeMail:employeeMail,
                employeePassword:employeeHashedPassword,
                adminID:adminID,
            }
            
        )
        return res.status(200).json({message:"successfully created a employee...!!"});
    } catch (error) {
        return res.status(400).json({message:"some internal error occured",error:error.message});
    }
}

const createTaskByAdmin = async(req,res)=>{
    try {
        const {taskTitle,taskDesc,adminID,assignments} = req.body;
        if(!taskTitle || !taskDesc ||  !adminID){
            return res.status(400).json({message:"pls enter all fields"});
        }
        if(!Array.isArray(assignments) || assignments.length===0){
            return res.status(200).json({
                success:false,
                message:"pls assign this task to anyone of your employee..!"
            })
        }
        console.log("RAW assignments:", assignments);
        const assignmentObjects = assignments.map( empID => ({
            employeeID : empID
        }));
        const task = await TaskModel.create(
            {
                taskTitle:taskTitle,
                taskDesc:taskDesc,
                adminID: new mongoose.Types.ObjectId(adminID),
                assignments:assignmentObjects 
            }
        )
        return res.status(200).json({success:true,message:"successfully created a task...!!"});

    } catch (error) {
        return res.status(400).json({message:"some internal error occured",error:error.message});
    }
}

const findemployeeUnderAdmin = async(req,res)=>{
    try {
        const {adminID}  = req.body;
        if(!adminID){
            return res.status(400).json({message:"sorry pls provide adminId"});
        }
        const employees = await employeeModel.find({adminID});
        return res.status(200).json({
            success:true,
            count:employees.length,
            employees:employees
        });
    } catch (error) {
         return res.status(400).json({message:"some internal error occured",error:error.message});
    }
}
const getemployeeTasks = async(req,res)=>{
    try {
        const {employeeID}=req.body;
        if(!employeeID){
            return res.status(400).json({message:"sorry pls provide employeeID"});
        }
        const employeeTasks = await TasksModel.find({employeeID});
        return res.status(200).json({
            success:true,
            count:employeeTasks.length,
            employeeTasks
        })
    } catch (error) {
        
    }
}
const loginAdminemployee = async(req,res)=>{
    try {
        const {email,password} = req.body;
        console.log(email,password)
        if(!email || !password){
            return res.status(400).json({message:"sorry pls provide enter all fields"});
        }
        const employee = await employeeModel.findOne({
            employeeMail:email,
        });
        if(employee && await bcrypt.compare(password,employee.employeePassword)){
            return res.status(200).json({
                success:true,
                role:"employee",
                user:employee
            })
        }

        const admin = await AdminModel.findOne({
            adminMail:email,
        });
        if(admin && await bcrypt.compare(password,admin.adminPassword)){
            return res.status(200).json({
                success:true,
                role:"admin",
                user:admin
            })
        }
        return res.status(400).json({
            success:false,
            message:"invalid credentials"
        })
    } catch (error) {
        return res.status(400).json({message:"some internal error occured",error:error.message});
    }
}

const getemployeeTasksStats = async(req,res) =>{
    try {
        const {adminID} = req.body;
        // aggregation - work multiple tasks in one API call like joining Tasks + employee and add fields like pending,completed
        const employees = await employeeModel.aggregate([
            {
                $match:{
                    adminID : new mongoose.Types.ObjectId(adminID),
                },
            },
            // Attach ONLY tasks created by this admin for each employee
            {
                $lookup:{
                    from:"tasks",
                    let:{ employeeID:"$_id"},
                    pipeline:[
                        {$unwind:"$assignments"},
                        {
                            $match:{
                                $expr:{
                                    $and:[
                                        {$eq: ["$assignments.employeeID", "$$employeeID"]},  //employee._id === tasks.assignedEmployeeIDs
                                        {$eq:["$adminID", new mongoose.Types.ObjectId(adminID)]},
                                    ]
                                }
                            }
                        }
                    ],
                    as:"tasks",  //result stored in tasks

                }
            },
            {
                $addFields:{
                    assignedCount:{$size: "$tasks"},
                    completedCount:{
                        $size:{
                            $filter:{
                                input:"$tasks",
                                as:"task",
                                cond:{$eq: ["$$task.assignments.status","completed"]}
                            },
                        },
                    },
                },
            },

            {
                $project:{
                    tasks:0,
                },
            },

        ]);
        res.json({
            success:true,
            employees,
        });
    } catch (error) {
        return res.status(400).json({message:"some internal error occured",error:error.message});
    }
}

const getAdminTasksStats = async (req, res) => {
  try {
    const { adminID } = req.body;

    if (!adminID) {
      return res.status(400).json({
        message: "adminID is required"
      });
    }

    const tasksInfo = await TaskModel.aggregate([
      // 1️⃣ Match admin tasks
      {
        $match: {
          adminID: new mongoose.Types.ObjectId(adminID)
        }
      },

      // 2️⃣ Unwind assignments
      {
        $unwind: "$assignments"
      },

      // 3️⃣ Lookup employee
      {
        $lookup: {
          from: "employees",
          localField: "assignments.employeeID",
          foreignField: "_id",
          as: "employee"
        }
      },

      // 4️⃣ employee array → object
      {
        $unwind: "$employee"
      },

      // 5️⃣ Group back by task
      {
        $group: {
          _id: "$_id",

          taskTitle: { $first: "$taskTitle" },
          createdAt: { $first: "$createdAt" },

          employees: {
            $push: {
              employeeID: "$employee._id",
              employeeName: "$employee.employeeName",
              status: "$assignments.status",      
            }
          }
        }
      },

      // 6️⃣ Final shape (tasksInfo wrapper)
      {
        $project: {
          _id: 0,
        taskID: "$_id",
        taskTitle: "$taskTitle",
        createdAt: "$createdAt",
        employees: "$employees"
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      tasksInfo:tasksInfo
    });

  } catch (error) {
    return res.status(500).json({
      message: "some internal error occured",
      error: error.message
    });
  }
};

const getAdminTasksInfo = async(req,res) => {
    try {
        const {adminID} = req.body;
        if(!adminID){
            return res.status(400).json({message:"pls enter or login as a admin"});
        }
        const adminTasksInfo = await TasksModel.aggregate([
            {
                $match:{
                    adminID:new mongoose.Types.ObjectId(adminID),
                }
            },
            // 1. fetch emplolyee Id who are completed
            {
                $addFields:{
                    completedEmployees:{
                        $filter:{
                            input:"$assignments",
                            as:"emp",
                            cond:{$eq:["$$emp.status","completed"]},
                        }
                    },
                    totalAssignedTo :{$size:{$ifNull:["$assignments",[]]}},
                    pendingEmployees:{
                        $filter:{
                            input:"$assignments",
                            as:"emp",
                            cond:{$eq:["$$emp.status","pending"]},
                        }
                    }
                    
                }
            },

            // now get their employee names using who is completed  employeeID in completedEmployees new field by joining employee
            {
                $lookup:{
                    from:"employees",
                    localField:"completedEmployees.employeeID",
                    foreignField:"_id",
                    as:"completedEmployeeDetails"
                }
            },  
            // now get their employee names who is pending using employeeID in pendingEmployees new field by joining employee
            {
                $lookup:{
                    from:"employees",
                    localField:"pendingEmployees.employeeID",
                    foreignField:"_id",
                    as:"pendingEmployeeDetails"
                }
            },
            // final output
            {
                $project:{
                    _id:1,
                    taskTitle:1,
                    taskDesc:1,
                    completedEmployees:"$completedEmployeeDetails.employeeName",
                    pendingEmployees:"$pendingEmployeeDetails.employeeName",
                    totalAssignedTo:1
                }
            }
            

        ]);

        return res.status(200).json({
            success:true,
            message:"retrieved successfully",
            adminTasksInfo
        })
    } catch (error) {
        console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
    }
}






export 
    {createemployee,
    createAdmin,
    createTaskByAdmin,
    findemployeeUnderAdmin,
    getemployeeTasks,
    loginAdminemployee,
    getemployeeTasksStats,
    getAdminTasksStats,
    getAdminTasksInfo};