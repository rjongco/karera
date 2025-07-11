import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const ZodiacButton = (props: any) => {
  const { logo, name, color, onClick } = props;
  return (
    <Box
      px="3px"
      mb="5px"
      sx={{
        backgroundColor: color,
        borderRadius: "5px",
      }}
      onClick={onClick}
    >
      <Grid
        container
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        mt="5px"
        py="3px"
      >
        <Grid item>
          <Avatar
            src={logo}
            sx={{ width: "20px", height: "20px", p: 0, m: 0 }}
          />
        </Grid>
        <Grid item xs ml="3px">
          <Typography fontSize={8} fontWeight={600} color="#FFFFFF">
            {name}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
