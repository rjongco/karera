import { Box, Grid, styled } from "@mui/material";

const GridStyled = styled(Grid)(() => ({
  background:
    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
  height: "100vh",
}));

import loadingLogo from "../../../assets/images/app-logo.png";
import loadingThreeDotNew from "../../../assets/images/loading-three-dot-new-2.gif";

export const MobileLoading = () => {
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
          sx={{ mt: -10 }}
        />
      </Grid>
      <Grid item>
        <Box
          component="img"
          alt="App loading image"
          src={loadingThreeDotNew}
          height={105}
          sx={{ mt: -5 }}
        />
      </Grid>
    </GridStyled>
  );
};
