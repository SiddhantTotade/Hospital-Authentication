import { useState } from "react";
import { TextFieldProps } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { TextField } from "@mui/material";
import Adornment from "./Adornment";

interface InputProps<T extends FieldValues = FieldValues>
  extends Omit<TextFieldProps, "variant"> {
  name: string;
  label: string;
  type: string;
  error?: boolean;
  control: import("react-hook-form").Control<T>;
}

export default function InputField({
  name,
  control,
  label,
  type,
  color,
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
          color={color}
          {...otherProps}
        />
      )}
    />
  );
}
