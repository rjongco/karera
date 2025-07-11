import {
  Grid,
  TextField,
  Typography,
  FormControl,
  Box,
  IconButton,
} from "@mui/material";

import { GameVideo } from "../../../../components/GameVideo";
import { GameAnnouncement } from "../../../../components/GameAnnouncement";
import {
  BET_WINNER,
  NEW_GAME,
  GAME_MATCH_STATUS,
  VARIANT,
  ROLES,
} from "../../../../constants";
import { GameActivePlayers } from "../../../../components/GameActivePlayers";
import { GameChat } from "../../../../components/GameChat/Zodiac";
import gameHamburger from "../../../../assets/images/game-hamburger.png";
import zodiacRacePromosAnimatedIcon from "../../../../assets/images/zodiac-race-promos-animated-icon.gif";
import { gameBettingSchema } from "../../../../utils/schema";

import { useContext, useEffect, useState } from "react";
import { GameBettingContainer } from "../../../../components/GameBettingContainer/zodiac";
import { ZodiacModal } from "./ZodiacModal";
import { Formik } from "formik";
import { GameZodiacTable } from "../../../../components/GameZodiacTable";
import betNow from "../../../../assets/images/betnow.gif";
import betTimer from "../../../../assets/images/bet-timer.gif";
import { GameWinningBall } from "../../../../components/GameWinningBall";
import { BetModal } from "./ZodiacModal/BetModal";
import { GameTop3 } from "../../../../components/GameTop3";

import { FloatingControls } from "../../../../components/FloatingControls";
import { FloatingControlsWinners } from "../../../../components/FloatingControlsWinners";
import { useGamesContext } from "../../../../context/GamesContext";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../../../../context/GlobalProvider";
import { isOneOfTheGameStatus } from "../../../../utils/permissions/game";

