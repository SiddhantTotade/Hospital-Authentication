import { useState } from "react";
import { FormControl, CircularProgress } from "@mui/material";

import PrirmaryButton from "./PrimaryButton";
import AppDialog from "./AppDialog";
import InputField from "./Input";
import AppAlert from "./Alerts";
import { useRegisterCategory } from "../hooks/registerCategory";

export default function UploadCategory() {
  const { handleSubmit, isLoading, onSubmit, control, message } =
    useRegisterCategory();
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrirmaryButton onClick={() => setOpen(true)} label="Upload Blog Category" />
      <AppDialog
        title="Upload Blog Category"
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
            name="category"
            label="Category"
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
