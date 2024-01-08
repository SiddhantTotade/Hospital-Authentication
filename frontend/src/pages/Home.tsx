import { useSelector } from "react-redux";
import { Typography, Box, Avatar } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";

import PrirmaryButton from "../components/PrimaryButton";
import withAuth from "../hocs/withAuth";
import AppLoader from "../components/Loader";
import { useLogout } from "../hooks/logout";
import { useProfile } from "../hooks/profile";
import UserDataTable from "../components/UserDataTable";
import HomeLayout from "../layouts/HomeLayout";
import UploadBlog from "../components/UploadBlog";
import UploadBlogCategory from "../components/UploadBlogCategory";
import ViewCategory from "../components/ViewCategory";
import UploadDoctorSpeciality from "../components/UploadDoctorSpeciality";
import ViewSpeciality from "../components/ViewSpeciality";
import UploadDoctorDetails from "../components/UploadDoctorDetails";

function HomePage() {
  const { onSubmit, isLoading } = useLogout();
  const userData = useSelector((state) => state["user"]);
  const userType = localStorage.getItem("user_type");
  const navigate = useNavigate();

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
            <Typography>
              {userType === "1"
                ? "Admin Dashboard"
                : userType === "2"
                ? "Doctor Dashboard"
                : "Patient Dashboard"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {userType === "2" ? (
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
            {userType === "2" && <UploadBlog />}
            {userType === "2" && <UploadDoctorDetails />}
            {userType === "1" && <UploadBlogCategory />}
            {userType === "1" && <UploadDoctorSpeciality />}
            {userType === "1" && <ViewCategory />}
            {userType === "1" && <ViewSpeciality />}
            <PrirmaryButton
              label="View Blogs"
              onClick={() => navigate("/app/blogs")}
            />
            {userType === "3" && (
              <PrirmaryButton
                label="Set Appointment"
                onClick={() => navigate("/app/all-doctors")}
              />
            )}
            {(userType === "3" || userType === "2") && (
              <PrirmaryButton
                label="My Appointments"
                onClick={() =>
                  userType === "3"
                    ? navigate("/app/my-appointments/patient")
                    : navigate("/app/my-appointments/doctor")
                }
              />
            )}
            {userType === "2" && (
              <PrirmaryButton
                label="My Blogs"
                onClick={() => navigate("/app/my-blogs")}
              />
            )}
            {userType !== "1" ? (
              ""
            ) : (
              <PrirmaryButton
                label="Doctor Registration Code"
                onClick={() => navigate("/auth/request_code")}
              />
            )}
            <PrirmaryButton label="Logout" onClick={onSubmit} />
          </Box>
        </Box>
      </HomeLayout>
    </>
  );
}

const HomeWithAuth = withAuth(HomePage);
export default HomeWithAuth;
