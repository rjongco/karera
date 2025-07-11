import { useContext, useEffect, useState } from "react";
import { GameBetting } from "./GameBetting";
import { GAME_MATCH_STATUS } from "../../../../constants";
import { GlobalContext } from "../../../../context/GlobalProvider";
import { useGamesContext } from "../../../../context/GamesContext";
import { useLocation } from "react-router-dom";

const GameZodiac = () => {
  const {
    //  @ts-ignore
    bets,
    //  @ts-ignore
    auth: authInfo,
    // @ts-ignore
    setBets,
    //  @ts-ignore
  } = useContext(GlobalContext);

  const location = useLocation();
  const pathname = location.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);

  const {
    gameState,
    actions: { getGameMatch },
  } = useGamesContext();

  const matchStatus = gameState?.data?.status || GAME_MATCH_STATUS.INITIAL.name;

  // This could be useState, useOptimistic, or other state

  useEffect(() => {
    if (getGameMatch) {
      getGameMatch({
        actions: "getMatch",
        game: lastSegment,
        userId: authInfo?.id,
      });
    }
  }, [getGameMatch]);

  const [countdown, setCountdown] = useState(5); // Initial countdown value
  const [countdownPlayVideo, setCountdownPlayVideo] = useState(5); // Initial countdown value
  const [countdownWinners, setCountdownWinners] = useState(9); // Initial countdown value

  // useEffect(() => {
  //   if (matchStatus === GAME_MATCH_STATUS.INITIAL.name) {
  //     setCountdown(5);
  // setCountdownPlayVideo(5);
  // setCountdownWinners(9);
  //   }
  // }, [matchStatus]);

  // useEffect(() => {
  //   if (matchStatus === GAME_MATCH_STATUS.LASTCALL.name) {
  //     const intervalId = setInterval(() => {
  //       if (countdown > 0) {
  //         setCountdown(countdown - 1);
  //       }
  //     }, 1000);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [countdown, matchStatus]);

  // useEffect(() => {
  //   if (matchStatus === GAME_MATCH_STATUS.CLOSED.name) {
  //     const intervalId2 = setInterval(() => {
  //       if (countdownPlayVideo > 0) {
  //         setCountdownPlayVideo(countdownPlayVideo - 1);
  //       }
  //     }, 1000);

  //     return () => clearInterval(intervalId2);
  //   }
  // }, [countdownPlayVideo, matchStatus]);

  useEffect(() => {
    if (matchStatus === GAME_MATCH_STATUS.WINNERS.name) {
      const intervalId3 = setInterval(() => {
        if (countdownWinners > 0) {
          setCountdownWinners(countdownWinners - 1);
        }
      }, 1000);

      return () => clearInterval(intervalId3);
    }
  }, [countdownWinners, matchStatus]);

  const [formDataBet, setFormDataBet] = useState({
    aries: 0,
    cancer: 0,
    libra: 0,
    capricorn: 0,
    taurus: 0,
    leo: 0,
    scorpio: 0,
    aquarius: 0,
    gemini: 0,
    virgo: 0,
    sagittarius: 0,
    pisces: 0,
  });
  const handleSubmit = (values: any) => {
    const nonZeroBets = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== 0 && value !== "0" && value !== "0.00"
      )
    );

    setBets({ bets: JSON.stringify(nonZeroBets) });
    // betGameMatch(values)
  };

  //   handleMatchStatus();
  // };

  // if (steps === 1) {
  //   return <Startbetting onStartBet={handleStartBet} />;
  // } else if (steps === 2) {
  return (
    <GameBetting
      values={formDataBet}
      handleSubmit={handleSubmit}
      matchStatus={matchStatus}
      countdown={countdown}
      countdownPlayVideo={countdownPlayVideo}
      countdownWinners={countdownWinners}
      authInfo={authInfo}
    />
  );
};

export default GameZodiac;
