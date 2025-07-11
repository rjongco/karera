import { Box, Typography } from "@mui/material";
import { GameState, delay } from "../../../../../common/gameutils";
import moderatorStore, { UIRightFloatingState } from "../Store";
import { useState } from "react";
import styles from "./Index.module.scss";

export default function GameStatus() {
  const { uiState, setUIState, gameState, sendMessage } = moderatorStore();
  const [folding, setFolding] = useState(false);

  const openClicked = () => {
    console.log("openClicked");

    sendMessage(
      JSON.stringify({
        cmd: GameState.Open,
      })
    );
  };

  const lastCallClicked = () => {
    sendMessage(
      JSON.stringify({
        cmd: GameState.LastCall,
      })
    );
  };

  const closedClicked = () => {
    sendMessage(
      JSON.stringify({
        cmd: GameState.Closed,
      })
    );
  };

  const newGameClicked = () => {
    sendMessage(
      JSON.stringify({
        cmd: GameState.NewGame,
      })
    );
  };

  const onFold = async () => {
    // setFolding(true);

    // await delay(500);
    setUIState(UIRightFloatingState.Default);
    // setFolding(false);
  };

  const isOpen =
    gameState === GameState.Idle || gameState === GameState.NewGame;
  const isLastCallEnabled = gameState === GameState.Open;
  const isClosedEnabled = gameState === GameState.LastCall;
  const newGameEnabled = gameState === GameState.WinnerDeclared;

  return (
    <>
      {uiState === UIRightFloatingState.ShowGameStatus && (
        <Box
          id={styles.main}
          className={`${folding ? `${styles.animateRight}` : ""}`}
        >
          <Box id={styles.fold} onClick={() => onFold()} data-testid="fold">
            <Box className={styles.buttonBg}>
              <img src="/assets/game/next-icon.png" />
            </Box>
          </Box>

          <Box id={styles.sub}>
            <Box id={styles.background}></Box>
            <Box id={styles.floatingUIShow}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "0.5fr 1.5fr",
                  justifyContent: "center",
                }}
              >
                <img
                  id={styles.gameStatusIcon}
                  src="/assets/game/ui/float-controls-settings.png"
                />
                <Typography sx={{ margin: "auto" }}>GAME STATUS</Typography>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  justifyContent: "center",
                }}
              >
                <Box
                  id={styles.open}
                  onClick={() => openClicked()}
                  data-testid="open"
                  className={`${isOpen ? "" : `${styles.disabledColor}`}`}
                >
                  OPEN
                </Box>
                <Box
                  id={styles.lastCall}
                  onClick={() => lastCallClicked()}
                  data-testid="lastCall"
                  className={`${
                    isLastCallEnabled ? "" : `${styles.disabledColor}`
                  }`}
                >
                  LAST CALL
                </Box>
              </Box>
              <Box
                id={styles.closed}
                onClick={() => closedClicked()}
                data-testid="closed"
                className={`${
                  isClosedEnabled ? "" : `${styles.disabledColor}`
                }`}
              >
                CLOSED
              </Box>
              <Box
                id={styles.newGame}
                onClick={() => newGameClicked()}
                className={`${newGameEnabled ? "" : `${styles.disabledColor}`}`}
                data-testid="newGame"
              >
                NEW GAME
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
