import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  //======== theme colors ========
  palette: {
    primary: {
      light: "#68b0bb",
      main: "#4b99a5",
      dark: "#00889d",
      contrastText: "#fff",
    },
    error: {
      main: "#ba1a1a",
    },
  },
  //======== breakpoints ========
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },

  //======== spacing ========
  spacing: 8,

  typography: {
    //======== typography to set h1 font-size ========
    h1: {
      fontSize: "1.75rem",
      "@media (min-width:600px)": {
        fontSize: "2rem",
      },
      "@media (min-width:960px)": {
        fontSize: "2.25rem",
      },
      "@media (min-width:1280px)": {
        fontSize: "2.5rem",
      },
    },
  },
});
export default theme;
