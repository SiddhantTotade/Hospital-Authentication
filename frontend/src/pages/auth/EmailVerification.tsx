import { Typography } from "@mui/material";

import AuthLayout from "../../layouts/AuthLayout";
import AppLoader from "../../components/Loader";
import AppAlert from "../../components/Alerts";
import { useVerifyEmail } from "../../hooks/verifyEmail";

export default function EmailVerificationPage() {
  const { isLoading, message, error, data } = useVerifyEmail();

  return (
    <>
      {isLoading && <AppLoader />}
      <AuthLayout title="Verify Email">
        {message.msg && data && (
          <Typography>Email is verified. You can close this tab.</Typography>
        )}
        {error && (
          <Typography>Some error occured. Please try again.</Typography>
        )}
      </AuthLayout>
      <AppAlert message={message} />
    </>
  );
}
