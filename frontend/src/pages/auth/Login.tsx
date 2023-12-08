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

export default function LoginPage() {
  const { control, handleSubmit, isLoading, message, onSubmit } = useLogin();

  return (
    <>
      <AuthLayout title="Login">
        <Slide appear={true} direction="left" in={true}>
          <FormControl
            component="form"
            fullWidth
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              gap: "10px",
              display: "grid",
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
