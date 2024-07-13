import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_URL: process.env.DB_URL,
};
