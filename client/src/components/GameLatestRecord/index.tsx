import { Box, Grid, Typography, styled, Button } from "@mui/material";

const GameLatestRecordGrid = styled(Grid)(() => ({
  background: "url('../assets/backgrounds/login-bg.png')",
  backgroundSize: "cover", // Set the background size to auto width and 50% height
  width: "100%",
  height: "400px",
}));

const BetButton = styled(Grid)(() => ({
  border: "0",
  background:
    "linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)",
  color: "#FFFFFF",
  borderRadius: "15px",
  boxShadow: "2px 2px 2px #4f4e4e",
}));

const WinButton = styled(Grid)(() => ({
  border: "0",

  background:
    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
  color: "#FFFFFF",
  borderRadius: "15px",
  boxShadow: "2px 2px 2px #4f4e4e",
}));

import trophyIcon from "../../assets/images/trophy-icon.png";

export const GameLatestRecord = () => {
  const renderHeader = () => {
    return (
      <Grid container direction="row" alignItems="center" mt={0.5}>
        <Grid item>
          <Box
            component="img"
            //  @ts-ignore
            alt="Trophy Icon"
            src={trophyIcon}
            height={25}
            sx={{ mb: -0.5 }}
          />
        </Grid>
        <Grid item ml="3px">
          <Typography fontSize={12} color="#FFF" fontWeight={600}>
            Latest
          </Typography>
        </Grid>
        <Grid item ml={1} sx={{ px: 0 }}>
          <BetButton
            onClick={() => {}}
            sx={{
              px: 2,
              mx: 0,
              py: "2px",
            }}
          >
            <Typography
              fontSize={10}
              color="#FFF"
              fontWeight={600}
              sx={{ px: 0 }}
            >
              Bet
            </Typography>
          </BetButton>
        </Grid>
        <Grid item ml={1}>
          <WinButton onClick={() => {}} sx={{ px: 2, py: "2px" }}>
            <Typography fontSize={10} color="#FFF" fontWeight={600}>
              Win
            </Typography>
          </WinButton>
        </Grid>
      </Grid>
    );
  };

  const renderBody = () => {
    return (
      <Grid container direction="column">
        <Grid item>table</Grid>
      </Grid>
    );
  };
  return (
    <GameLatestRecordGrid
      container
      direction="column"
      justifyContent="center"
      p={1}
    >
      <Grid item>{renderHeader()}</Grid>
      <Grid item mt={1} ml={1}>
        {renderBody()}
      </Grid>
    </GameLatestRecordGrid>
  );
};
