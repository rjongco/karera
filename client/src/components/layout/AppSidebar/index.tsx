import { useContext } from "react";
import { Drawer } from "./styles";
import { Toolbar, IconButton, Box, List } from "@mui/material";
import { GlobalContext } from "../../../context/GlobalProvider";
import companyLogo from "../../../assets/images/logo-text-white.png";
import ListSidebar from "./ListSidebar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

interface IAppSidebarProps {}

//  @ts-ignore
const AppSidebar: React.FC<IAppSidebarProps> = () => {
  //  @ts-ignore
  const { openSideBar: open } = useContext(GlobalContext);

  return (
    <Drawer variant="permanent" open={open} sx={{ height: "100vh" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        <Box
          component="img"
          sx={{
            ml: 7,
            mt: 0.5,
            width: "50%",
            display: { xs: "none", md: "block" },
          }}
          alt="Yamaha Logo"
          src={companyLogo}
        />
      </Toolbar>
      <List
        component="nav"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          px: [1],
        }}
      ></List>
      <List component="nav">
        <ListSidebar />
      </List>
    </Drawer>
  );
};

export default AppSidebar;
