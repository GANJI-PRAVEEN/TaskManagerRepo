import mongoose,{Schema} from "mongoose";

export const taskSchema = new Schema(
    {
        taskTitle:{
            type:String,
            required:true,
            trim:true,
        },
        taskDesc:{
             type:String,
            required:true,
            trim:true,
        },
        adminID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Admin",
            required:true,
        },
        assignments:[
            {
                employeeID:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Employee",
                    required:true,

                },
                status:{
                    type:String,
                    enum:["completed","pending"],
                    default:"pending"
                }
            }
        ]
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Task",taskSchema);