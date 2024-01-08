import { useState } from "react";
import { FormControl, CircularProgress } from "@mui/material";

import PrirmaryButton from "./PrimaryButton";
import AppDialog from "./AppDialog";
import InputField from "./Input";
import AppAlert from "./Alerts";
import { useUploadDoctorSpeciality } from "../hooks/registerSpeciality";

export default function UploadDoctorSpeciality() {
  const { handleSubmit, isLoading, onSubmit, control, message } =
    useUploadDoctorSpeciality();
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrirmaryButton
        onClick={() => setOpen(true)}
        label="Upload Doctor Speciality"
      />
      <AppDialog
        title="Upload Doctor Speciality"
        open={open}
        onClose={() => setOpen(false)}
      >
        <FormControl
          component="form"
          fullWidth
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            gap: "10px",
            display: open ? "grid" : "none",
            justifyItems: "center",
            marginTop: "5px",
          }}
        >
          <InputField
            control={control}
            name="speciality"
            label="Speciality"
            type="text"
          />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <PrirmaryButton type="submit" label="Upload" />
          )}
        </FormControl>
      </AppDialog>
      <AppAlert message={message} />
    </>
  );
}
