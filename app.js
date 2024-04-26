import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middleware/solveError.js";

config({
  path: "./config/config.env",
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

import admin from "./routes/adminRoute.js";

app.use("/api/v1", admin);

export default app;
app.use(ErrorMiddleware);
