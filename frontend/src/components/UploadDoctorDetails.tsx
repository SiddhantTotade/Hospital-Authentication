import { useState } from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import OutlinedInput from "@mui/material/OutlinedInput";

import PrirmaryButton from "./PrimaryButton";
import AppDialog from "./AppDialog";
import { useGetSpecialityQuery } from "../services/authApiService";
import { useAuth } from "../context/AuthContext";
import AppAlert from "./Alerts";
import { useUploadDoctorDetails } from "../hooks/uploadDoctorDetails";

export default function UploadDoctorDetails() {
  const {
    isLoading,
    onSubmit,
    message,
    handleSpeciality,
    handleFromTime,
    handleToTime,
    speciality,
    fromValue,
    toValue,
  } = useUploadDoctorDetails();
  const { getToken } = useAuth();
  const { data } = useGetSpecialityQuery(getToken()["access"]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PrirmaryButton
          onClick={() => setOpen(true)}
          label="Upload Doctor Details"
        />
        <AppDialog
          title="Upload Doctor Details"
          open={open}
          onClose={() => setOpen(false)}
        >
          <FormControl
            component="form"
            fullWidth
            onSubmit={(e) => onSubmit(e)}
            sx={{
              gap: "10px",
              display: open ? "grid" : "none",
              justifyItems: "start",
              marginTop: "5px",
            }}
          >
            <InputLabel id="doctor_speciality">Select Speciality</InputLabel>
            <Select
              labelId="doctor_speciality"
              id="demo-multiple-name"
              fullWidth
              value={speciality}
              onChange={handleSpeciality}
              input={<OutlinedInput label="Select Category" />}
            >
              {data?.map((speciality, id) => (
                <MenuItem key={id} value={speciality}>
                  {speciality.speciality}
                </MenuItem>
              ))}
            </Select>
            <TimeField
              label="From time"
              value={fromValue}
              fullWidth
              onChange={handleFromTime}
              format="HH:mm"
            />
            <TimeField
              label="To time"
              value={toValue}
              fullWidth
              onChange={handleToTime}
              format="HH:mm"
            />
            {isLoading ? (
              <CircularProgress />
            ) : (
              <PrirmaryButton type="submit" label="Upload" />
            )}
          </FormControl>
        </AppDialog>
        <AppAlert message={message} />
      </LocalizationProvider>
    </>
  );
}
