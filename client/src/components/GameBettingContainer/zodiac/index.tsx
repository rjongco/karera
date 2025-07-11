import { Grid, Box, Typography, Button } from "@mui/material";
import zodiacRaceBetCoin from "../../../assets/images/zodiac-race-bet-coin.png";
import zodiacRaceMinimizeIcon from "../../../assets/images/zodiac-race-minimize-icon.png";
import { ZodiacField } from "./ZodiacField";
import { ZODIACS_MENU } from "../../../constants/zodiacsMenu";
import { ZODIACS } from "../../../constants";
import { useState } from "react";
import { PopupModal } from "../../PopupModal";
import waitingIcon from "../../../assets/images/waiting-icon.png";
import { styled } from "@mui/system";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",

  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  padding: "10px 0",
};

const OkayButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
}));

export const GameBettingContainer = (props: any) => {
  const { values, onTypeModal, setFieldValue, setShowBetDialog, isOpenOrLast } =
    props;

  const [openModal, setOpenModal] = useState(false);

  const handleOnTypeModal = (data: any) => {
    if (isOpenOrLast()) {
      onTypeModal(data);
    } else {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const renderBody = () => {
    return (
      <>
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Box
                component="img"
                alt="Race Bet Icon"
                src={zodiacRaceBetCoin}
                width={20}
              />
            </Grid>
            <Grid item>
              <Typography
                fontSize={15}
                fontWeight={600}
                color="#03923D"
                textAlign="left"
                ml={1}
              >
                Bet On Your Zodiac Balls Now!
              </Typography>
            </Grid>
            <Grid item ml={1}>
              <Box
                component="img"
                alt="Race Bet Icon"
                src={zodiacRaceMinimizeIcon}
                width={20}
                onClick={() => {
                  setShowBetDialog(false);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item ml={1} mt={1}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            <Grid item xs={4}>
              {ZODIACS_MENU.filter(
                (o: any) =>
                  o.name === ZODIACS.ARIES ||
                  o.name === ZODIACS.CANCER ||
                  o.name === ZODIACS.LIBRA ||
                  o.name === ZODIACS.CAPRICORN
              ).map((o: any) => (
                <div key={`game-betting-${o.name}`}>
                  <ZodiacField
                    zodiacs={o}
                    value={values[o.name]}
                    setFieldValue={setFieldValue}
                    onTypeModal={handleOnTypeModal}
                  />
                </div>
              ))}
            </Grid>
            <Grid item xs={4}>
              {ZODIACS_MENU.filter(
                (o: any) =>
                  o.name === ZODIACS.TAURUS ||
                  o.name === ZODIACS.LEO ||
                  o.name === ZODIACS.SCORPIO ||
                  o.name === ZODIACS.AQUARIUS
              ).map((o: any) => (
                <div key={`game-betting-${o.name}`}>
                  <ZodiacField
                    zodiacs={o}
                    value={values[o.name]}
                    setFieldValue={setFieldValue}
                    onTypeModal={handleOnTypeModal}
                  />
                </div>
              ))}
            </Grid>
            <Grid item xs={4}>
              {ZODIACS_MENU.filter(
                (o: any) =>
                  o.name === ZODIACS.GEMINI ||
                  o.name === ZODIACS.VIRGO ||
                  o.name === ZODIACS.SAGITTARIUS ||
                  o.name === ZODIACS.PISCES
              ).map((o: any) => (
                <div key={`game-betting-${o.name}`}>
                  <ZodiacField
                    zodiacs={o}
                    value={values[o.name]}
                    setFieldValue={setFieldValue}
                    onTypeModal={handleOnTypeModal}
                  />
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderModalContent = () => {
    return (
      <Box sx={style}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          px={2}
          sx={{ width: "265px" }}
        >
          <Grid item mt={2}>
            <Box component="img" src={waitingIcon} sx={{ width: "50px" }} />
          </Grid>

          <Grid item mt={2}>
            <Typography fontFamily="Baloo" fontSize={24} fontWeight={600}>
              Oopss!
            </Typography>
          </Grid>
          <Grid item mt={2}>
            <Typography fontFamily="Baloo" fontSize={14} fontWeight={400}>
              You can’t bet at this moment.
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontFamily="Baloo" fontSize={14} fontWeight={400}>
              Please wait for the next game.
            </Typography>
          </Grid>

          <Grid item my={3}>
            <Typography fontFamily="Baloo" fontSize={14} fontWeight={400}>
              <OkayButton
                variant="contained"
                sx={{ px: 6, py: 1 }}
                onClick={handleCloseModal}
              >
                Okay
              </OkayButton>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <Grid
        container
        direction="column"
        px={2}
        py={2}
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "5px" }}
      >
        {renderBody()}
      </Grid>
      <PopupModal
        openModal={openModal}
        onCloseModal={handleCloseModal}
        darkerOpacity
      >
        {renderModalContent()}
      </PopupModal>
    </>
  );
};
