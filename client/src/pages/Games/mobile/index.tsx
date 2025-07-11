import { Grid, Typography } from "@mui/material";
import { GameAnnouncement } from "../../../components/GameAnnouncement";
import { GameVideo } from "../../../components/GameVideo";
import { GameMenu } from "../../../components/GameMenu";
import { GameLiveBetting } from "../../../components/GameLiveBetting";
import { ZodiacPreview } from "../../../components/GameList/ZodiacPreview";
import { LagLagPreview } from "../../../components/GameList/LagLagPreview";

export const MobileGames = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container direction="column">
          <Grid item mx={2} mt={1.5}>
            <GameAnnouncement
              content={
                <Typography fontSize={9} fontWeight={400} color="#FFFFFF">
                  04/23/2024 19:13:31 kareralive4c49nh win{" "}
                  <span style={{ color: "#FFE400" }}>₱16430</span> in Zodiac
                  Race
                </Typography>
              }
            />
          </Grid>
          <Grid item mx={2} mt={0.5}>
            <GameVideo styles={{ position: "relative", height: "300px" }} />
          </Grid>
          <Grid item mx={2} mt={2}>
            <GameMenu />
          </Grid>
          <Grid item mx={2}>
            <GameLiveBetting />
          </Grid>
          <Grid item mx={2} mt={1.5}>
            <ZodiacPreview />
          </Grid>
          <Grid item mx={2} mt={1.5} mb={4}>
            <LagLagPreview />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
