import { Grid, Typography, styled, Badge, Button, Popper } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { DRAWER_WIDTH } from "../../../constants";

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  //  @ts-ignore
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    //  @ts-ignore
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const PopperStyled = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const ButtonStyled = styled(Button)(() => ({
  border: 0,
  padding: 0,
  margin: 0,
  textAlign: "left",
  width: "100%",
  color: "black",
}));

export const MenuStyled = styled(Grid)(() => ({
  background: "#white",
  border: "1px solid #d3d3d3",
  width: "100%",
  "&:hover": {
    background: "#d3d3d3",
    cursor: "pointer",
  },
}));

export const BadgeStyled = styled(Badge)(() => ({
  background: "white",
  color: "red",
  "&:hover": {
    background: "red",
    color: "white",
  },
}));

export const NameStyled = styled(Typography)(() => ({
  maxWidth: 170,
  overflow: "hidden",
  textOverflow: "ellipsis",
}));
