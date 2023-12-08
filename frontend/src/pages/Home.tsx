import { useSelector } from "react-redux";
import { CircularProgress, Typography, Box, Avatar } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import PrirmaryButton from "../components/PrimaryButton";
import withAuth from "../hocs/withAuth";
import AppLoader from "../components/Loader";
import { useLogout } from "../hooks/logout";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../hooks/profile";
import { useResendVerificationEmail } from "../hooks/resendVerificationEmail";
import AppAlert from "../components/Alerts";
import UserDataTable from "../components/UserDataTable";
import HomeLayout from "../layouts/HomeLayout";

function HomePage() {
  const { getToken } = useAuth();
  const { onSubmit, isLoading } = useLogout();
  const { isVerifyLoading, message, resendVerifyEmail } =
    useResendVerificationEmail();
  const userData = useSelector((state) => state.user);

  useProfile();

  return (
    <>
      {isLoading && <AppLoader />}
      <HomeLayout>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <UserDataTable />
          <Box
            sx={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {userData.user_type === 2 ? (
                <Typography>
                  Welcome, Dr. {userData.first_name + " " + userData.last_name}
                </Typography>
              ) : (
                <Typography>
                  Welcome, {userData.first_name + " " + userData.last_name}
                </Typography>
              )}
              <Avatar src={userData.profile_pic} />
            </Box>
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
          </Box>
        </Box>
      </HomeLayout>
      <AppAlert message={message} />
    </>
  );
}

const HomeWithAuth = withAuth(HomePage);
export default HomeWithAuth;
