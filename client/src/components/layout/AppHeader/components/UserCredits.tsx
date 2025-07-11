import { Box, Grid } from "@mui/material";
import coins from "../../../../assets/images/coins.png";

export const UserCredits = (props: any) => {
  const { creditsInfo } = props;

  return (
    <Grid container direction="row" alignItems="center" spacing={{ md: 1 }}>
      <Grid item sx={{ mt: "-2px" }}>
        {creditsInfo?.balance}
      </Grid>
      <Grid item>
        <Box
          component="img"
          sx={{
            width: "25px",
            marginTop: "5px",
          }}
          alt="coins"
          src={coins}
        />
      </Grid>
    </Grid>
  );
};
