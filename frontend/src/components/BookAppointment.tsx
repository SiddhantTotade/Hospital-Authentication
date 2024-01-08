import { useState } from "react";
import { FormControl, CircularProgress, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import PrirmaryButton from "./PrimaryButton";
import AppDialog from "./AppDialog";
import AppAlert from "./Alerts";
import { useRegisterAppointment } from "../hooks/registerAppointment";
import { DatePicker } from "@mui/x-date-pickers";

export default function BookAppointment({ docId }: any) {
  const { isLoading, onSubmit, message, handleDate, date } =
    useRegisterAppointment();
  const [open, setOpen] = useState(false);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PrirmaryButton
          onClick={() => setOpen(true)}
          label="Book Appointment"
        />
        <AppDialog
          title="Book Appointment"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <FormControl
              component="form"
              fullWidth
              onSubmit={(e) => onSubmit({ e, docId })}
              sx={{
                gap: "10px",
                display: open ? "grid" : "none",
                justifyItems: "start",
                marginTop: "5px",
              }}
            >
              <DatePicker
                format="YYYY-MM-DD"
                value={date}
                onChange={handleDate}
                sx={{ width: "100%" }}
              />
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Box sx={{ width: "100%", gap: "10px", display: "flex" }}>
                  <PrirmaryButton type="submit" label="Confirm" />
                </Box>
              )}
            </FormControl>
          </Box>
        </AppDialog>
        <AppAlert message={message} />
      </LocalizationProvider>
    </>
  );
}
