import mongoose,{Schema} from "mongoose";

export const adminSchema = new Schema(
    {
        adminName:{
            type:String,
            required:true,
            trim:true
        },
        adminMail:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true,
        },
        adminPassword:{
            type:String,
            required:true,
            minLength:6,
            maxLength:80,
        },
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Admin",adminSchema);