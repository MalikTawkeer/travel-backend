import express from "express";

import { registerUser, loginUser } from "../controllers/auth.controller.js";
import uploadProfilePic from "../middlewares/img.upload.middleware.js";

const router = express.Router();

router.post(
  "/register",
  uploadProfilePic({
    destination: "uploads/profile_pictures",
    single: true,
    fieldName: "profilePicture",
  }),
  registerUser
);

router.post("/login", loginUser);
export default router;
