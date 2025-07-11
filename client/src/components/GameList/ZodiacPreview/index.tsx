import { Box, Grid, Typography, styled, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalProvider";
import { useContext } from "react";
import { ROLES } from "../../../constants";

export const ZodiacPreview = () => {
  const navigate = useNavigate();
  const { auth: userInfo } = useContext(GlobalContext);

  const redirect =
    userInfo?.role === ROLES.MODERATOR.name
      ? `/game/moderator`
      : `/game/player`;

  const GameHeaderIntructionGrid = styled(Grid)(() => ({
    background:
      "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../assets/backgrounds/home-zodiacrace-banner.jpg')",
    width: "100%",
    height: "140px",
    backgroundSize: "cover", // Set the background size to auto width and 50% height
    borderRadius: "5px",
    backgroundPosition: "center center", // Position the background image at the center horizontally and at the bottom vertically
    backgroundRepeat: "no-repeat", // Prevent the background image from repeating
  }));

  const ButtonStyled = styled(Button)(() => ({
    background: `linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)`,
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
      onClick={() => navigate(redirect)}
    >
      <Grid item pl={2}>
        <Box
          sx={{
            background: `url('../assets/backgrounds/zodiac-games-header-intructions.png')`, // Set the background image
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
              Zodiac Race
            </Typography>
          </Grid>
          <Grid item mt={-0.5} mb={1}>
            <Typography fontSize={12} fontWeight={400} color="#FFFFFF">
              Let’s try your luck in this game!
            </Typography>
          </Grid>
          <Grid item pt={1}>
            <ButtonStyled>
              <Typography
                fontSize={12}
                fontWeight={800}
                color="#000000"
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
