import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import {
  GameState,
  ZODIAC_COLORS,
  ZODIAC_LABELS,
  hasValue,
  mapToArray,
} from "../../../../common/gameutils.ts";

import { playerStore } from "./PlayerStore.tsx";
import Sidebar from "./Sidebar.tsx";
import Video from "./Video.tsx";
import styles from "./Index.module.scss";
import { create } from "zustand";
import "./styles.scss";

export default function Player() {
  const { connect } = playerStore.getState();

  useEffect(() => {
    connect();
    return () => {
      const { socket } = playerStore.getState();
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <Box>
      {/* <Video /> */}
      <BettingState />
      <BetNowButton />
      <WinnerState />
      <ShowingTopWinners />
    </Box>
  );
}


function BettingState() {
  const { showBetting, gameState } = playerStore();

  return (
    <>
      {(showBetting && gameState !== GameState.WinnerDeclared) && (
      <Box>
        <Buttons />
        <BettingModal />
        <BetAmountPrompt />
      </Box>
      )}
    </>
  )
}

function Buttons() {
  const dir = "/assets/game/signs/zodiac-race-";
  const { 
    gameState, setOpenModal, setTempSelectedIndex,
    odds, nets, setShowBetting, slots
  } = playerStore();

  const isBettingTime = gameState === GameState.OpenBetting;

  const handleButtonClick = (index) => {
    setOpenModal(true);
    setTempSelectedIndex(index);
  };

  const getOdds = (index) => {
    let str = "0.00";
    if (odds.has(`${index}`)) {
      return odds.get(`${index}`);
    }

    return str;
  };

  // const getNet = (index) => {
  //   let str = "0";
  //   if (nets.has(`${index}`)) {
  //     return nets.get(`${index}`);
  //   }
  //   return str;
  // };

  return (
    <Box id={styles.zodiacModal}>
      <Box id={styles.title}>
        <img src="/assets/game/ui/zodiac-race-bet-coin.png"></img>
        <Typography align="center" className={styles.totalBetText}>
          Bet On Your Balls Now!
        </Typography>
        <img 
          src="/assets/game/ui/zodiac-race-minimize-icon.png"
          onClick={() => setShowBetting(false)}
        />
      </Box>
      <Box id={styles.buttons}>
        {[...Array(12)].map((_, index) => (
          <Box key={index} className={styles.zodiac}>
            <Typography align="center" className={styles.totalBetText}>
              {/* {getNet(index)} */}
            </Typography>
            <Box 
              className={styles.button}
              sx={{ backgroundColor: `${ZODIAC_COLORS[index]}` }}
              onClick={() => handleButtonClick(index) }
            >
              <img src={`${dir}${ZODIAC_LABELS[index].toLowerCase()}-logo.png`} />
              <ShowSignsOrOdds 
                odds={getOdds(index)}
                label={ZODIAC_LABELS[index].toUpperCase()}
                bet={slots.get(`${index}`)}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function ShowSignsOrOdds(props) {
  // console.log(props.odds)
  let str = `${props.label}`;
  if (props.odds > 0) {
    str = `${props.odds}`;
  }
  if (props.bet > 0) {
    str = `${props.odds}: ${props.bet}`;
  }
  return (
    <Typography align="center" className={styles.signName}>
      {str}
    </Typography>
  );
}

function BettingModal() {
  /*
    Change the icon and title to the zodiac sign
    Show list of bets
      10, 20, 50, 100, 500, All in
      Custom amount input
    Bet
    Cancel
  */
  return (
    <Box>
      
    </Box>
  );
}

function BetAmountPrompt() {
  const { openModal, setOpenModal, bet, setBet } = playerStore();
  const { selectedButton, setSelectedButton, slots, setSlots } = playerStore();
  const {
    tempSelectedIndex,
    setSelectedIndex,
    sendMessage,
    setLastSelectedIndex,
  } = playerStore();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOptionSelect = (value) => {
    setBet(value);
    handleClose();

    setSelectedButton(
      tempSelectedIndex === selectedButton ? null : tempSelectedIndex
    );

    if (selectedButton === null) {
      setSelectedIndex(tempSelectedIndex);
    } else {
      setSelectedIndex(-1);
    }

    slots.set(`${tempSelectedIndex}`, value);
    setSlots(slots);

    console.log(slots)

    sendMessage(
      JSON.stringify({
        slots: mapToArray(slots)
      })
    );
    setLastSelectedIndex(tempSelectedIndex);

    // console.log("Send");
  };

  return (
    <div>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Select an Option</DialogTitle>
        <DialogContent id={styles.dialog}>
          <Button 
            className="bet-amount" variant="contained" onClick={() => handleOptionSelect(10)}
          >
            10
          </Button>
          <Button 
            className="bet-amount" variant="contained" onClick={() => handleOptionSelect(20)}
          >
            20
          </Button>
          <Button 
            className="bet-amount" variant="contained" onClick={() => handleOptionSelect(50)}
          >
            50
          </Button>
          <Button 
            className="bet-amount" variant="contained" onClick={() => handleOptionSelect(100)}
          >
            100
          </Button>
          <Button 
            className="bet-amount" variant="contained" onClick={() => handleOptionSelect(500)}
          >
            500
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Typography align="center" style={{ fontSize: "1.0rem" }}>
        Bet: {bet}
      </Typography> */}
    </div>
  );
}


function BetNowButton() {
  const { showBetting, setShowBetting } = playerStore();

  return (
    <>
      {!showBetting && (
      <Box sx={{ 
          position: "fixed",
          bottom: "7%",
          right: "0%",
        }}>
        <img
          id={styles.betNow}
          src="/assets/game/ui/betnow.gif"
          onClick={() => setShowBetting(true)}
        />
      </Box>
      )}
    </>
  )
}

function WinnerState() {
  // For testing
  // const showWin = true;
  // const setShowTopWinners = (show) => {};
  // const showTopWinners = false;
  // const prize = 100;

  const { gameState, prize } = playerStore();
  const showWin = (gameState === GameState.WinnerDeclared && prize > 0);
  const { showTopWinners, setShowTopWinners } = localStore();

  function onShowTopWinners() {
    setShowTopWinners(true);
  }

  return (
    <>
      {(showWin && !showTopWinners) && (
      <Box id={styles.winnerBg} onClick={() => onShowTopWinners() }>
        <Box id={styles.winnerTextBox}>
          <Typography variant="h5" align="center">
            Congratulations
          </Typography>
          <Typography variant="h5" align="center">
            You have won
          </Typography>
          <Typography variant="h5" align="center">
            {prize}
          </Typography>
        </Box>
      </Box>
      )}
    </>
  );
}

function ShowingTopWinners() {
  // const topPlayers = [
  //   { name: "Player 1", prize: 100 },
  //   { name: "Player 2", prize: 200 },
  //   { name: "Player 3", prize: 300 },
  //   { name: "Player 4", prize: 400 },
  // ];
  // const showTopWinners = true;

  const { topPlayers } = playerStore();
  const { showTopWinners } = localStore();

  let p = [...topPlayers];
  const MIN_COUNT = 3;
  if (p.length < MIN_COUNT) {
    const missingCount = MIN_COUNT - p.length;
    for (let i = 0; i < missingCount; i++) {
      p.push({ name: "Unnamed", prize: "Prize" });
    }
  }

  return (
    <>
      {showTopWinners && (
      <Box id={styles.topPlayersContainer}>
        <Box id={styles.topPlayerContainerTexts}>
          <Typography variant="h5" align="center">
            Top Winners
          </Typography>
          {[...Array(3)].map((_, index) => (
          <Box key={index} id={styles.rowTexts}>
            <Typography variant="h5" align="center">
              {index + 1}: {p[index].name}
            </Typography>
            <Typography variant="h5" align="center">
              {p[index].prize}
            </Typography>
          </Box>
          ))}
        </Box>
      </Box>
      )}
    </>
  );
}

const localStore = create((set) => ({
  showTopWinners: false,
  setShowTopWinners: (s) => {
    set({ showTopWinners: s })
  }
}));


playerStore.subscribe(
  (state) => {
    const { gameState, prize, topPlayers } = state;
    const hasPrize = hasValue(prize) && prize > 0;
    const hasTopPlayers = hasValue(topPlayers[0]);

    localStore.setState( {showTopWinners: false });

    if (gameState === GameState.WinnerDeclared && 
      !hasPrize &&
      hasTopPlayers) {
      localStore.setState({ showTopWinners: true });
    }
  }
)

