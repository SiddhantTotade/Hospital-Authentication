import { CircularProgress, FormControl, Slide } from "@mui/material";

import PrirmaryButton from "./PrimaryButton";
import InputField from "./Input";
import { useRegisterDoctor } from "../hooks/registerDoctor";

interface RegisterPatientType {
  registerDoctor: boolean;
}

const RegistrationDoctorFormFields = [
  "Username",
  "First Name",
  "Last Name",
  "Email",
  "Password",
  "Confirm Password",
  "Address",
  "City",
  "State",
  "Pincode",
  "Doctor Registration Code",
];

export default function RegisterDoctor({
  registerDoctor,
}: RegisterPatientType) {
  const { handleSubmit, control, onSubmit, isLoading } = useRegisterDoctor();

  return (
    <Slide appear={true} direction="left" in={registerDoctor}>
      <FormControl
        component="form"
        fullWidth
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          gap: "10px",
          display: registerDoctor ? "grid" : "none",
          justifyItems: "center",
        }}
      >
        {RegistrationDoctorFormFields.map((field, id) => (
          <InputField
            key={id}
            type={
              field.includes("Name") ||
              field.includes("Username") ||
              field.includes("Address") ||
              field.includes("City") ||
              field.includes("State") ||
              field.includes("Code")
                ? "text"
                : field.includes("Email")
                ? "email"
                : field.includes("Pincode")
                ? "number"
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
                : id === 10
                ? "doctorRegistrationCode"
                : field.charAt(0).toLowerCase() +
                  field.slice(1).replace(" ", "_").toLowerCase()
            }
          />
        ))}
        {isLoading ? (
          <CircularProgress />
        ) : (
          <PrirmaryButton type="submit" label="Register" />
        )}
      </FormControl>
    </Slide>
  );
}
