import express from "express";
import cookieParser from "cookie-parser";

import connectDB from "./db/connection.js";

import authRoutes from "./routes/auth.routes.js";
import { config } from "./config.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
// Public Folder
app.use(express.static("./public"));
app.use("/uploads", express.static("uploads"));
connectDB();

app.use("/api/v1/auth", authRoutes);

app.listen(config.PORT || 300, () => {
  console.log(`server running on port 3000 ${config.PORT || 300}`);
});
