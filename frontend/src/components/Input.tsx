import { useState, InputHTMLAttributes } from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import Adornment from "./Adornment";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: string;
  error?: boolean;
  control: any;
}

export default function InputField({
  name,
  control,
  label,
  type,
  ...otherProps
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value = "" }, fieldState: { error } }) => (
        <TextField
          InputProps={
            type === "password"
              ? {
                  endAdornment: (
                    <Adornment
                      showPassword={showPassword}
                      handleShowPassword={handleShowPassword}
                    />
                  ),
                }
              : undefined
          }
          fullWidth
          variant="outlined"
          label={label}
          type={showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          {...otherProps}
        />
      )}
    />
  );
}
