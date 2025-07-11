import { Drawer, Grid, styled } from "@mui/material";

const drawerWidth = 300;

export const DrawerStyled = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
}));

export const ClientRightSidebar = (props: any) => {
  const { toggleDrawer, onToggleSideBar } = props;
  return (
    <DrawerStyled
      variant="temporary"
      anchor="right"
      open={toggleDrawer}
      onClose={onToggleSideBar}
    >
      <Grid container direction="column">
        <Grid item>Logo</Grid>

        <Grid item mt={1} px={2}>
          Games Banners
        </Grid>

        <Grid item mt={1} px={2}>
          Menu
        </Grid>

        <Grid item mt={1} px={2}>
          Langauge
        </Grid>

        <Grid item mt={1} px={2}>
          Logout
        </Grid>
      </Grid>
    </DrawerStyled>
  );
};
