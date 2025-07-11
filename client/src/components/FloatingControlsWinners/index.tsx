import {
  Divider,
  Grid,
  Typography,
  Button,
  Box,
  styled,
  Avatar,
  IconButton,
} from "@mui/material";

import floatControlsSettings from "../../assets/images/float-controls-settings.png";
import floatingControlsWinnersConfirm from "../../assets/images/floating-controls-winners-confirm.png";
import arrowLeft from "../../assets/images/arrow-left.png";
import { GAME_MATCH_STATUS, ZODIACS } from "../../constants";
import { ZODIACS_MENU } from "../../constants/zodiacsMenu";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalProvider";
import { notDeclareWinning } from "../../utils/permissions/game";
import { useLocation } from "react-router-dom";
import { useGamesContext } from "../../context/GamesContext";

const ConfirmButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "10px",
}));

export const FloatingControlsWinners = (props: any) => {
  // @ts-ignore
  const { setTop4Winners, top4Winners } = useContext(GlobalContext) || {};
  const { openFloatWinners, toggleFloatingWinners, matchStatus } = props;
  const [selectedTop4, setSelectedTop4] = useState([]);

  const location = useLocation();
  const pathname = location.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);

  const {
    //  @ts-ignore
    auth: authInfo,
  } = useContext(GlobalContext);

  const {
    gameState,
    actions: { openGameMatch },
  } = useGamesContext();

  useEffect(() => {
    setTop4Winners(selectedTop4);
  }, [selectedTop4]);

  const setItem = (zodiacName: any) => {
    // @ts-ignore
    setSelectedTop4((prevSelectedTop4) => {
      // @ts-ignore
      if (
        prevSelectedTop4.length === 4 &&
        // @ts-ignore
        !prevSelectedTop4.includes(zodiacName)
      ) {
        // If there are already 4 items and the new item is not in the array, don't add it
        return prevSelectedTop4;
      } else {
        // @ts-ignore
        if (prevSelectedTop4.includes(zodiacName)) {
          // If item already exists, remove it
          return prevSelectedTop4.filter(
            (selectedItem) => selectedItem !== zodiacName
          );
        } else {
          // If item doesn't exist and there's space, add it
          return [...prevSelectedTop4, zodiacName];
        }
      }
    });
  };

  const handleGameStatusDeclareWinner = () => {
    openGameMatch({
      actions: "openMatch",
      game: lastSegment,
      matchId: gameState?.data?.id,
      matchStatus: GAME_MATCH_STATUS.WINNERS.name,
      message: JSON.stringify(selectedTop4),
    });
    toggleFloatingWinners(false);
  };

  const FloatControlGridContent = styled(Grid)(() => ({
    backgroundColor: "#FFFFFF",
    boxShadow: "none",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    position: "fixed",
    transition: "right 0.5s ease-in-out",
    top: "50%",
    right: !openFloatWinners ? "-200px" : "-3px",
    transform: "translateY(-50%)",
    zIndex: 600,
    width: "160px",
    height: "295px",
  }));

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
                  left: -37,
                  background:
                    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
                onClick={toggleFloatingWinners}
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
                        onClick={toggleFloatingWinners}
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
                        WINNING BALLS
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1 }} />
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="5px"
                  >
                    {ZODIACS_MENU.filter(
                      (o: any) =>
                        o.name === ZODIACS.ARIES ||
                        o.name === ZODIACS.TAURUS ||
                        o.name === ZODIACS.GEMINI
                    ).map((o: any) => (
                      <div key={`floating-control-winner-${o.name}`}>
                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            sx={{ position: "relative" }}
                          >
                            {/* @ts-ignore */}
                            {selectedTop4.includes(o.name) && (
                              <Grid
                                item
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: -3,
                                  zIndex: 30,
                                }}
                              >
                                <Box
                                  component="img"
                                  src={floatingControlsWinnersConfirm}
                                  sx={{
                                    width: "15px",
                                    height: "15px",
                                    ml: "5px",
                                  }}
                                />
                              </Grid>
                            )}
                            <Grid item>
                              <IconButton
                                sx={{ p: 0, m: 0 }}
                                onClick={() => setItem(o.name)}
                              >
                                <Avatar
                                  src={o.logo}
                                  alt={`Zodiac Floating Control ${o.label} Icon`}
                                  sx={{
                                    width: "38px",
                                    height: "38px",
                                    border: "1px solid #FFE400",
                                  }}
                                />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </Grid>
                </Grid>
                <Grid item mt="5px">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="5px"
                  >
                    {ZODIACS_MENU.filter(
                      (o: any) =>
                        o.name === ZODIACS.CANCER ||
                        o.name === ZODIACS.LEO ||
                        o.name === ZODIACS.VIRGO
                    ).map((o: any) => (
                      <div key={`floating-control-winner-${o.name}`}>
                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            sx={{ position: "relative" }}
                          >
                            {/* @ts-ignore */}
                            {selectedTop4.includes(o.name) && (
                              <Grid
                                item
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: -3,
                                  zIndex: 30,
                                }}
                              >
                                <Box
                                  component="img"
                                  src={floatingControlsWinnersConfirm}
                                  sx={{
                                    width: "15px",
                                    height: "15px",
                                    ml: "5px",
                                  }}
                                />
                              </Grid>
                            )}
                            <Grid item>
                              <IconButton
                                sx={{ p: 0, m: 0 }}
                                onClick={() => setItem(o.name)}
                              >
                                <Avatar
                                  src={o.logo}
                                  alt={`Zodiac Floating Control ${o.label} Icon`}
                                  sx={{
                                    width: "38px",
                                    height: "38px",
                                    border: "1px solid #FFE400",
                                  }}
                                />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </Grid>
                </Grid>
                <Grid item mt="5px">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="5px"
                  >
                    {ZODIACS_MENU.filter(
                      (o: any) =>
                        o.name === ZODIACS.LIBRA ||
                        o.name === ZODIACS.SCORPIO ||
                        o.name === ZODIACS.SAGITTARIUS
                    ).map((o: any) => (
                      <div key={`floating-control-winner-${o.name}`}>
                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            sx={{ position: "relative" }}
                          >
                            {/* @ts-ignore */}
                            {selectedTop4.includes(o.name) && (
                              <Grid
                                item
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: -3,
                                  zIndex: 30,
                                }}
                              >
                                <Box
                                  component="img"
                                  src={floatingControlsWinnersConfirm}
                                  sx={{
                                    width: "15px",
                                    height: "15px",
                                    ml: "5px",
                                  }}
                                />
                              </Grid>
                            )}
                            <Grid item>
                              <IconButton
                                sx={{ p: 0, m: 0 }}
                                onClick={() => setItem(o.name)}
                              >
                                <Avatar
                                  src={o.logo}
                                  alt={`Zodiac Floating Control ${o.label} Icon`}
                                  sx={{
                                    width: "38px",
                                    height: "38px",
                                    border: "1px solid #FFE400",
                                  }}
                                />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </Grid>
                </Grid>
                <Grid item mt="5px">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="5px"
                  >
                    {ZODIACS_MENU.filter(
                      (o: any) =>
                        o.name === ZODIACS.CAPRICORN ||
                        o.name === ZODIACS.AQUARIUS ||
                        o.name === ZODIACS.PISCES
                    ).map((o: any) => (
                      <div key={`floating-control-winner-${o.name}`}>
                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            sx={{ position: "relative" }}
                          >
                            {/* @ts-ignore */}
                            {selectedTop4.includes(o.name) && (
                              <Grid
                                item
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: -3,
                                  zIndex: 30,
                                }}
                              >
                                <Box
                                  component="img"
                                  src={floatingControlsWinnersConfirm}
                                  sx={{
                                    width: "15px",
                                    height: "15px",
                                    ml: "5px",
                                  }}
                                />
                              </Grid>
                            )}
                            <Grid item>
                              <IconButton
                                sx={{ p: 0, m: 0 }}
                                onClick={() => setItem(o.name)}
                              >
                                <Avatar
                                  src={o.logo}
                                  alt={`Zodiac Floating Control ${o.label} Icon`}
                                  sx={{
                                    width: "38px",
                                    height: "38px",
                                    border: "1px solid #FFE400",
                                  }}
                                />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </Grid>
                </Grid>
                <Grid item mt="10px">
                  <ConfirmButton
                    disabled={
                      notDeclareWinning(matchStatus) && selectedTop4.length <= 4
                    }
                    variant="contained"
                    fullWidth
                    sx={{
                      px: 3,
                      py: "5px",
                      "&.Mui-disabled": {
                        background: "#D9D9D9",
                      },
                    }}
                    onClick={() => handleGameStatusDeclareWinner()}
                  >
                    <Typography
                      fontWeight={600}
                      fontSize={18}
                      fontFamily="Baloo"
                      color="#FFFFFF"
                    >
                      CONFIRM
                    </Typography>
                  </ConfirmButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FloatControlGridContent>
    </>
  );
};
