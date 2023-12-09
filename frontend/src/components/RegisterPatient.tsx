import {
  CircularProgress,
  FormControl,
  Slide,
  TextField,
  Box,
} from "@mui/material";

import PrirmaryButton from "./PrimaryButton";
import InputField from "./Input";
import { useRegisterPatient } from "../hooks/registerPatient";
import AppAlert from "./Alerts";

interface RegisterPatientType {
  registerPatient: boolean;
}

const RegistrationPatientFormFields_1 = [
  "Username",
  "First Name",
  "Last Name",
  "Email",
  "Password",
  "Confirm Password",
];

const RegistrationPatientFormFields_2 = ["Address", "City", "State", "Pincode"];

export default function RegisterPatient({
  registerPatient,
}: RegisterPatientType) {
  const {
    handleImage,
    handleSubmit,
    control,
    onSubmit,
    isLoading,
    messagePatient,
  } = useRegisterPatient();

  return (
    <>
      <Slide appear={true} direction="left" in={registerPatient}>
        <FormControl
          component="form"
          fullWidth
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            gap: "10px",
            display: registerPatient ? "grid" : "none",
            justifyItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box sx={{ display: "grid", gap: "10px", width: "100%" }}>
              {RegistrationPatientFormFields_1.map((field, id) => (
                <InputField
                  key={id}
                  type={
                    field.includes("Name") || field.includes("Username")
                      ? "text"
                      : field.includes("Email")
                      ? "email"
                      : "password"
                  }
                  size="small"
                  label={field}
                  control={control}
                  name={
                    id === 0
                      ? "user_name"
                      : id === 4
                      ? "password"
                      : id === 5
                      ? "password2"
                      : field.charAt(0).toLowerCase() +
                        field.slice(1).replace(" ", "_").toLowerCase()
                  }
                />
              ))}
            </Box>
            <Box sx={{ display: "grid", gap: "10px", width: "100%" }}>
              {RegistrationPatientFormFields_2.map((field, id) => (
                <InputField
                  key={id}
                  type={
                    field.includes("Address") ||
                    field.includes("City") ||
                    field.includes("State")
                      ? "text"
                      : field.includes("Pincode")
                      ? "number"
                      : field.includes("Picture")
                      ? "file"
                      : "email"
                  }
                  size="small"
                  label={field}
                  control={control}
                  name={
                    id === 0
                      ? "address"
                      : id === 5
                      ? "password2"
                      : field.charAt(0).toLowerCase() +
                        field.slice(1).replace(" ", "_").toLowerCase()
                  }
                />
              ))}
              <TextField
                fullWidth
                size="small"
                type="file"
                onChange={handleImage}
              />
              {isLoading ? (
                <CircularProgress />
              ) : (
                <PrirmaryButton type="submit" label="Register" />
              )}
            </Box>
          </Box>
        </FormControl>
      </Slide>
      <AppAlert message={messagePatient} />
    </>
  );
}
