import { Box, Grid, Typography, styled, Button } from "@mui/material";

export const LagLagPreview = () => {
  const GameHeaderIntructionGrid = styled(Grid)(() => ({
    background:
      "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../assets/backgrounds/laglag-banner.png')",
    width: "100%",
    height: "140px",
    backgroundSize: "cover", // Set the background size to auto width and 50% height
    borderRadius: "5px",
    backgroundPosition: "center center", // Position the background image at the center horizontally and at the bottom vertically
    backgroundRepeat: "no-repeat", // Prevent the background image from repeating
  }));

  const ButtonStyled = styled(Button)(() => ({
    background: `linear-gradient(180deg, hsla(185, 80%, 51%, 1) 0%, hsla(205, 92%, 62%, 1) 100%)`,
    borderRadius: "35px",
    boxShadow: "none",
    border: "2px solid #FFFFFF",
  }));

  return (
    <GameHeaderIntructionGrid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={2}
    >
      <Grid item pl={2}>
        <Box
          sx={{
            background: `url('../assets/backgrounds/laglag-logo-preview.png')`, // Set the background image
            border: "2px solid #FFEA00",
            backgroundSize: "cover", // Set the background size to auto width and 50% height
            borderRadius: "25px",
            backgroundPosition: "center center", // Position the background image at the center horizontally and at the bottom vertically
            width: "100px",
            height: "100px",
          }}
        />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Grid item>
            <Typography mt={-1} fontSize={18} fontWeight={700} color="#FFFFFF">
              Lag-lag
            </Typography>
          </Grid>
          <Grid item mt={-0.5} mb={1}>
            <Typography fontSize={12} fontWeight={400} color="#FFFFFF">
              Try this exciting game and win!
            </Typography>
          </Grid>
          <Grid item pt={1}>
            <ButtonStyled>
              <Typography
                fontSize={12}
                fontWeight={800}
                color="#FFFFFF"
                px={2}
                py="5px"
              >
                ₱10 TO PLAY!
              </Typography>
            </ButtonStyled>
          </Grid>
        </Grid>
      </Grid>
    </GameHeaderIntructionGrid>
  );
};
