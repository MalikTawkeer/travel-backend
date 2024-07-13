// validation/userValidationSchema.js
import * as yup from "yup";

const registerUserValidationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  phoneNo: yup.string().trim(),
  address: yup.object().shape({
    street: yup.string().trim(),
    city: yup.string().trim(),
    state: yup.string().trim(),
    postalCode: yup.string().trim(),
    country: yup.string().trim(),
  }),
  profilePicUrl: yup.string().url("Invalid URL format").trim(),
  dob: yup.date(),
  accountStatus: yup.string().oneOf(["active", "inactive"]).default("active"),
});

const loginUserValidationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export { registerUserValidationSchema, loginUserValidationSchema };
