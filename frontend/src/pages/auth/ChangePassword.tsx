import { FormControl } from "@mui/material";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/Input";
import PrirmaryButton from "../../components/PrimaryButton";
import { useChangePassworrd } from "../../hooks/changePassword";
import AppAlert from "../../components/Alerts";
import AppLoader from "../../components/Loader";

export default function ChangePasswordPage() {
  const { handleSubmit, control, isLoading, message, onSubmit } =
    useChangePassworrd();

  return (
    <>
      {isLoading && <AppLoader />}
      <AuthLayout title="Change Password">
        <FormControl
          component="form"
          fullWidth
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
          <PrirmaryButton type="submit" label="Reset New Password" />
        </FormControl>
      </AuthLayout>
      <AppAlert message={message} />
    </>
  );
}
