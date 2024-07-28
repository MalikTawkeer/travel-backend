import express from "express";

import {
  getUserProfileInfo,
  updateUserProfileInfo,
} from "../controllers/user.controller.js";
import uploadProfilePic from "../middlewares/img.upload.middleware.js";

const router = express.Router();

router.get("/profileInfo/:id", getUserProfileInfo);

router.put(
  "/updateProfileInfo/:id",
  uploadProfilePic({
    destination: "uploads/profile_pictures",
    single: true,
    fieldName: "profilePicture",
  }),
  updateUserProfileInfo
);

export default router;
