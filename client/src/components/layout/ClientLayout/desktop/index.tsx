import { Box, Grid, Typography, styled } from "@mui/material";

const GridStyled = styled(Grid)(() => ({
  background:
    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
  height: "100vh",
}));

import loadingLogo from "../../../../assets/images/app-logo.png";

export const DesktopClientLayout = () => {
  return (
    <GridStyled
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={[5]}
    >
      <Grid item>
        <Box
          component="img"
          alt="App logo image"
          src={loadingLogo}
          height={105}
          sx={{}}
        />
      </Grid>
      <Grid item sx={{ p: 4 }}>
        <Typography color="#fff" textAlign="center">
          Home Page is only for mobile version. Change the size of your browser
          to mobile mode, then refresh the page
        </Typography>
      </Grid>
    </GridStyled>
  );
};
