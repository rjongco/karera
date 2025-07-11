import { Grid, Box, Typography } from "@mui/material";
import clockIcon from "../../../../assets/images/clock.png";
import bulbIcon from "../../../../assets/images/bulb.png";
import idIcon from "../../../../assets/images/id-icon.png";

export const WelcomeNotif = () => {
  return (
    <Grid item mt={3}>
      <Grid container direction="row" justifyContent="center" gap={4}>
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Box
                component="img"
                alt="Clock Icon"
                width={50}
                src={clockIcon}
                sx={{ mb: 1.4, mt: 1.4 }}
              />
            </Grid>
            <Grid item>
              <Typography
                fontFamily="Baloo"
                textAlign="center"
                fontSize={16}
                fontWeight={600}
              >
                3-5 mins
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Box
                component="img"
                alt="Bulb Icon"
                width={50}
                src={bulbIcon}
                sx={{ mb: 1.6, mt: 1 }}
              />
            </Grid>
            <Grid item>
              <Typography
                fontFamily="Baloo"
                textAlign="center"
                fontSize={16}
                fontWeight={600}
              >
                Good
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Box component="img" alt="Id Icon" width={70} src={idIcon} />
            </Grid>
            <Grid item>
              <Typography
                fontFamily="Baloo"
                textAlign="center"
                fontSize={16}
                fontWeight={600}
              >
                Your ID
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
