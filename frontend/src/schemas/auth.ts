import * as Yup from "yup";

const user_name = Yup.string().required("Username is required");

const first_name = Yup.string().required("First name is required");

const last_name = Yup.string().required("Last name is required");

const address = Yup.string().required("Address is required");

const city = Yup.string().required("City is required");

const state = Yup.string().required("State is required");

const pincode = Yup.number().required("Pincode is required");

const profile_pic = Yup.string().required("Profile Picture is required");

const doctorRegistrationCode = Yup.string().required(
  "Doctor Registration Code is required"
);

const email = Yup.string()
  .required("Email is required")
  .email("Email is invalid");

const password = Yup.string()
  .required("Password is required")
  .min(6, "Password must be atleast 6 characters")
  .max(40, "Password must not exceed 40 characters");

const password2 = Yup.string()
  .required("Confirm password is required")
  .oneOf([Yup.ref("password"), ""], "Confirm new password does not match");

export const LoginSchema = Yup.object().shape({
  email,
  password,
});

export const RegistrationSchemaPatient = Yup.object().shape({
  user_name,
  first_name,
  last_name,
  email,
  password,
  password2,
  address,
  city,
  state,
  pincode,
});

export const RegistrationSchemaDoctor = Yup.object().shape({
  user_name,
  first_name,
  last_name,
  email,
  password,
  password2,
  address,
  city,
  state,
  pincode,
  profile_pic,
  doctorRegistrationCode,
});

export const ResetPasswordSchema = Yup.object().shape({
  password,
  password2,
});

export const ResetPasswordEmailSchema = Yup.object().shape({
  email,
});

export const ChangePasswordSchema = Yup.object().shape({
  password,
  password2,
});
