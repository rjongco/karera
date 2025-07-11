import { Typography, styled } from "@mui/material";

export const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  [theme.breakpoints.only("md")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.only("sm")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.only("xs")]: {
    fontSize: "12px",
  },
}));
