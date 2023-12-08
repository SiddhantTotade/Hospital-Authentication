import { Button, ButtonProps } from "@mui/material";

interface ButtonTypes extends ButtonProps {
  label: string;
}

export default function PrirmaryButton({
  label,
  type,
  ...otherProps
}: ButtonTypes) {
  return (
    <Button
      variant="contained"
      type={type || "submit"}
      {...otherProps}
      fullWidth
    >
      {label}
    </Button>
  );
}
