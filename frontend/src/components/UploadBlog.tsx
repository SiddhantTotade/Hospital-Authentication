import { useState } from "react";
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  CircularProgress,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

import PrirmaryButton from "./PrimaryButton";
import AppDialog from "./AppDialog";
import InputField from "./Input";
import { useRegisterBlog } from "../hooks/registerBlog";
import { useGetCategoryQuery } from "../services/appApiServices";
import { useAuth } from "../context/AuthContext";
import AppAlert from "./Alerts";

export default function UploadBlog() {
  const {
    handleSubmit,
    isLoading,
    onSubmit,
    control,
    message,
    handleImage,
    handleCategory,
    handleDraft,
    draft,
    category,
  } = useRegisterBlog();
  const { getToken } = useAuth();
  const { data } = useGetCategoryQuery(getToken()["access"]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrirmaryButton onClick={() => setOpen(true)} label="Upload Blog" />
      <AppDialog title="Upload Blog" open={open} onClose={() => setOpen(false)}>
        <FormControl
          component="form"
          fullWidth
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            gap: "10px",
            display: open ? "grid" : "none",
            justifyItems: "start",
            marginTop: "5px",
          }}
        >
          <InputLabel id="blog_category">Select Category</InputLabel>
          <Select
            labelId="blog_category"
            id="demo-multiple-name"
            fullWidth
            value={category}
            onChange={handleCategory}
            input={<OutlinedInput label="Select Category" />}
          >
            {data?.map((category, id) => (
              <MenuItem key={id} value={category}>
                {category.category}
              </MenuItem>
            ))}
          </Select>
          {["Title", "Content", "Summary"].map((field, id) => (
            <InputField
              key={id}
              control={control}
              name={field.toLowerCase()}
              multiline
              rows={field === "Content" || field === "Summary" ? 5 : ""}
              label={field}
              type="text"
            />
          ))}
          <TextField fullWidth type="file" onChange={handleImage} />
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Checkbox onClick={handleDraft} checked={draft} />
            <Typography>Save as Draft</Typography>
          </Box>
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