export const GameBetting = (props: any) => {
  const {
    matchStatus,
    countdownWinners,
    values,
    handleSubmit,
    innerRef,
    validateRef,
    setTouchedRef,
    authInfo,
  } = props;
  //  @ts-ignore
  const { setTop4Winners, bets, setOpenGameSideBar } =
    useContext(GlobalContext) || {};

  const [openModalZodiac, setOpenModalZodiac] = useState(false);
  const [openModalGameStatus, setOpenModalGameStatus] = useState(false);
  const [openModalTypeGameStatus, setOpenModalTypeGameStatus] = useState("");

  const [typeModal, setTypeModal] = useState({});
  const [chat, setChat] = useState("");
  const [autoPlay, setAutoPlay] = useState(0);
  const [showBetDialog, setShowBetDialog] = useState(false);
  const [openFloatSetting, setOpenFloatSetting] = useState(false);
  const [openFloatWinners, setOpenFloatWinners] = useState(false);
  const [onClosedBet, setOnClosedBet] = useState(false);
  const [onNewGameBet, setOnNewGameBet] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
  const { gameState } = useGamesContext();
  const gameWinners =
    gameState?.data?.gameWinners && JSON.parse(gameState?.data?.gameWinners);

  useEffect(() => {
    if (isOneOfTheGameStatus(matchStatus)) {
      setShowBetDialog(false);
    } else {
      setShowBetDialog(true);
    }
  }, [matchStatus]);

  const toggleFloatingSetting = () => {
    setOpenFloatSetting(!openFloatSetting);
  };

  const toggleFloatingWinners = () => {
    setOpenFloatWinners(!openFloatWinners);
  };

  const handleCloseModalZodiac = () => {
    setOpenModalZodiac(false);
  };

  const handleCloseModalGameStatus = () => {
    setOpenModalGameStatus(false);
    setOpenModalTypeGameStatus(BET_WINNER);
  };

  const handleTypeModal = (zodiac: string) => {
    setOpenModalZodiac(true);
    setTypeModal(zodiac);
  };

  const handleShowBetDialog = () => {
    setShowBetDialog(false);
  };

  const handleOpenGameSideBar = () => {
    setOpenGameSideBar({ openGameSideBar: true });
  };

  const renderGameAnnoucement = () => {
    return (
      <Typography fontSize={9} fontWeight={400} color="#FFFFFF">
        samgyup01 have won <span style={{ color: "#FFE400" }}>₱1430</span>
      </Typography>
    );
  };

  const renderHeader = () => {
    return (
      <Grid container direction="column" sx={{ position: "absolute", top: 0 }}>
        <Grid
          item
          sx={{
            marginTop: "60px",
            width: "100%",
          }}
        >
          <Grid container direction="column">
            <Grid item px={1} pt={1}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <GameAnnouncement
                    variant={VARIANT.CONSTANT}
                    content={renderGameAnnoucement()}
                  />
                </Grid>
                <Grid item>
                  <GameActivePlayers
                    matchStatus={matchStatus}
                    onAutoPlay={setAutoPlay}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderChatAndBetNow = () => {
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          position: "absolute",
          bottom: 50,
          display: openModalZodiac ? "none" : "",
          zIndex: 800,
        }}
      >
        <Grid item>{!showBetDialog && <GameChat />}</Grid>

        <Grid item mb={-1}>
          <IconButton
            onClick={() => {
              setShowBetDialog(true);
            }}
          >
            <Box component="img" width={120} src={betNow} />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  const renderFooter = () => {
    return (
      <Grid
        container
        direction="column"
        alignItems="space-between"
        sx={{
          position: "absolute",
          bottom: 0,
          height: "60px",
          background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
          width: "100%",
          zIndex: 400,
          px: "3px",
        }}
      >
        <Grid item xs>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={0}
            gap={0}
          >
            <Grid item>
              <Box
                component="img"
                width={40}
                src={gameHamburger}
                mt={1}
                onClick={() => handleOpenGameSideBar()}
              />
            </Grid>
            <Grid item xs px={1}>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  id="chat"
                  name="chat"
                  placeholder="Type your message here...."
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={chat}
                  onChange={(e) => {
                    setChat(e.target.value);
                  }}
                  inputProps={{
                    style: {
                      border: "1px solid #FFE400",
                      borderRadius: "15px",
                      width: "100%",
                      color: "#FFFFFF",
                      paddingTop: "6px",
                    },
                  }}
                  sx={{
                    "& fieldset": {
                      border: "none",
                    },
                    "& input::placeholder": {
                      color: "#FFFFFF", // Change placeholder color
                      fontSize: "14px",
                      fontStyle: "italic",
                      fontWeight: "400",
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid>
              <IconButton
                onClick={() => {
                  setShowBetDialog(true);
                  setOpenModalZodiac(true);
                }}
              >
                <Box
                  component="img"
                  width={40}
                  src={zodiacRacePromosAnimatedIcon}
                  sx={{ mr: 1.5 }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderZodiacTable = () => {
    if (matchStatus === GAME_MATCH_STATUS.INITIAL.name) {
      return (
        <Grid item sx={{ mt: 18, zIndex: 20 }}>
          <GameZodiacTable variant={VARIANT.TABLE} />
        </Grid>
      );
    }
  };

  // const renderLastCall = () => {
  //   if (matchStatus === GAME_MATCH_STATUS.LASTCALL.name) {
  //     if (countdown > 0) {
  // setMatchStatus(GAME_MATCH_STATUS.LASTCALL.name);

  // return (
  //   <Grid item sx={{ mt: 14, zIndex: 20 }}>
  //     <Grid container direction="column" alignItems="center" mt={1}>
  //       <Grid item>
  //         <Box component="img" width={80} src={betTimer} />
  //       </Grid>
  //     </Grid>
  //   </Grid>
  // );
  // } else if (countdown === 0) {
  //   // setMatchStatus(GAME_MATCH_STATUS.CLOSED.name);
  //   openGameMatch({
  //     game: lastSegment,
  //     matchId: gameState?.data?.id,
  //     matchStatus: GAME_MATCH_STATUS.CLOSED.name,
  //     message: "",
  //   });
  //   setOpenModalZodiac(false);
  // }
  //   }
  // };

  const renderWinners = () => {
    if (matchStatus === GAME_MATCH_STATUS.WINNERS.name) {
      // setMatchStatus(GAME_MATCH_STATUS.WINNERS.name);
      setOpenModalGameStatus(false);
      setOpenModalTypeGameStatus("");
      if (countdownWinners > 6) {
        return (
          <Grid
            item
            sx={{
              mt: 16,
              zIndex: 20,
            }}
          >
            <Grid container direction="row" justifyContent="center">
              <Grid item ml={1} mt={3}>
                <GameZodiacTable
                  gameWinners={gameWinners}
                  variant={VARIANT.BOX}
                />
              </Grid>

              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <GameWinningBall gameWinners={gameWinners} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      } else if (countdownWinners > 4) {
        // setMatchStatus(GAME_MATCH_STATUS.WINNERS.name);
        setOpenModalGameStatus(true);
        setOpenModalTypeGameStatus(BET_WINNER);
      } else if (countdownWinners > 2) {
        setShowBetDialog(false);
        // setMatchStatus(GAME_MATCH_STATUS.WINNERS.name);
        setOpenModalGameStatus(false);
        setOpenModalTypeGameStatus(BET_WINNER);
        return (
          <Grid
            item
            sx={{
              mt: 18,
              zIndex: 20,
            }}
          >
            <Grid container direction="column" justifyContent="center">
              <Grid item>
                <GameTop3 />
              </Grid>
            </Grid>
          </Grid>
        );
      } else if (countdownWinners > 0) {
        // setMatchStatus(GAME_MATCH_STATUS.WINNERS.name);
        setOpenModalGameStatus(true);
        setOpenModalTypeGameStatus(NEW_GAME);
      } else if (countdownWinners === 0) {
        setShowBetDialog(false);
        setOpenModalTypeGameStatus("");
        setOpenModalGameStatus(false);
        // setMatchStatus(GAME_MATCH_STATUS.INITIAL.name);
      }
    }
  };

  const isOpenOrLast = () =>
    matchStatus === GAME_MATCH_STATUS.OPEN.name ||
    matchStatus === GAME_MATCH_STATUS.LASTCALL.name;

  return (
    <Formik
      enableReinitialize
      innerRef={innerRef}
      initialValues={{
        ...values,
      }}
      validationSchema={gameBettingSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
      }}
    >
      {({
        setTouched,
        validateForm,
        handleSubmit,
        setFieldValue,
        errors,
        values,
        resetForm,
      }) => {
        if (validateRef) validateRef.current = validateForm;
        if (setTouchedRef) setTouchedRef.current = setTouched;

        return (
          <>
            <Grid container direction="column" alignItems="space-between">
              <Grid item>
                <GameVideo
                  py={0}
                  autoPlay={autoPlay}
                  styles={{
                    position: "fixed",
                    top: 0,
                    height: "100vh",
                    zIndex: -5,
                  }}
                />
              </Grid>
              <Grid item>{renderHeader()}</Grid>

              {renderZodiacTable()}

              {/* {renderLastCall()} */}

              {renderWinners()}

              <Grid item>
                <Grid
                  container
                  direction="column"
                  sx={{
                    position: "fixed",
                    bottom: 0,
                  }}
                >
                  <Grid item sx={{ mt: 10, zIndex: 20 }}>
                    {renderChatAndBetNow()}
                  </Grid>

                  <Grid
                    item
                    sx={{
                      position: "absolute",
                      bottom: 60,
                      mt: 1,
                      mx: 2,
                      zIndex: 30,
                      mb: 1,
                    }}
                  >
                    {showBetDialog && (
                      <GameBettingContainer
                        values={values}
                        handleSubmit={handleSubmit}
                        onTypeModal={handleTypeModal}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        setShowBetDialog={handleShowBetDialog}
                        isOpenOrLast={isOpenOrLast}
                      />
                    )}
                  </Grid>

                  <Grid item>{renderFooter()}</Grid>
                </Grid>
              </Grid>
            </Grid>

            {authInfo?.role === ROLES.MODERATOR.name && (
              <>
                <FloatingControls
                  openFloatSetting={openFloatSetting}
                  toggleFloatingSetting={toggleFloatingSetting}
                  toggleFloatingWinners={toggleFloatingWinners}
                  onClosedBet={onClosedBet}
                  onNewGameBet={onNewGameBet}
                  setOnClosedBet={setOnClosedBet}
                  setOnNewGameBet={setOnNewGameBet}
                  matchStatus={matchStatus}
                  values={values}
                />
                <FloatingControlsWinners
                  matchStatus={matchStatus}
                  openFloatWinners={openFloatWinners}
                  toggleFloatingWinners={toggleFloatingWinners}
                />
              </>
            )}
            <BetModal
              openModal={openModalGameStatus}
              onCloseModal={handleCloseModalGameStatus}
              typeModal={openModalTypeGameStatus}
            />
            <ZodiacModal
              values={values}
              openModal={openModalZodiac}
              onCloseModal={handleCloseModalZodiac}
              typeModal={typeModal}
              onBet={() => {
                handleSubmit(values);
                handleCloseModalZodiac();
              }}
              onCancelBet={handleCloseModalZodiac}
            />
          </>
        );
      }}
    </Formik>
  );
};
