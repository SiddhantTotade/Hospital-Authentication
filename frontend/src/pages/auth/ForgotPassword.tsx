import { FormControl } from "@mui/material";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/Input";
import PrirmaryButton from "../../components/PrimaryButton";
import { useResetPasswordEmail } from "../../hooks/resetPasswordEmail";
import AppLoader from "../../components/Loader";
import AppAlert from "../../components/Alerts";

export default function ForgotPasswordPage() {
  const { handleSubmit, control, message, isLoading, onSubmit } =
    useResetPasswordEmail();

  return (
    <>
      {isLoading && <AppLoader />}
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
          <PrirmaryButton type="submit" label="Send " />
        </FormControl>
      </AuthLayout>
      <AppAlert message={message} />
    </>
  );
}
