import { useSelector } from "react-redux";
import { CircularProgress, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import PrirmaryButton from "../components/PrimaryButton";
import withAuth from "../hocs/withAuth";
import AuthLayout from "../layouts/AuthLayout";
import AppLoader from "../components/Loader";
import { useLogout } from "../hooks/logout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/profile";
import { useResendVerificationEmail } from "../hooks/resendVerificationEmail";
import AppAlert from "../components/Alerts";

function HomePage() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { onSubmit, isLoading } = useLogout();
  const { isVerifyLoading, message, resendVerifyEmail } =
    useResendVerificationEmail();
  const userData = useSelector((state) => state.user);

  useProfile();

  return (
    <>
      {isLoading && <AppLoader />}
      <AuthLayout>
        <Typography>
          Welcome, {userData.first_name + " " + userData.last_name}
        </Typography>
        <Typography
          sx={{ display: "flex", justifyItems: "center", gap: "10px" }}
        >
          {userData.email}{" "}
          {userData.is_verified !== true ? (
            <HighlightOffIcon color="error" />
          ) : (
            <CheckCircleOutlineIcon color="success" />
          )}
        </Typography>
        <PrirmaryButton
          label="Change Password"
          onClick={() => navigate("/auth/change-password")}
        />
        {userData.is_verified !== true ? (
          isVerifyLoading ? (
            <CircularProgress />
          ) : (
            <PrirmaryButton
              label="Resend Verification Email"
              onClick={() => resendVerifyEmail(getToken().access)}
            />
          )
        ) : (
          ""
        )}
        <PrirmaryButton label="Logout" onClick={onSubmit} />
      </AuthLayout>
      <AppAlert message={message} />
    </>
  );
}

const HomeWithAuth = withAuth(HomePage);
export default HomeWithAuth;
