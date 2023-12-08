import { useState } from "react";
import { Typography } from "@mui/material";

import AuthLayout from "../../layouts/AuthLayout";
import PrirmaryButton from "../../components/PrimaryButton";
import AppLinks from "../../components/Links";
import RegisterPatientPage from "../../components/RegisterPatient";
import RegisterDoctor from "../../components/RegisterDoctor";

export default function RegisterPage() {
  const [registerUser, setRegisterUser] = useState({
    doctor: false,
    patient: false,
  });

  return (
    <>
      <AuthLayout title="Register">
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
        <RegisterPatientPage registerPatient={registerUser.patient} />
        <RegisterDoctor registerDoctor={registerUser.doctor} />
        <Typography>
          Already a user ? <AppLinks href="/auth/login">Login</AppLinks>
        </Typography>
      </AuthLayout>
    </>
  );
}
