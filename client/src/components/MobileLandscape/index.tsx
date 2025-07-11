import { Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import rotate from "../../assets/images/rotate.png";

const MainContainerLandScape = styled(Grid)(() => ({
  display: "none",
  "@media (max-width: 800px) and (min-aspect-ratio: 13/9)": {
    background: "url('../assets/backgrounds/login-bg.png')",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const MobileLandscape = () => {
  return (
    <MainContainerLandScape>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Box
            component="img"
            alt="Rotate Icon"
            src={rotate}
            height={75}
            sx={{ mb: 4 }}
          />
        </Grid>
        <Grid item>
          <Typography color="#FFFFFF" variant="subtitle1">
            Oh no! We can't fit everything on your screen. Please rotate your
            device.
          </Typography>
        </Grid>
      </Grid>
    </MainContainerLandScape>
  );
};
