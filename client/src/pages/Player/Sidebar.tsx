import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { sidebarStore } from "./SidebarStore";

export default function Sidebar() {
  const { openSidebar, setOpenSidebar, setOpenLoad } = sidebarStore();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    // setOpenLoad(newOpen);
    setOpenSidebar(newOpen);
  };

  const openMenu = (text) => () => {
    if (text === "Load") {
      setOpenLoad(true);
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Load", "Withdraw"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={openMenu(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {/* <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
      >
        <MenuIcon />
      </IconButton> */}

      <Drawer open={openSidebar} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <LoadDialog />
    </div>
  );
}
