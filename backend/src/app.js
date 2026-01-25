import express from "express";
import adminRouter from './routes/admin.route.js';
import cors from "cors";


const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use("/api/v1/taskManager",adminRouter); // URL : http://localhost:4000/api/v1/taskManager/create-employee


// URL : http:localhost:4000/api/v1/taskManager
export default app;