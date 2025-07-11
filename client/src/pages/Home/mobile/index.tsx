import { Grid, Typography } from "@mui/material";

import { GameVideo } from "../../../components/GameVideo";

import { GameAnnouncement } from "../../../components/GameAnnouncement";
import { GameLiveBetting } from "../../../components/GameLiveBetting";
import { GameLatestRecord } from "../../../components/GameLatestRecord";
import { GameMenu } from "../../../components/GameMenu";
import { GamesAssets } from "../../../components/GamesAssets";
import { GameCarousel } from "../../../components/GameCarousel";

export const MobileHome = () => {
  return (
    <>
      <Grid container direction="column" justifyContent="center">
        <Grid item mx={2} mt={1}>
          <GameCarousel />
        </Grid>
        <Grid item mx={2} mt={1}>
          <GameLiveBetting />
        </Grid>
        <Grid item mx={1} mt={1.5}>
          <GamesAssets />
        </Grid>
        <Grid item mx={2} mt={1.5}>
          <GameAnnouncement
            content={
              <Typography fontSize={9} fontWeight={400} color="#FFFFFF">
                04/23/2024 19:13:31 kareralive4c49nh win{" "}
                <span style={{ color: "#FFE400" }}>₱16430</span> in Zodiac Race
              </Typography>
            }
          />
        </Grid>
        <Grid item mx={2} mt={1.5}>
          <GameVideo styles={{ position: "relative", height: "300px" }} />
        </Grid>
        <Grid item mx={2} mt={2}>
          <GameMenu />
        </Grid>
        <Grid item mx={2} py={1}>
          <GameLiveBetting />
        </Grid>
        <Grid item mx={2} py={1}>
          <GameLatestRecord />
        </Grid>
      </Grid>
    </>
  );
};
