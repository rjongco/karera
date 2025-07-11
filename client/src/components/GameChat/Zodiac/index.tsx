import { Grid, Typography } from "@mui/material";

export const GameChat = () => {
  return (
    <Grid container direction="column" sx={{ width: "200px", height: "80px" }}>
      <Grid item>
        <Grid container direction="row" justifyContent="flex-start" py="3px">
          <Grid item ml={2}>
            <Typography fontSize={9} fontWeight={700} color="#FFE400">
              itsme123:
            </Typography>
          </Grid>
          <Grid item ml={1}>
            <Typography fontSize={9} fontWeight={700} color="#FFFFFF">
              Sana manalo!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" justifyContent="flex-start" py="3px">
          <Grid item ml={2}>
            <Typography fontSize={9} fontWeight={700} color="#FFE400">
              omega4409:
            </Typography>
          </Grid>
          <Grid item ml={1}>
            <Typography fontSize={9} fontWeight={700} color="#FFFFFF">
              Sagittarius naman next oh!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" justifyContent="flex-start" py="3px">
          <Grid item ml={2}>
            <Typography fontSize={9} fontWeight={700} color="#FFE400">
              probinsyano17:
            </Typography>
          </Grid>
          <Grid item ml={1}>
            <Typography fontSize={9} fontWeight={700} color="#FFFFFF">
              Aries for the win!!!!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" justifyContent="flex-start" py="3px">
          <Grid item ml={2}>
            <Typography fontSize={9} fontWeight={700} color="#FFE400">
              bat@ngtondo_13:
            </Typography>
          </Grid>
          <Grid item ml={1}>
            <Typography fontSize={9} fontWeight={700} color="#FFFFFF">
              Sarap manalo dito.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
