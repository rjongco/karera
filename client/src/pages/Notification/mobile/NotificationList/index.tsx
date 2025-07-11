import { Grid, Typography, Button, styled } from "@mui/material";
import dayjs from "dayjs";

export const NotificationList = (props: any) => {
  const { values, index, arr, setNotificationContent } = props;

  const GridStyled = styled(Grid)(() => ({
    borderBottom: `${index === arr.length - 1 ? "" : "1px solid #C4C4C4"}`,
  }));

  return (
    <Button
      fullWidth
      variant="text"
      sx={{ color: "#000000", p: 0, m: 0 }}
      onClick={() => setNotificationContent(values)}
    >
      <GridStyled container direction="column" justifyContent="center" py={2}>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "15rem",
                }}
              >
                <Typography
                  fontFamily="Baloo"
                  fontSize={18}
                  fontWeight={values?.isRead ? 400 : 600}
                  noWrap
                  textAlign="right"
                >
                  {values?.title}
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <Typography
                fontFamily="Baloo"
                fontSize={16}
                fontWeight={400}
                noWrap
                textAlign="right"
              >
                {dayjs(values?.createdAt).format("MM/DD/YYYY")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "21.5rem",
            }}
          >
            <Typography
              fontFamily="Baloo"
              fontSize={18}
              fontWeight={400}
              noWrap
              textAlign="right"
            >
              {values?.message}
            </Typography>
          </div>
        </Grid>
      </GridStyled>
    </Button>
  );
};
