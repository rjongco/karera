import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
      // @ts-ignore
      offwhite: "#F5F5F5",
    },
    secondary: {
      light: "#52a6e3",
      main: "#1986d4",
      dark: "#07273d",
    },
    accent: {
      main: "#62B1D2",
      secondary: "#379F86",
      tertiary: "#398E0C",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif", "Baloo"].join(","),
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#ff0000",
        },
      },
    },
    MuiTableContainer: {
      //  @ts-ignore
      paddingLeft: 4,
      paddingRight: 4,
      width: "100%",
      padding: 1,
      margin: "auto",
      "&::-webkit-scrollbar": { width: 20 },
      "&::-webkit-scrollbar-track": { backgroundColor: "#CFD8DC" },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#90A4AE",
        borderRadius: 2,
      },
    },
  },
});

export const responsiveTheme = responsiveFontSizes(theme);
