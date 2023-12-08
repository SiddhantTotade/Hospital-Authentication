import { FormControl } from "@mui/material";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/Input";
import { useResetPassword } from "../../hooks/resetPassword";
import PrirmaryButton from "../../components/PrimaryButton";
import AppAlert from "../../components/Alerts";
import AppLoader from "../../components/Loader";

export default function ResetPasswordPage() {
  const { handleSubmit, control, message, isLoading, onSubmit } =
    useResetPassword();

  return (
    <>
      {isLoading && <AppLoader />}
      <AuthLayout title="Reset Password">
        <FormControl
          fullWidth
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ gap: "10px" }}
        >
          {["New Password", "Confirm New Password"].map((field, id) => (
            <InputField
              key={id}
              type="password"
              label={field}
              name={field.includes("Confirm") ? "password2" : "password"}
              control={control}
            />
          ))}
          <PrirmaryButton label="Reset" type="submit" />
        </FormControl>
      </AuthLayout>
      <AppAlert message={message} />
    </>
  );
}
