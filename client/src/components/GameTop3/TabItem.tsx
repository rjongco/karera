import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const TabItemGameTop3 = (props: any) => {
  const { styles, img, name, prize } = props;
  return (
    <Grid
      item
      sx={{
        position: "absolute",
        right: 0,
        zIndex: 100,
        left: -5,
        ...styles,
      }}
    >
      <Box
        component="img"
        src={img}
        sx={{ width: "340px", position: "relative", mt: "10px" }}
      />
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
        sx={{
          position: "absolute",
          width: "150px",
          top: 60,
          left: 120,
        }}
      >
        <Grid item>
          <Typography
            fontWeight={400}
            fontFamily="Baloo"
            fontSize={11}
            color="#FFFFFF"
          >
            {name}
          </Typography>
        </Grid>
        <Grid item mt="-3px">
          <Typography
            fontWeight={600}
            fontFamily="Baloo"
            fontSize={20}
            color="#FFFFFF"
          >
            {prize}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
