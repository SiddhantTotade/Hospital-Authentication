import { CircularProgress, FormControl, Slide } from "@mui/material";

import PrirmaryButton from "./PrimaryButton";
import InputField from "./Input";
import { useRegisterPatient } from "../hooks/registerPatient";

interface RegisterPatientType {
  registerPatient: boolean;
}

const RegistrationPatientFormFields = [
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
];

export default function RegisterPatient({
  registerPatient,
}: RegisterPatientType) {
  const { handleSubmit, control, onSubmit, isLoading, message } =
    useRegisterPatient();

  return (
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
        {RegistrationPatientFormFields.map((field, id) => (
          <InputField
            key={id}
            type={
              field.includes("Name") ||
              field.includes("Username") ||
              field.includes("Address") ||
              field.includes("City") ||
              field.includes("State")
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
