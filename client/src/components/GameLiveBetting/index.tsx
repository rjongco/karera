import { Box, Grid, Typography, styled } from "@mui/material";
import homeLatestIcon from "../../assets/images/home-latest-icon.png";

export const GameLiveBetting = () => {
  const LiveBettingGamesTab = styled(Grid)(() => ({
    background:
      "linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)",
    borderRadius: "5px",
  }));

  return (
    <LiveBettingGamesTab
      container
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      px={1}
      py="5px"
    >
      <Grid item pr={"5px"}>
        <Box
          component="img"
          alt="Home Menu Footer"
          src={homeLatestIcon}
          width={20}
          sx={{ borderRadius: "5px", boxShadow: 0 }}
        />
      </Grid>
      <Grid item>
        <Typography fontSize={12} fontWeight={700}>
          Live Betting Games
        </Typography>
      </Grid>
    </LiveBettingGamesTab>
  );
};
