import { useEffect } from "react";
import Box from "@mui/material/Box";
import SelectWinners from "./SelectWinners/Index.tsx";
import moderatorStore, { UIRightFloatingState } from "./Store.tsx";
import styles from './Index.module.scss';
import GameStatus from "./GameStatus/Index.tsx";
import Video from "../Player/Video.tsx";

function Host() {
  const { connect } = moderatorStore();

  useEffect(() => {
    connect();
    return () => {
      const { socket } = moderatorStore.getState();
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <Box sx={{
      position: "fixed",
      width: "100%",
      height: "100%",
      zIndex: "-1"
    }}>
      {/* <Video /> */}

      <FloatingUIFolded />
      <GameStatus />
      <GameOptions />
      <SelectWinners />
    </Box>
  );
}

function FloatingUIFolded() {
  const { uiState } = moderatorStore();
  return (
    <>
      {uiState === UIRightFloatingState.Default && (
      <Box>
        <FloatingUI />
      </Box>
      )}
    </>
  )
}

function FloatingUI() {
  const { setUIState } = moderatorStore();

  const showGameStatus = () => {
    setUIState(UIRightFloatingState.ShowGameStatus);
  }

  const showWinnersSelection = () => {
    setUIState(UIRightFloatingState.ShowWinnersSelection);
  }

  return (
    <Box id={styles.drawerHidden} sx={{ position: "relative" }}>
      <img
        onClick={() => showGameStatus()}
        className={styles.drawerImages}
        data-testid="gameStates"
        src="/assets/game/ui/float-controls-settings.png"
      />
      <img
        onClick={() => showWinnersSelection()}
        className={styles.drawerImages}
        data-testid="winnerSelection"
        src="/assets/game/ui/float-controls-winner.png"
      />
    </Box>
  )
}

function GameOptions() {
  return (
    <Box sx={{ 
        position: "absolute",
        bottom: "0%",
        left: "2%",
        
      }}>
      <img
        id={styles.gameOption}
        src="/assets/game/ui/game-hamburger.png"
      />
    </Box>
  )
}

export default Host;


