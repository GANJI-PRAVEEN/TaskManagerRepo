import dotenv from "dotenv";
import app from './app.js';
import {connectDB} from './config/database.js';
dotenv.config();


const startSever= async ()=>{

    try {
        await connectDB();

        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error;
        });

        app.listen(process.env.PORT || 8000,()=>{
            console.log(`server is running on port: ${process.env.PORT} `);
        });
    } catch (error) {
        console.log("failed to point to port ",error);
    }
}
startSever();