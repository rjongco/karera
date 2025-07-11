import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH } from "../../../constants";

//  @ts-ignore
import MuiList from "@mui/material/List";
//  @ts-ignore
import MuiListItemText from "@mui/material/ListItemText";

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    backgroundColor: "#000000",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const List = styled(MuiList)({
  "& .MuiListItemButton-root": {
    paddingTop: 1,
    paddingBottom: 1,
  },
});

export const ListItemText = styled(MuiListItemText)({
  "& .MuiListItemText-primary": {
    color: "#e3e5e6",
  },
});

export const listItemStyles = (openSideBar: boolean) => {
  return {
    paddingTop: "3px",
    paddingBottom: "3px",
    backgroundColor: "transparent",
    color: "white",
    "& .MuiListItemText-primary": {
      fontWeight: "400 !important",
      ml: openSideBar ? "-15px" : 0,
    },
    ":hover": {
      backgroundColor: "#d3d3d3",
      "& .MuiListItemText-primary": {
        color: "black",
      },
      "& .dropDownIcons": {
        color: "black",
      },
      "& .renderIcons": {
        color: "black",
      },
    },
  };
};

export const isActiveListItemStyle = {
  borderLeft: "3px solid #ffffff",
  backgroundColor: "#ffffff",
  "& .MuiListItemText-primary": {
    color: "black",
    fontWeight: "600 !important",
  },
  "& .dropDownIcons": {
    color: "black",
  },
  "& .renderIcons": {
    color: "black",
  },
};
