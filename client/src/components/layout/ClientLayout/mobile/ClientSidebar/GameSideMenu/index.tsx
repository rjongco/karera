import {
  Grid,
  Typography,
  FormControlLabel,
  Box,
  styled,
  Divider,
} from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import gameSound from "../../../../../../assets/images/game-sound.png";
import transactionIcon from "../../../../../../assets/images/transaction-icon.png";
import arrowRightBlack from "../../../../../../assets/images/arrow-right-black.png";
import gameRules from "../../../../../../assets/images/game-rules.png";
import language from "../../../../../../assets/images/language.png";
import backtoLobby from "../../../../../../assets/images/back-to-lobby.png";
import logoutIcon from "../../../../../../assets/images/logout-icon.png";
import { useNavigate } from "react-router-dom";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 70,
  height: 28,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(36px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    marginTop: "-5px",
    width: 32,
    height: 32,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      content: '"ON"',
      fontFamily: "Baloo",
      fontWeight: 200,
      color: "#FFFFFF",
      top: 10,
      left: 7,
    },
    "&::after": {
      content: '"OFF"',
      fontFamily: "Baloo",
      fontWeight: 200,
      color: "#FFFFFF",
      top: 10,
      right: 8,
      marginRight: "8px",
    },
  },
}));

export const GameSideMenu = (props: any) => {
  const { onOpenGameSideBar } = props;
  const navigate = useNavigate();
  return (
    <>
      {/* Game Sound */}
      <Grid item mt={3} px={3}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          onClick={() => {}}
          spacing={2}
        >
          <Grid item sx={{ mt: "2px" }}>
            <Box
              component="img"
              //  @ts-ignore
              alt={`Game Sound Icon`}
              src={gameSound}
              height={25}
            />
          </Grid>
          <Grid item xs>
            <Typography fontSize={16}>Game Sound</Typography>
          </Grid>
          <Grid item sx={{ mr: -2 }}>
            <FormControlLabel control={<IOSSwitch defaultChecked />} label="" />
          </Grid>
        </Grid>
      </Grid>
      {/* Transaction History */}
      <Grid item mt={3} px={3}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          onClick={() => {}}
          spacing={2}
        >
          <Grid item>
            <Box
              component="img"
              //  @ts-ignore
              alt={`Transaction Icon`}
              src={transactionIcon}
              height={25}
            />
          </Grid>
          <Grid item xs>
            <Typography fontSize={16}>Transaction History</Typography>
          </Grid>
          <Grid item>
            <Box
              component="img"
              alt={`Arrow Right Black`}
              src={arrowRightBlack}
              height={15}
              mt="3px"
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Game Rules */}
      <Grid item mt={3} px={3}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          onClick={() => {}}
          spacing={2}
        >
          <Grid item>
            <Box
              component="img"
              //  @ts-ignore
              alt={`Transaction Icon`}
              src={gameRules}
              height={25}
            />
          </Grid>
          <Grid item xs>
            <Typography fontSize={16}>Game Rules</Typography>
          </Grid>
          <Grid item>
            <Box
              component="img"
              //  @ts-ignore
              alt={`Arrow Right Black`}
              src={arrowRightBlack}
              height={15}
              mt="3px"
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Language */}
      <Grid item mt={3} px={3}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          onClick={() => {}}
          spacing={2}
        >
          <Grid item>
            <Box
              component="img"
              //  @ts-ignore
              alt={`Lnaguage Icon`}
              src={language}
              height={25}
            />
          </Grid>
          <Grid item xs>
            <Typography fontSize={16}>Language</Typography>
          </Grid>
          <Grid item>
            <Box
              component="img"
              //  @ts-ignore
              alt={`Arrow Right Black`}
              src={arrowRightBlack}
              height={15}
              mt="3px"
            />
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{ my: 3 }} />
      {/* Back to Game Lobby */}
      <Grid item mt={3} px={3}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          onClick={() => {
            onOpenGameSideBar();
            navigate("/games");
          }}
          spacing={2}
        >
          <Grid item>
            <Box
              component="img"
              //  @ts-ignore
              alt={`Back To Lobby Icon`}
              src={backtoLobby}
              height={25}
              ml="-3px"
            />
          </Grid>
          <Grid item xs>
            <Typography fontSize={16}>Back to Lobby</Typography>
          </Grid>
          <Grid item>
            <Box
              component="img"
              //  @ts-ignore
              alt={`Arrow Right Black`}
              src={arrowRightBlack}
              height={15}
              mt="3px"
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Signout */}
      <Grid item mt={3} px={3}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          onClick={() => navigate("/game/logout")}
          spacing={2}
        >
          <Grid item>
            <Box
              component="img"
              //  @ts-ignore
              alt={`Sidebar Logout`}
              src={logoutIcon}
              height={25}
            />
          </Grid>
          <Grid item xs>
            <Typography fontSize={16}>Sign Out</Typography>
          </Grid>
          <Grid item>
            <Box
              component="img"
              //  @ts-ignore
              alt={`Arrow Right Black`}
              src={arrowRightBlack}
              height={15}
              mt="3px"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
