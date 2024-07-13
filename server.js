import express from "express";

import connectDB from "./db/connection.js";

const app = express();
connectDB();

app.listen(200, () => {
  console.log("server running on port 3000");
});
