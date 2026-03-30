import { createTheme, type ThemeOptions } from "@mui/material/styles";

const shared: ThemeOptions = {
  typography: {
    fontFamily: [
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    fontWeightBold: 700,
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700, letterSpacing: "-0.01em" },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600, fontSize: "0.8125rem" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { borderRadius: 16, backgroundImage: "none" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10, padding: "8px 20px" },
        sizeSmall: { padding: "6px 14px", fontSize: "0.8125rem" },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small", variant: "outlined" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { borderRight: "none" },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 10, marginInline: 8 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 600 },
      },
    },
  },
};

export function buildTheme(mode: "light" | "dark") {
  return createTheme({
    ...shared,
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: { main: "#7c3aed" },
            secondary: { main: "#3b82f6" },
            background: {
              default: "#0b0f19",
              paper: "#111827",
            },
            divider: "rgba(255,255,255,0.08)",
          }
        : {
            primary: { main: "#7c3aed" },
            secondary: { main: "#3b82f6" },
            background: {
              default: "#f7f7fb",
              paper: "#ffffff",
            },
            divider: "rgba(0,0,0,0.08)",
          }),
    },
  });
}

export const darkTheme = buildTheme("dark");
export const lightTheme = buildTheme("light");
