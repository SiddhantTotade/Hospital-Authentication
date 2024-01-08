import { Card, Box, Typography } from "@mui/material";

import { useAuth } from "../context/AuthContext";
import { useGetAppointmentsQuery } from "../services/appointmentApiServices";

export function ViewAppointmentsDoctor() {
  const { getToken } = useAuth();
  const { data } = useGetAppointmentsQuery(getToken()["access"]);

  const appointmentsByDate = {};

  if (data) {
    data.forEach((user) => {
      const date = user.date_of_appointment;

      if (!appointmentsByDate[date]) {
        appointmentsByDate[date] = [];
      }

      appointmentsByDate[date].push(user);
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">All Appointments Doctor</Typography>
      <Box sx={{ display: "flex", margin: "auto", width: "40%", gap: "30px" }}>
        <Box sx={{ width: "70%" }}>
          {Object.keys(appointmentsByDate).length !== 0 ? (
            Object.keys(appointmentsByDate).map((date, index) => (
              <div key={index}>
                <Typography variant="h6" sx={{ marginTop: "20px" }}>
                  {new Date(date).toDateString()}
                </Typography>
                {appointmentsByDate[date].map((user, id) => (
                  <Card
                    key={id}
                    sx={{
                      display: "flex",
                      margin: "auto",
                      marginTop: "20px",
                      alignItems: "center",
                      height: "10vh",
                      gap: "10px",
                      padding: "10px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography fontSize={20}>{user.patient_name}</Typography>
                      <Typography fontSize={15}>
                        Timings -{" "}
                        {new Date(
                          "1970-01-01T" + user.start_time + "Z"
                        ).toLocaleTimeString("en-US", {
                          timeZone: "UTC",
                          hour12: true,
                          hour: "numeric",
                          minute: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(
                          "1970-01-01T" + user.end_time + "Z"
                        ).toLocaleTimeString("en-US", {
                          timeZone: "UTC",
                          hour12: true,
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </div>
            ))
          ) : (
            <Typography>Data not found</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
