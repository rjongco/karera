import { Grid, Typography } from "@mui/material";
import zodiacRaceWinningBall from "../../assets/images/zodiac-race-winning-ball.png";
import zodiacRaceWinningBallframe from "../../assets/images/zodiac-race-winning-ball-frame.png";
import zodiacRaceCapricornLogo from "../../assets/images/zodiac-race-capricorn-logo.png";

import { Box } from "@mui/system";
import { GlobalContext } from "../../context/GlobalProvider";
import { useContext } from "react";
import { ZODIACS_IMAGES } from "../../constants/zodiacsMenu";

export const GameWinningBall = (props: any) => {
  const { gameWinners } = props;
  console.log(gameWinners);
  // @ts-ignore
  // const { top4Winners } = useContext(GlobalContext) || {};
  const winner = gameWinners && gameWinners[0];
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ width: "150px" }}
      ml={1}
    >
      <Grid item>
        <Box component="img" width={150} src={zodiacRaceWinningBall} />
      </Grid>
      <Grid item sx={{ position: "relative" }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          sx={{ width: "150px", position: "relative", marginTop: "-20px" }}
        >
          <Grid item>
            <Box
              component="img"
              width={130}
              // @ts-ignore
              src={ZODIACS_IMAGES[winner] || zodiacRaceCapricornLogo}
            />
          </Grid>
          <Grid item sx={{ position: "absolute", top: -7, left: -3 }}>
            <Box component="img" width={150} src={zodiacRaceWinningBallframe} />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item mt={1}>
        <Grid
          container
          direction="column"
          px={2}
          py={1}
          sx={{
            backgroundColor: "#4F2787D9",
            borderRadius: "35px",
            border: "4px solid #FFE400",
          }}
        >
          <Typography fontSize={18} fontWeight={600} color="#FFFFFF">
            CAPRICORN
          </Typography>
        </Grid>
      </Grid> */}
    </Grid>
  );
};
