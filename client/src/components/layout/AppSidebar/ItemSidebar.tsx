import { useContext, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import MuiList from "@mui/material/List";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalProvider";
import { useNavigate } from "react-router-dom";

import { findIndex, includes } from "lodash";

interface ISidebarItemProps {
  label: String;
  items: string[];
  link: string;
  icon: any;
  onItemClick: () => void;
  sideBarName: string;
  open: Boolean;
}

const ItemSidebar: React.FC<ISidebarItemProps> = (props) => {
  const navigate = useNavigate();
  const {
    label,
    items,
    link,
    icon: IconComponent,
    onItemClick,
    sideBarName: sideBarName0,
    open,
  } = props;

  //  @ts-ignore
  const { openSideBar, setSidebarItems, sidebarItems } =
    useContext(GlobalContext);
  const searchIndex = findIndex(sidebarItems, (item: any) => {
    return item.label === sideBarName0;
  });
  const active = sidebarItems[searchIndex]?.active;

  const ListItemText = styled(MuiListItemText)({
    "& .MuiListItemText-primary": {
      color: active ? "black" : "#e3e5e6",
    },
  });

  const listItemStyles = {
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

  //  @ts-ignore
  const LightTooltip = styled(({ className, ...props }) => (
    //  @ts-ignore
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 16,
      marginLeft: 0,
      fontWeight: 600,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "white",
    },
  }));

  const [openItemsSub, setOpenItemsSub] = useState([0]);

  //  @ts-ignore
  const handleSetActiveSidebar = (e, columnName, link) => {
    e.preventDefault();
    setSidebarItems(columnName);
    if (link) {
      navigate(`${link}`);
    }
  };

  const List = styled(MuiList)({
    "& .MuiListItemButton-root": {
      paddingTop: 1,
      paddingBottom: 1,
    },
  });

  const isActiveListItemStyle = {
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

  return (
    //  @ts-ignore
    <div key={label}>
      <LightTooltip
        disableHoverListener={openSideBar}
        //  @ts-ignore
        key={label}
        title={label}
        placement="right"
        arrow
      >
        {/* @ts-ignore */}
        <List component="div" disablePadding>
          <ListItem
            sx={[listItemStyles, active && isActiveListItemStyle]}
            //  @ts-ignore
            component={Link}
            //  @ts-ignore
            onClick={(e) => handleSetActiveSidebar(e, sideBarName0, link)}
            className="firstSideBar"
            // sx={[listItemStyles, { pl: openSideBar ? 2 : 3 }]}
          >
            <ListItemIcon>
              <IconComponent className="renderIcons" sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={label} />
            {items &&
              (open ? (
                <ExpandLess className="dropDownIcons" sx={{ color: "white" }} />
              ) : (
                <ExpandMore className="dropDownIcons" sx={{ color: "white" }} />
              ))}
          </ListItem>
        </List>
      </LightTooltip>
    </div>
  );
};

export default ItemSidebar;
