import { Grid, Box } from "@mui/material";
import zodiacRaceTopWinners from "../../assets/images/zodiac-race-top-winners.png";
import { TabItemGameTop3 } from "./TabItem";
import { TOP_3_WINNER } from "../../constants/top3WinnerItem";

export const GameTop3 = () => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Box
          component="img"
          src={zodiacRaceTopWinners}
          sx={{ width: "180px", mt: 1 }}
        />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={{
            position: "relative",
            height: "220px",
            width: "320px",
          }}
        >
          {TOP_3_WINNER.map(({ img, name, prize, styles }: any) => (
            <div key={`top3-key-${name}`}>
              <TabItemGameTop3
                styles={{ ...styles }}
                img={img}
                name={name}
                prize={prize}
              />
            </div>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
