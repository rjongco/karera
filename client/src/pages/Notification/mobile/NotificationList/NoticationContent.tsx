import { Grid, Typography } from "@mui/material";
import dayjs from "dayjs";

import { WELCOME } from "../../../../constants";
import { WelcomeNotif } from "./WelcomeNotif";

export const NotificationContent = (props: any) => {
  const { values } = props;
  return (
    <Grid item pt={2}>
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" justifyContent="space-between">
            <Grid
              item
              sx={{
                overflowWrap: "break-word",
                width: "230px",
              }}
            >
              <Typography fontFamily="Baloo" fontSize={18} fontWeight={600}>
                {values?.title}
              </Typography>
            </Grid>
            <Grid item xs sx={{ position: "relative" }}>
              <Typography
                fontFamily="Baloo"
                fontSize={16}
                fontWeight={400}
                noWrap
                textAlign="right"
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <Grid container direction="column">
                  <Grid item>
                    {dayjs(values?.createdAt).format("MM/DD/YYYY hh:mm A")}
                  </Grid>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item mt={2} sx={{ overflowWrap: "break-word", width: "340px" }}>
          <Typography
            fontFamily="Baloo"
            fontSize={18}
            fontWeight={400}
            sx={{ whiteSpace: "pre-line" }}
          >
            {values?.message}
          </Typography>
        </Grid>
        {values.module === WELCOME && <WelcomeNotif />}
      </Grid>
    </Grid>
  );
};
