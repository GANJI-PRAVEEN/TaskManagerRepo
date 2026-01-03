import mongoose from "mongoose";

export const connectDB=async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("successfully connected DB!!");
    } catch (error) {
        console.log("mongoDB failed to connect",error);
        process.exit(1);
    }
}
export default connectDB;