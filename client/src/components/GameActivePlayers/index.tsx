import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import WordEllipsis from "../WordEllipsis";
import avatarGreen from "../../assets/images/avatar-green.png";
import avatarBlue from "../../assets/images/avatar-blue.png";
import avatarYellow from "../../assets/images/avatar-yellow.png";
import avatarCrown from "../../assets/images/avatar-crown.png";
import { numberShort } from "../../utils/logic";
import { GAME_MATCH_STATUS } from "../../constants";

export const GameActivePlayers = (props: any) => {
  const { matchStatus, onAutoPlay } = props;

  let styleStatus = {};
  let addMargin = 0;
  let addMargin2 = 0;
  let label = "";
  let fontColor = "#FFFFFF";
  if (matchStatus === GAME_MATCH_STATUS.INITIAL.name) {
    styleStatus = {
      px: 2,
      py: 1,
      background:
        "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
      borderRadius: "15px",
    };
    addMargin = 0;
    addMargin2 = 2;
    label = GAME_MATCH_STATUS.OPEN.label;
    fontColor = "#000000";
  } else if (matchStatus === GAME_MATCH_STATUS.OPEN.name) {
    styleStatus = {
      px: 2,
      py: 1,
      background:
        "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
      borderRadius: "15px",
    };
    addMargin = 0;
    addMargin2 = 9;
    label = GAME_MATCH_STATUS.OPEN.label;
    fontColor = "#FFFFFF";
  } else if (matchStatus === GAME_MATCH_STATUS.LASTCALL.name) {
    styleStatus = {
      px: 2,
      py: 1,
      backgroundColor: "#FFE400",
      borderRadius: "15px",
    };
    addMargin = 3;
    addMargin2 = 9;
    label = GAME_MATCH_STATUS.LASTCALL.label;
    fontColor = "#00000";
  } else if (matchStatus === GAME_MATCH_STATUS.CLOSED.name) {
    styleStatus = {
      px: 2,
      py: 1,
      background:
        "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
      borderRadius: "15px",
    };
    addMargin = 2;
    addMargin2 = 9;
    label = GAME_MATCH_STATUS.CLOSED.label;
    fontColor = "#FFFFFF";
    onAutoPlay(1);
  }
  return (
    <Grid container direction="row">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        sx={{ position: "relative" }}
      >
        <Grid item>
          <Box
            sx={{
              borderRadius: "35px",
              backgroundColor: "#1A1A1A80",
              pr: addMargin2,
              py: 1,
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              height="100%"
              sx={{ position: "relative" }}
            >
              <Grid item ml={2} mr={3}>
                <Box
                  sx={{
                    background:
                      "linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)",
                    position: "absolute",
                    left: -3,
                    bottom: -8,
                    zIndex: 50,
                    ml: "10px",
                    px: "7px",
                    pt: "2px",
                    borderRadius: "15px",
                  }}
                >
                  <Typography fontSize={7} fontWeight={600}>
                    {numberShort(12975)}
                  </Typography>
                </Box>
                <Avatar
                  alt="Avatar Crown"
                  src={avatarCrown}
                  sx={{
                    width: 25,
                    height: 25,
                    position: "absolute",
                    left: -2,
                    top: -3,
                    zIndex: 40,
                    ml: "10px",
                  }}
                />
                <Avatar
                  alt="Avatar Blue"
                  src={avatarBlue}
                  sx={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    zIndex: 30,
                    ml: "10px",
                  }}
                />
                <Avatar
                  alt="Avatar Green"
                  src={avatarGreen}
                  sx={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    marginLeft: "8px",
                    zIndex: 20,
                    ml: "20px",
                  }}
                />
                <Avatar
                  alt="Avatar Yellow"
                  src={avatarYellow}
                  sx={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    marginLeft: "16px",
                    zIndex: 10,
                    ml: "30px",
                  }}
                />
              </Grid>
              <Grid item ml={2} mr={addMargin} sx={{}}>
                <Typography fontSize={12} fontWeight={400} color="#FFFFFF">
                  {numberShort(1003)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {matchStatus !== GAME_MATCH_STATUS.INITIAL.name && (
          <Grid item sx={{ position: "absolute", right: 0 }}>
            <Box sx={{ ...styleStatus }}>
              <Typography fontSize={12} fontWeight={600} color={fontColor}>
                {label}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
