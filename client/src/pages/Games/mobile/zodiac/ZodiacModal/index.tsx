import { Grid, Box, Typography, Avatar } from "@mui/material";
import { PopupModal } from "../../../../../components/PopupModal";
import { BetPrices } from "./BetPrices";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75vw",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "0",
};

interface TypeModalProps {
  bgColor?: string;
  label?: string;
  logo?: string;
}

interface ZodiacModalProps {
  openModal: Boolean;
  onCloseModal: () => void;
  typeModal: TypeModalProps;
  values: {};
  onBet: () => void;
  onCancelBet: () => void;
}

export const ZodiacModal = (props: ZodiacModalProps) => {
  const { openModal, onCloseModal, typeModal, values, onBet, onCancelBet } =
    props;
  const [selectedPrice, setSelectedPrice] = useState({});
  const { label, bgColor, logo } = typeModal;

  const renderModalContent = () => {
    return (
      <Box sx={style}>
        <Grid
          container
          direction="column"
          sx={{
            width: "100%",
          }}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                py: 1,
                px: 1.5,
                backgroundColor: bgColor,
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            >
              <Grid item>
                <Avatar
                  src={logo}
                  sx={{ width: "40px", height: "40px", p: 0, m: 0 }}
                />
              </Grid>
              <Grid item xs ml={1.5}>
                <Typography
                  fontSize={20}
                  color="#FFFFFF"
                  fontWeight={600}
                  textAlign="left"
                >
                  {label}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <BetPrices
              zodiac={typeModal}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              onBet={onBet}
              onCancelBet={onCancelBet}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <PopupModal
      openModal={openModal}
      onCloseModal={onCloseModal}
      values={values}
    >
      {renderModalContent()}
    </PopupModal>
  );
};
