import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT),
  DB_NAME: String(process.env.DB_NAME),
  DB_URL: String(process.env.DB_URL),
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  SECRET_KEY: String(process.env.SECRET_KEY),
};
