// Based on example:
// https://github.com/mui/material-ui/blob/master/examples/material-next-app-router-ts/
// Accessed 2023-07-26.

import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const theme = createTheme({
  // A purple and green palette from the DUB branding.
  palette: {
    mode: "light",
    primary: {
      main: "#4b2e83",
    },
    secondary: {
      main: "#4cdc31",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,

    // For internal consistency, apply default HTML heading typography.
    // Format of any raw html heading elements will therefore be consistent.
    //
    // https://www.w3schools.com/cssref/css_default_values.php
    h1: {
      fontSize: "2em",
      fontWeight: "bold",
      marginBottom: "0.67em",
      marginTop: "0.67em",
    },
    h2: {
      fontSize: "1.5em",
      fontWeight: "bold",
      marginBottom: "0.83em",
      marginTop: "0.83em",
    },
    h3: {
      fontSize: "1.17em",
      fontWeight: "bold",
      marginBottom: "1.00em",
      marginTop: "1.00em",
    },
    h4: {
      fontSize: "1.0em",
      fontWeight: "bold",
      marginBottom: "1.33em",
      marginTop: "1.33em",
    },
    h5: {
      fontSize: "0.83em",
      fontWeight: "bold",
      marginBottom: "1.67em",
      marginTop: "1.67em",
    },
    h6: {
      fontSize: "0.67em",
      fontWeight: "bold",
      marginBottom: "2.33em",
      marginTop: "2.33em",
    },
  },
});

export default theme;
