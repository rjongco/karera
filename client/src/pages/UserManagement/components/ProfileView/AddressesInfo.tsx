import { Grid, Typography } from "@mui/material";
import { isEmptyAddrs } from "../../../../utils/logic";

export const AddressesInfo = (props: any) => {
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
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Permanent Address:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600, ml: 0 }}>
              {values.permanentAddress &&
                `${isEmptyAddrs(values.permanentAddress?.street)} 
                ${isEmptyAddrs(values.permanentAddress?.barangay?.name)} 
                ${isEmptyAddrs(values.permanentAddress?.city?.name)} 
                ${isEmptyAddrs(values.permanentAddress?.province?.name)} 
                ${isEmptyAddrs(values.permanentAddress?.zipCode?.name)}
              `}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          alignContent="center"
        >
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Current Address:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600, ml: 0 }}>
              {values.currentAddress &&
                `${isEmptyAddrs(values.currentAddress?.street)} 
                ${isEmptyAddrs(values.currentAddress?.barangay?.name)} 
                ${isEmptyAddrs(values.currentAddress?.city?.name)} 
                ${isEmptyAddrs(values.currentAddress?.province?.name)} 
                ${isEmptyAddrs(values.currentAddress?.zipCode?.name)}
              `}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
