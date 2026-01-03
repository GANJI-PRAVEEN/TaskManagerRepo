import mongoose ,{Schema} from "mongoose";

const clientSchema = new Schema(
    {
        clientName:{
            type:String,
            required:true,
            trim:true,
        },
        clientMail:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
        },
        clientPassword:{
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

export default mongoose.model("Client",clientSchema);