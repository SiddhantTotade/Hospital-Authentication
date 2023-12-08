import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export default function ActionContainer({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}
