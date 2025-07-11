import { Divider, Drawer, Grid, Typography, styled } from "@mui/material";
import { ProfileAvatar } from "./ProfileAvatar";
import { MyBalance } from "./MyBalance";
import { SidebarMenu } from "./SideBarMenu";
import { Box } from "@mui/system";
import logoutIcon from "../../../../../assets/images/logout-icon.png";
import { useNavigate } from "react-router-dom";
import { GameSideMenu } from "./GameSideMenu";

const drawerWidth = 300;

export const DrawerStyled = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
}));

export const ClientSidebar = (props: any) => {
  const {
    toggleDrawer,
    onToggleSideBar,
    authInfo,
    openGameSideBar,
    onOpenGameSideBar,
  } = props;
  const navigate = useNavigate();

  if (openGameSideBar) {
    return (
      <DrawerStyled
        variant="temporary"
        anchor="left"
        open={openGameSideBar}
        onClose={onOpenGameSideBar}
      >
        <Grid container direction="column">
          <Grid item>
            <ProfileAvatar authInfo={authInfo} />
          </Grid>

          <Grid item mt={1} px={2}>
            <MyBalance authInfo={authInfo} />
          </Grid>

          <Grid item mt={1} px={1}>
            <GameSideMenu onOpenGameSideBar={onOpenGameSideBar} />
          </Grid>
        </Grid>
      </DrawerStyled>
    );
  }

  return (
    <DrawerStyled
      variant="temporary"
      anchor="left"
      open={toggleDrawer}
      onClose={onToggleSideBar}
    >
      <Grid container direction="column">
        <Grid item>
          <ProfileAvatar authInfo={authInfo} />
        </Grid>

        <Grid item mt={1} px={2}>
          <MyBalance authInfo={authInfo} />
        </Grid>

        <Grid item mt={1} px={1}>
          <SidebarMenu authInfo={authInfo} />
        </Grid>

        <Divider variant="middle" sx={{ my: 1 }} />

        <Grid item mt={2} px={3}>
          <Grid
            container
            direction="row"
            alignItems="center"
            onClick={() => navigate("/game/logout")}
          >
            <Grid item>
              <Box
                component="img"
                //  @ts-ignore
                alt={`Sidebar Logout`}
                src={logoutIcon}
                height={25}
              />
            </Grid>
            <Grid item xs ml={1}>
              <Typography fontSize={16}>Sign Out</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DrawerStyled>
  );
};
