import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: (t) =>
          t.palette.mode === "dark"
            ? `radial-gradient(1200px 700px at 20% 0%, rgba(124,58,237,0.25), transparent 50%),
               radial-gradient(900px 500px at 90% 10%, rgba(59,130,246,0.18), transparent 55%),
               ${t.palette.background.default}`
            : t.palette.background.default,
      }}
    >
      <Outlet />
    </Box>
  );
}
