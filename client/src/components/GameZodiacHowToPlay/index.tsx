import { Box, Grid, Typography, styled } from "@mui/material";
import flagLeftHowToPlayContainer from "../../assets/images/flag-left-how-to-play-container.png";

export const GameZodiacHowToPlay = () => {
  const HowToPlayGrid = styled(Grid)(() => ({
    background: "url('../assets/backgrounds/login-bg.png')",
    backgroundSize: "cover", // Set the background size to auto width and 50% height
    width: "100%",
    height: "200px",
  }));

  const HowToPlayContainer = styled(Grid)(() => ({
    background: `linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)`,
    borderRadius: "35px",
    boxShadow: "none",
    border: "2px solid #FFFFFF",
    position: "absolute",
    top: -10,
  }));

  return (
    <HowToPlayGrid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Grid
          container
          sx={{
            position: "relative",
            width: "300px",
            height: "100px",
            border: "1px solid black",
          }}
        >
          <Grid item>
            <HowToPlayContainer
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs>
                <Box
                  component="img"
                  alt="Flag left how to play container"
                  src={flagLeftHowToPlayContainer}
                  width={50}
                  sx={{ position: "absolute", top: 0, left: -10 }}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  fontSize={15}
                  fontWeight={700}
                  textAlign="center"
                  color="#000000"
                >
                  How to Play?
                </Typography>
              </Grid>
              <Grid item xs></Grid>
            </HowToPlayContainer>
          </Grid>
        </Grid>
      </Grid>
    </HowToPlayGrid>
  );
};
