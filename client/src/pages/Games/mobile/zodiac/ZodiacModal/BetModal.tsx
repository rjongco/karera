import { Box } from "@mui/system";
import { PopupModal } from "../../../../../components/PopupModal";
import { Grid, Typography } from "@mui/material";
import zodiacRaceCongratulations from "../../../../../assets/images/zodiac-race-congratulations.png";
import { BET_WINNER } from "../../../../../constants";

import zodiacRaceNewGame from "../../../../../assets/images/zodiac-race-new-game.png";

export const BetModal = (props: any) => {
  const { openModal, typeModal, onCloseModal } = props;

  const style = {
    position: "absolute" as "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75vw",
    padding: "0",
  };

  const betWinnerModalContent = () => {
    return (
      <Box sx={style}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ position: "relative" }}
        >
          <Grid item>
            <Box
              component="img"
              src={zodiacRaceCongratulations}
              sx={{ width: "270px" }}
            />
          </Grid>
          <Grid item sx={{ position: "absolute", top: 90, left: 0, right: 0 }}>
            <Typography
              fontFamily="Baloo"
              fontSize={24}
              fontWeight={400}
              color="#FFFFFF"
              textAlign="center"
            >
              You have won
            </Typography>
          </Grid>
          <Grid item mt={1}>
            <Typography
              fontFamily="Baloo"
              fontSize={48}
              fontWeight={800}
              textAlign="center"
              color="#FFE400"
            >
              ₱ 5,728.43
            </Typography>
          </Grid>
          <Grid item mt={1}>
            <Typography
              fontFamily="Baloo"
              fontSize={13}
              fontWeight={400}
              textAlign="center"
              color="#FFFFFF"
            >
              The amount has been credited to your wallet.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const newGameModalContent = () => {
    return (
      <Box sx={style}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ position: "relative" }}
        >
          <Grid item>
            <Box
              component="img"
              src={zodiacRaceNewGame}
              sx={{ width: "270px" }}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderModalContent = (contentType: string) => {
    if (contentType === BET_WINNER) {
      return betWinnerModalContent();
    }
    return newGameModalContent();
  };
  return (
    <PopupModal openModal={openModal} onCloseModal={onCloseModal} darkerOpacity>
      {renderModalContent(typeModal)}
    </PopupModal>
  );
};
