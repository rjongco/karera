import { Divider, Grid, Typography, Button, Box, styled } from "@mui/material";

import floatControlsSettings from "../../assets/images/float-controls-settings.png";
import floatControlsWinner from "../../assets/images/float-controls-winner.png";
import arrowLeft from "../../assets/images/arrow-left.png";
import { useLocation } from "react-router-dom";
import { useGamesContext } from "../../context/GamesContext";
import { GAME_MATCH_STATUS } from "../../constants";
import {
  notClosedCall,
  notDeclareWinning,
  notLastCall,
  notNewCall,
  notOpen,
} from "../../utils/permissions/game";

const OpenButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "10px",
}));

const LastCallButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "10px",
}));

const ClosedButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%);",
  boxShadow: "none",
  borderRadius: "10px",
}));

const NewButton = styled(Button)(() => ({
  backgroundColor: "#46AEF7",
  boxShadow: "none",
  borderRadius: "10px",
}));

export const FloatingControls = (props: any) => {
  const location = useLocation();
  const pathname = location.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);

  const {
    gameState,
    actions: { openGameMatch },
  } = useGamesContext();

  const {
    openFloatSetting,
    toggleFloatingSetting,
    toggleFloatingWinners,
    matchStatus,
    values,
  } = props;

  const FloatControlGrid = styled(Grid)(() => ({
    background:
      "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
    boxShadow: "none",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    position: "fixed",
    transition: "right 0.5s ease-in-out",
    top: "50%",
    right: !openFloatSetting ? 0 : "-40px",
    transform: "translateY(-50%)",
    zIndex: 600,
    width: "40px",
    height: "105px",
  }));

  const FloatControlGridContent = styled(Grid)(() => ({
    backgroundColor: "#FFFFFF",
    boxShadow: "none",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    position: "fixed",
    transition: "right 0.5s ease-in-out",
    top: "50%",
    right: !openFloatSetting ? "-200px" : 0,
    transform: "translateY(-50%)",
    zIndex: 600,
    width: "150px",
    height: "235px",
  }));

  const handleGameStatusOpen = () => {
    openGameMatch({
      actions: "openMatch",
      game: lastSegment,
      matchId: gameState?.data?.id,
      matchStatus: GAME_MATCH_STATUS.OPEN.name,
      message: "",
    });
  };

  const handleGameStatusLastCall = () => {
    openGameMatch({
      actions: "openMatch",
      game: lastSegment,
      matchId: gameState?.data?.id || 0,
      matchStatus: GAME_MATCH_STATUS.LASTCALL.name,
      message: "",
    });
  };

  const handleGameStatusClosed = () => {
    openGameMatch({
      actions: "openMatch",
      game: lastSegment,
      matchId: gameState?.data?.id || 0,
      matchStatus: GAME_MATCH_STATUS.CLOSED.name,
      message: "",
    });
  };

  const handleGameStatusNewGame = () => {
    openGameMatch({
      actions: "openMatch",
      game: lastSegment,
      matchId: gameState?.data?.id || 0,
      matchStatus: GAME_MATCH_STATUS.INITIAL.name,
      message: "",
    });
  };

  return (
    <>
      <FloatControlGridContent
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 1, py: 1 }}
      >
        <Grid item sx={{ position: "relative" }}>
          <Grid container direction="row">
            <Grid item>
              <Box
                px="5px"
                py={1}
                sx={{
                  position: "absolute",
                  top: 10,
                  left: -38,
                  background:
                    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
                onClick={toggleFloatingSetting}
              >
                <Box
                  component="img"
                  src={arrowLeft}
                  sx={{ width: "15px", height: "15px", ml: "5px" }}
                />
              </Box>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="center"
                sx={{ width: "135px" }}
              >
                <Grid item>
                  <Grid container direction="row" alignItems="center" gap="5px">
                    <Grid item>
                      <Box
                        component="img"
                        src={floatControlsSettings}
                        sx={{ width: "30px", height: "30px" }}
                        onClick={toggleFloatingSetting}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        fontWeight={600}
                        fontSize={14}
                        fontFamily="Baloo"
                        sx={{
                          color: "#FF2020",
                        }}
                      >
                        GAME STATUS
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1 }} />
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    gap="10px"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        gap="5px"
                      >
                        <Grid item>
                          <OpenButton
                            disabled={notOpen(matchStatus)}
                            variant="contained"
                            sx={{
                              px: 1,
                              py: 2,
                              "&.Mui-disabled": {
                                background: "#D9D9D9",
                              },
                            }}
                            onClick={() => handleGameStatusOpen()}
                          >
                            <Typography
                              fontWeight={600}
                              fontSize={18}
                              fontFamily="Baloo"
                              color="#FFFFFF"
                            >
                              OPEN
                            </Typography>
                          </OpenButton>
                        </Grid>
                        <Grid item>
                          <LastCallButton
                            variant="contained"
                            disabled={notLastCall(matchStatus)}
                            onClick={() => handleGameStatusLastCall()}
                            sx={{
                              px: 1,
                              py: 1,
                              color: "#000000",
                              "&.Mui-disabled": {
                                background: "#D9D9D9",
                                color: "#FFFFFF",
                              },
                            }}
                          >
                            <Typography
                              fontWeight={600}
                              fontSize={18}
                              fontFamily="Baloo"
                            >
                              <div>LAST</div>
                              <div style={{ marginTop: "-10px" }}>CALL</div>
                            </Typography>
                          </LastCallButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <ClosedButton
                        fullWidth
                        variant="contained"
                        disabled={notClosedCall(matchStatus)}
                        onClick={() => handleGameStatusClosed()}
                        sx={{
                          px: 1,
                          py: 1,
                          "&.Mui-disabled": {
                            background: "#D9D9D9",
                          },
                        }}
                      >
                        <Typography
                          fontWeight={600}
                          fontSize={18}
                          fontFamily="Baloo"
                          color="#FFFFFF"
                        >
                          CLOSED
                        </Typography>
                      </ClosedButton>
                    </Grid>
                    <Grid item>
                      <NewButton
                        fullWidth
                        variant="contained"
                        disabled={notNewCall(matchStatus)}
                        onClick={() => handleGameStatusNewGame()}
                        sx={{
                          px: 1,
                          py: 1,
                          "&.Mui-disabled": {
                            background: "#D9D9D9",
                          },
                        }}
                      >
                        <Typography
                          fontWeight={600}
                          fontSize={18}
                          fontFamily="Baloo"
                          color="#FFFFFF"
                        >
                          NEW
                        </Typography>
                      </NewButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FloatControlGridContent>
      <FloatControlGrid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 1, py: 1 }}
      >
        <Grid item>
          <Box
            component="img"
            src={floatControlsSettings}
            sx={{ width: "30px", height: "30px" }}
            onClick={toggleFloatingSetting}
          />
        </Grid>
        <Grid item mt={2}>
          <Box
            component="img"
            src={floatControlsWinner}
            sx={{ width: "30px", height: "30px" }}
            onClick={() =>
              !notDeclareWinning(matchStatus) && toggleFloatingWinners()
            }
          />
        </Grid>
      </FloatControlGrid>
    </>
  );
};
