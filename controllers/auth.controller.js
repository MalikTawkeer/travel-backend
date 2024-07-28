import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";
import { config } from "../config.js";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "../validations/auth.validation.js";
import { deleteFiles } from "../utils/delete.image.files.js";

const MAX_AGE = 30 * 24 * 60 * 60;

const generateToken = (id) => {
  return jwt.sign({ id }, config.SECRET_KEY, { expiresIn: MAX_AGE });
};

const registerUser = async (req, res) => {
  try {
    // CHECK VALIDATIONS
    await registerUserValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    const {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
      address,
      dob,
      accountStatus,
    } = req.body;

    let profilePicUrl = "";

    //check for profile pic and retrive path/url
    if (req.file) profilePicUrl = req.file.path;

    // hash the password
    const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);

    await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNo,
      address,
      dob,
      accountStatus,
      profilePicUrl,
    });

    return res.status(200).json({ message: "user registered", created: true });
  } catch (error) {
    console.log("ERROR: registering the user", error);

    if (req.file && req.file.path) {
      const pathArr = [];
      pathArr.push({ path: req.file.path });
      await deleteFiles(pathArr);
    }

    return res.status(500).json({ error });
  }
};

const loginUser = async (req, res) => {
  try {
    // CHECK VALIDATION
    await loginUserValidationSchema.validate(req.body, { abortEarly: false });

    const { email, password } = req.body;

    // CHECK USER EXISTS OR NOT
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.cookie("LGN_TOKEN", generateToken(user.id), {
        maxAge: MAX_AGE * 1000,
        withCrediantels: true,
        httpOnly: true,
        secure: true,
        path: "/",
      });

      return res.status(200).json({ status: true, user: user.username });
    } else {
      return res
        .status(404)
        .json({ message: "Email or password is Incorrect" });
    }
  } catch (error) {
    console.log("ERROR:: while logging in...", error);
    return res.status(500).json({ error });
  }
};

export { registerUser, loginUser };
