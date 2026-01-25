import mongoose ,{Schema} from "mongoose";

const employeeSchema = new Schema(
    {
        employeeName:{
            type:String,
            required:true,
            trim:true,
        },
        employeeMail:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
        },
        employeePassword:{
            type:String,
            required:true,
            minLength:6,
            maxLength:80
        },
        adminID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Admin",
            required:true
        },
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Employee",employeeSchema);