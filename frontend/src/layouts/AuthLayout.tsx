import { Card, Typography } from "@mui/material";

interface AuthLayoutProps {
  children?: any;
  title?: string;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <Card
      sx={{
        width: "25%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        display: "grid",
        justifyItems: "center",
        padding: "10px",
        gap: "20px",
        "@media(max-width:900px)": {
          width: "45%",
        },
        "@media(max-width:700px)": {
          width: "55%",
        },
        "@media(max-width:500px)": {
          width: "85%",
        },
      }}
    >
      <Typography fontSize={20}>Hospital Authentication System</Typography>
      <Typography fontSize={17}>{title}</Typography>
      {children}
    </Card>
  );
}
