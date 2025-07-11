import { Table, TableCell, TableRow, styled } from "@mui/material";

export const TableStyled = styled(Table)({
  border: "1px solid #d3d3d3",
});

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StyledCell = styled(TableCell)(() => ({
  maxWidth: "100px",
  textAlign: "center",
  border: "1px solid #d3d3d3",
}));

export const StyledCellImage = styled(TableCell)(({ theme }) => ({
  maxWidth: "40px",
  textAlign: "center",
  border: "1px solid #d3d3d3",
  [theme.breakpoints.only("xs")]: {
    maxWidth: "70px",
  },
  [theme.breakpoints.only("sm")]: {
    maxWidth: "70px",
  },
  [theme.breakpoints.only("md")]: {
    maxWidth: "70px",
  },
}));

export const StyledCellActions = styled(StyledCell)(({ theme }) => ({
  maxWidth: "65px",
  [theme.breakpoints.only("xl")]: {
    maxWidth: "45px",
  },
  [theme.breakpoints.only("lg")]: {
    maxWidth: "50px",
  },
  [theme.breakpoints.only("md")]: {
    maxWidth: "50px",
  },
}));
