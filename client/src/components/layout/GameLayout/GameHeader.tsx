import { Avatar, Grid, Typography } from "@mui/material";
import zodiacRaceCircularLogo from "../../../assets/images/zodiac-race-circular-logo.png";
import avatarMobile from "../../../assets/images/avatar-blue.png";
import { IMAGE_URL_USER } from "../../../constants";

export const GameHeader = (props: any) => {
  const { authInfo, onOpenSideBar } = props;

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      px={1}
    >
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Grid item>
            <Avatar
              alt="Game Logo"
              src={zodiacRaceCircularLogo}
              sx={{
                ml: "5px",
                border: "2px solid #FFE400",
                width: 30,
                height: 30,
              }}
            />
          </Grid>
          <Grid item ml={1}>
            <Typography fontSize={12} fontWeight={600} color="#FFFFFF">
              Zodiac Race
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  fontSize={10}
                  fontWeight={400}
                  color="#FFFFFF"
                  textAlign="right"
                >
                  My Balance
                </Typography>
              </Grid>
              <Grid item>
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "11rem",
                  }}
                >
                  <Typography
                    fontSize={10}
                    fontWeight={600}
                    color="#FFFFFF"
                    noWrap
                  >
                    {`₱ ${authInfo?.wallet?.balance || "0.00"}`}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item ml={2} mr={2}>
            {authInfo?.profilePicture ? (
              <Avatar
                //  @ts-ignore
                src={`${IMAGE_URL_USER}/${authInfo?.id}/${authInfo?.profilePicture}`}
                alt="Image"
                sx={{ width: 35, height: 35 }}
              />
            ) : (
              <Avatar
                alt="Avatar Mobile Icon"
                src={avatarMobile}
                sx={{ width: 27, height: 27, border: "2px solid #FFFFFF" }}
                onClick={() => onOpenSideBar()}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
