import userModel from "../models/user.model.js";
import { deleteFiles } from "../utils/delete.image.files.js";

const getUserProfileInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const userData = await userModel
      .findOne({ _id: id })
      .select("-email -password -createdAt -updatedAt");

    if (userData) {
      return res.status(200).json({ userData });
    }

    // USER NOT FOUND
    return res.status(404).json({ message: "not user found!" });
  } catch (error) {
    console.log("ERROR: while getting user profile data", error);
    res.status(500).json({ error });
  }
};

const updateUserProfileInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const { firstName, lastName, phoneNo, address, dob } = req.body;

    let profilePicUrl = "";

    // CHECK FOR NEWLY UPLOADED PROFILE PIC ND DEL
    if (req.file && req.file.path) profilePicUrl = req.file.path;

    // DELETE ALREDY UPLOADED PROFILE PIC, IF ANY
    if (req.file && req.file.path) {
      const userInfo = await userModel.findById(id);
      const profilePicPath = [{ path: userInfo.profilePicUrl }];
      await deleteFiles(profilePicPath);
    }

    // UPDATE USER PROFILE INFO
    const result = await userModel.findOneAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        phoneNo,
        address,
        dob,
        ...(req.file ? { profilePicUrl } : {}),
      },
      {
        new: true,
      }
    );

    if (result) {
      return res.status(200).json({
        message: "profile updated successfully",
        updated: true,
        result,
      });
    }
  } catch (error) {
    console.log("ERROR: while updating user profile info", error);
    res.status(500).json({ error });
  }
};

export { getUserProfileInfo, updateUserProfileInfo };
