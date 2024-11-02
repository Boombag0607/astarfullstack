import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif`,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: { fontWeight: 700 },
    body1: { fontWeight: 500 },
  },
});

export default theme;
