import { Box, Chip, Grid, Typography } from "@mui/material";

export const ChipStatus = (props: any) => {
  const { icon, label, color, bgColor, borderColor } = props;
  return (
    <Chip
      label={
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item mr="5px">
            <Box component="img" src={icon} sx={{ mt: "3px", width: "10px" }} />
          </Grid>
          <Grid item pt="2px">
            <Typography fontSize={10} color={color} fontWeight="400">
              {label}
            </Typography>
          </Grid>
        </Grid>
      }
      size="small"
      sx={{ border: `1px solid ${borderColor}`, backgroundColor: `${bgColor}` }}
    />
  );
};
//#FF2020
