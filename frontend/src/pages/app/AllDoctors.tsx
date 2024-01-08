import { useEffect, useState } from "react";
import { Card, Box, Typography, TextField } from "@mui/material";

import { useAuth } from "../../context/AuthContext";
import { useGetAllDoctorsQuery } from "../../services/authApiService";
import BookAppointment from "../../components/BookAppointment";
import DoctorSpecilaityFilter from "../../components/DoctorSpecialityFilter";
import PrirmaryButton from "../../components/PrimaryButton";
import { useGoogleCalendar } from "../../hooks/addEventToGoogleCalender";

export function AllDoctors() {
  const { getToken } = useAuth();
  const { data } = useGetAllDoctorsQuery(getToken()["access"]);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const { handleAuthClick, handleSignoutClick, accessToken, expiresIn } =
    useGoogleCalendar();

  const handleSpecialityChange = (speciality) => {
    if (speciality === "All Speciality") {
      setFilteredData(data);
    } else {
      const filteredSpeciality = data?.filter((doc) => {
        doc.speciality.id === speciality;
      });
      setFilteredData(filteredSpeciality);
    }
  };

  const handleSearch = (searchTerm) => {
    const filteredSpeciality = data.filter((doc) =>
      doc.speciality.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredSpeciality);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">All Doctors</Typography>
      <Box sx={{ display: "flex", margin: "auto", width: "80%", gap: "30px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            marginTop: "20px",
            height: "50vh",
            gap: "10px",
          }}
        >
          <DoctorSpecilaityFilter onFilterChange={handleSpecialityChange} />
          <TextField
            label="Search Speciality"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
            value={searchTerm}
            style={{ marginTop: "10px" }}
          />
          <PrirmaryButton
            sx={{ display: !accessToken && !expiresIn ? "block" : "none" }}
            label="Authorize"
            onClick={handleAuthClick}
          />
          <PrirmaryButton
            sx={{ display: !accessToken && !expiresIn ? "none" : "block" }}
            label="Signout"
            onClick={handleSignoutClick}
          />
        </Box>
        <Box sx={{ width: "60%" }}>
          {filteredData?.length !== 0 ? (
            filteredData?.map((user, id) => (
              <Card
                key={id}
                sx={{
                  display: "flex",
                  margin: "auto",
                  marginTop: "20px",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={user.profile_pic}
                    style={{ objectFit: "fill" }}
                    width={100}
                    height={100}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography fontSize={20}>
                    Dr. {user.first_name + " " + user.last_name} (
                    {user.speciality.speciality})
                  </Typography>
                  <Typography fontSize={15}>
                    Timings -{" "}
                    {new Date(
                      "1970-01-01T" + user.from_time + "Z"
                    ).toLocaleTimeString("en-US", {
                      timeZone: "UTC",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(
                      "1970-01-01T" + user.to_time + "Z"
                    ).toLocaleTimeString("en-US", {
                      timeZone: "UTC",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </Typography>
                  <Typography fontSize={15}>Mon - Fri</Typography>
                </Box>
                <Box sx={{ width: "70%", padding: "10px" }}>
                  <BookAppointment docId={user.doctor} />
                </Box>
              </Card>
            ))
          ) : (
            <Typography>Data not found</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
