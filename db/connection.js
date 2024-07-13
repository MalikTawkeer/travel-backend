import mongoose from "mongoose";
import { config } from "../config.js";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(
      // "mongodb://127.0.0.1/dbName"
      `${config.DB_URL}${config.DB_NAME}`
    );
    console.log(`\n DB connected : DB HOST: ${con.connection.host}`);
  } catch (error) {
    console.log("Error while connecting to db", error);
    process.exit(1);
  }
};

export default connectDB;
