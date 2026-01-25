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
        adminGender:{
            type:String,
            required:true,
            enum:["male","female","others"],
            default:"male"
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Admin",adminSchema);