import {
  CircularProgress,
  FormControl,
  Slide,
  Typography,
} from "@mui/material";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/Input";
import ActionContainer from "../../components/ActionContainer";
import PrirmaryButton from "../../components/PrimaryButton";
import AppLinks from "../../components/Links";
import AppAlert from "../../components/Alerts";
import { useLogin } from "../../hooks/login";
import { useState } from "react";

export default function LoginPage() {
  const { control, handleSubmit, isLoading, message, onSubmit } = useLogin();
  const [loginUser, setLoginUser] = useState({
    doctor: false,
    patient: false,
  });

  return (
    <>
      <AuthLayout title="Login">
        {["Doctor", "Patient"].map((user, id) => (
          <PrirmaryButton
            key={id}
            sx={{
              display: loginUser.doctor || loginUser.patient ? "none" : "",
            }}
            label={`Login as ${user}`}
            onClick={() => {
              user === "Doctor"
                ? setLoginUser({ ...loginUser, doctor: true })
                : setLoginUser({ ...loginUser, patient: true });
            }}
          />
        ))}
        <Slide
          appear={true}
          direction="left"
          in={loginUser.doctor || loginUser.patient}
        >
          <FormControl
            component="form"
            fullWidth
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              gap: "10px",
              display: loginUser.patient || loginUser.doctor ? "grid" : "none",
              justifyItems: "center",
            }}
          >
            {["email", "password"].map((field, id) => (
              <InputField
                key={id}
                type={field}
                label={field === "email" ? "Email" : "Password"}
                control={control}
                name={field}
              />
            ))}
            {loginUser.doctor && (
              <InputField
                type="text"
                label="Doctor ID"
                name="doctorID"
                control={control}
              />
            )}
            {isLoading ? (
              <CircularProgress />
            ) : (
              <PrirmaryButton type="submit" label="Login" />
            )}
          </FormControl>
        </Slide>
        <ActionContainer>
          <AppLinks href="/auth/forgot/password">Forgot Password ?</AppLinks>
          <Typography>
            New User ? <AppLinks href="/auth/register">Register</AppLinks>
          </Typography>
        </ActionContainer>
      </AuthLayout>
      <AppAlert message={message} />
    </>
  );
}
