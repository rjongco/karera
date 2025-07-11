import { Button, Grid, Paper, styled } from "@mui/material";

const PaperHeaderStyled = styled(Paper)(() => ({
  backgroundColor: "#dce9f0",
  paddingLeft: "10px",
  paddingRight: "15px",
  paddingTop: "15px",
  paddingBottom: "10px",
}));

const AddUserButtonStyled = styled(Button)(() => ({
  color: "#ffffff",
  paddingLeft: "13px",
  paddingRight: "15px",
  backgroundColor: "#379f86",
  "&:hover": {
    backgroundColor: "#189174",
  },
}));

const FilterUserButtonStyled = styled(Button)(() => ({
  color: "#ffffff",
  paddingLeft: "13px",
  paddingRight: "15px",
  backgroundColor: "#379f86",
  "&:hover": {
    backgroundColor: "#189174",
  },
}));

const ExportUserButtonStyled = styled(Button)(() => ({
  color: "#ffffff",
  paddingLeft: "13px",
  paddingRight: "15px",
  backgroundColor: "#2196f3",
  "&:hover": {
    backgroundColor: "#2196f3",
  },
}));

const FilterColumnStyled = styled(Grid)(() => ({
  paddingLeft: "10px",
  paddingRight: "15px",
  paddingTop: "15px",
  paddingBottom: "10px",
}));

export { PaperHeaderStyled, AddUserButtonStyled, FilterUserButtonStyled, ExportUserButtonStyled, FilterColumnStyled };
