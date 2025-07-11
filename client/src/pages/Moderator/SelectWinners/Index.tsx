import { Box, CardMedia, Typography } from "@mui/material";
import moderatorStore, { UIRightFloatingState } from "../Store";
import styles from "./Index.module.scss";
import { GameState, ZODIAC_LABELS } from "../../../../../common/gameutils";

export default function SelectWinners() {
  const outline = `/assets/game/signs/zodiac-race-selected-winning-balls-outline.png`;
  const check = `/assets/game/signs/floating-controls-winners-confirm.png`;
  const { uiState, setUIState, result, setResult, sendMessage, gameState } = moderatorStore();
  const confirmEnabled = result.length === 4;

  const onSelected = (index) => {
    if (gameState !== GameState.Closed) {
      return;
    }

    if (!result.includes(index) && result.length < 4) {
      setResult([...result, index]);
      console.log("selected " + index);
    }
  };

  const onConfirmed = () => {
    if (result.length === 4) {
      console.log("Confirmed2")

      let res = [];
      result.forEach((idx) => {
        res.push(`${idx}`);
      });

      sendMessage(JSON.stringify({
        cmd: GameState.WinnerDeclared,
        winnerOrders: res,
      }));
      setResult([]);
    }
  };

  const onFold = () => {
    setUIState(UIRightFloatingState.Default);
  };

  return (
    <>
      {uiState === UIRightFloatingState.ShowWinnersSelection && (
        <Box id={styles.main}>
          <Box
            id={styles.fold}
            onClick={() => onFold()}
            data-testid="foldWinnerSelection"
          >
            <Box className={styles.buttonBg}>
              <img src="/assets/game/next-icon.png" />
            </Box>
          </Box>
          <Box id={styles.sub}>
            <Box id={styles.background}></Box>
            <Box id={styles.contents}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "0.5fr 1.5fr",
                  justifyContent: "center",
                }}
              >
                <img
                  id={styles.winnerIcon}
                  src="/assets/game/ui/float-controls-winner.png"
                />
                <Typography sx={{ margin: "auto" }}>WINNING BALLS</Typography>
              </Box>
              <Box id={styles.selectWinners}>
                {[...Array(12)].map((_, index) => (
                  <Box
                    onClick={() => {
                      onSelected(index);
                    }}
                    key={index}
                    className={styles.zodiacIcon}
                    data-testid={`${ZODIAC_LABELS[index].toLowerCase()}`}
                  >
                    <img
                      src={`/assets/game/signs/zodiac-race-${ZODIAC_LABELS[
                        index
                      ].toLowerCase()}-logo.png`}
                    />
                    {result.includes(index) && (
                      <img className={styles.selectedOutline} src={outline} />
                    )}
                    {result.includes(index) && (
                      <img className={styles.check} src={check} />
                    )}
                  </Box>
                ))}
              </Box>

              <Box
                onClick={() => onConfirmed()}
                id={styles.confirm}
                className={`${confirmEnabled ? "" : `${styles.disabledColor}`}`}
                disabled={!confirmEnabled}
                data-testid="confirm"
              >
                CONFIRM
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
