import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRouter from "./routes/admin.js";
import employeeRouter from "./routes/employee.js";

export const app = express();

config({
  path: "./database/config.env",
});
app.use(cors());

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/employee", employeeRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});
