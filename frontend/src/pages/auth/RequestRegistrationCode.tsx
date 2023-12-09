import { FormControl, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/Input";
import PrirmaryButton from "../../components/PrimaryButton";
import { useRequestRegistrationCode } from "../../hooks/resetPasswordEmail";
import AppAlert from "../../components/Alerts";
import { useEffect } from "react";

export default function RequestRegistrationCodePage() {
  const { handleSubmit, control, message, isLoading, onSubmit } =
    useRequestRegistrationCode();
  const navigate = useNavigate();
  const userType = localStorage.getItem("user_type");

  useEffect(() => {
    if (userType !== "1") {
      navigate("/auth/login");
    }
  }, []);

  return (
    <>
      <AuthLayout title="Reset Password">
        <FormControl
          component="form"
          fullWidth
          onSubmit={handleSubmit(onSubmit)}
          sx={{ gap: "10px" }}
        >
          <InputField
            type="email"
            label="Email"
            control={control}
            name="email"
          />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <PrirmaryButton type="submit" label="Send" />
          )}
        </FormControl>
      </AuthLayout>
      <AppAlert message={message} />
    </>
  );
}
