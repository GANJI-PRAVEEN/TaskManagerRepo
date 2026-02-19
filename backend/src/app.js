import express from "express";
import adminRouter from './routes/admin.route.js';
import cors from "cors";


const app = express();
app.use(cors({
  origin: true,
  credentials: true
}));


app.use(express.json());
app.use("/api/v1/taskManager",adminRouter); // URL : https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager/create-employee


// URL :https://task-manager-app-backend-jl4h.onrender.com/api/v1/taskManager
export default app;