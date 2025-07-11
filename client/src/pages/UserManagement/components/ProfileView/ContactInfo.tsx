import { Grid, Typography } from "@mui/material";
import { removePlusSixThree } from "../../../../utils/logic";

export const ContactInfo = (props: any) => {
  const { values } = props;
  return (
    <Grid container direction="column" sx={{ mt: 1 }}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          sx={{ pb: "5px" }}
          alignContent="center"
        >
          <Grid item sx={{ width: "120px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Mobile:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {removePlusSixThree(values?.mobile)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          sx={{ pb: "5px" }}
          alignContent="center"
        >
          <Grid item sx={{ width: "120px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Email:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {values?.email}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
