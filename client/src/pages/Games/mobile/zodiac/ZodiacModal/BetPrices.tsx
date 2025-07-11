import { Grid, TextField, Typography, Button, styled } from "@mui/material";

import { ZODIACS_BET_PRICE } from "../../../../../constants";
import { ZODIACS_BET_PRICE_MENU } from "../../../../../constants/zodiacBetPriceMenu";
import { BetPriceItem } from "./BetPriceItem";
import { useField } from "formik";

// @ts-ignore
const BetButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: 0,
  borderRadius: "15px",
  px: 2,
}));

// @ts-ignore
const CancelButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
  boxShadow: 0,
  borderRadius: "15px",
}));

export const BetPrices = (props: any) => {
  const { zodiac, selectedPrice, setSelectedPrice, onBet, onCancelBet } = props;
  // @ts-ignore
  const [field, meta, helpers] = useField(zodiac.name);

  const firstRow = ZODIACS_BET_PRICE_MENU.filter(
    (o: any) =>
      o.name === ZODIACS_BET_PRICE[10] ||
      o.name === ZODIACS_BET_PRICE[20] ||
      o.name === ZODIACS_BET_PRICE[50]
  );

  const secondRow = ZODIACS_BET_PRICE_MENU.filter(
    (o: any) =>
      o.name === ZODIACS_BET_PRICE[100] ||
      o.name === ZODIACS_BET_PRICE[500] ||
      o.name === ZODIACS_BET_PRICE["ALLIN"]
  );

  const handleOnSelectPrice = (value: any) => {
    helpers.setValue(value);
  };

  return (
    <Grid container direction="column" pb={2}>
      <Grid item>
        <BetPriceItem
          data={firstRow}
          onSelectPrice={handleOnSelectPrice}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          zodiacName={zodiac.name}
        />
      </Grid>
      <Grid item>
        <BetPriceItem
          data={secondRow}
          onSelectPrice={handleOnSelectPrice}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          zodiacName={zodiac.name}
        />
      </Grid>
      <Grid item px={1} mt={2}>
        <TextField
          type="number"
          fullWidth
          size="small"
          placeholder="Enter your bet amount"
          variant="outlined"
          name={zodiac.name}
          value={field.value || ""}
          inputProps={{
            min: 10, // Set the minimum value
            max: 100, // Set the maximum value
            style: {
              border:
                meta.touched && !!meta.error
                  ? "1px solid #d32f2f"
                  : "1px solid #999999",
              borderRadius: "5px",
              width: "100%",
              color: "#000000",
              paddingTop: "6px",
              height: "15px",
            },
          }}
          onChange={(e) => {
            helpers.setValue(e.target.value);

            setSelectedPrice((prev: any) => ({
              ...prev,
              [zodiac.name]: e.target.value.split(".")[0],
            }));
          }}
          error={meta.touched && !!meta.error}
        />
        <Grid item px={1} mt={2}>
          <Typography fontSize={13} fontWeight={600} textAlign="center">
            Minimum bet amount is ₱ 10.00
          </Typography>
        </Grid>
        <Grid item px={1} pt={2}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Grid item>
              <BetButton
                variant="contained"
                sx={{ px: 1, py: 0.5 }}
                onClick={onBet}
              >
                <Typography fontSize={14} fontWeight={600} textAlign="center">
                  BET
                </Typography>
              </BetButton>
            </Grid>
            <Grid item>
              <CancelButton
                variant="contained"
                sx={{ px: 1, py: 0.5 }}
                onClick={onCancelBet}
              >
                <Typography fontSize={14} fontWeight={600} textAlign="center">
                  CANCEL
                </Typography>
              </CancelButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
