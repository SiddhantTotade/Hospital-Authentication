import { useState } from "react";
import { Typography, Box } from "@mui/material";

import AuthLayout from "../../layouts/AuthLayout";
import PrirmaryButton from "../../components/PrimaryButton";
import AppLinks from "../../components/Links";
import RegisterPatient from "../../components/RegisterPatient";
import RegisterDoctor from "../../components/RegisterDoctor";

export default function RegisterPage() {
  const [registerUser, setRegisterUser] = useState({
    doctor: false,
    patient: false,
  });

  return (
    <>
      <AuthLayout title="Register">
        <Box sx={{ display: "flex", width: "100%", gap: "20px" }}>
          {["Doctor", "Patient"].map((user, id) => (
            <PrirmaryButton
              key={id}
              sx={{
                display:
                  registerUser.doctor || registerUser.patient ? "none" : "",
              }}
              label={`Register as ${user}`}
              onClick={() => {
                user === "Doctor"
                  ? setRegisterUser({ ...registerUser, doctor: true })
                  : setRegisterUser({ ...registerUser, patient: true });
              }}
            />
          ))}
        </Box>
        <RegisterDoctor registerDoctor={registerUser.doctor} />
        <RegisterPatient registerPatient={registerUser.patient} />
        <Typography>
          Already a user ? <AppLinks href="/auth/login">Login</AppLinks>
        </Typography>
      </AuthLayout>
    </>
  );
}
