import { Grid, Typography } from "@mui/material";
import { GlobalContext } from "../../../../../context/GlobalProvider";
import { useContext } from "react";
import { ZODIACS_BET_PRICE } from "../../../../../constants";

export const BetPriceItem = (props: any) => {
  const { data, onSelectPrice, selectedPrice, setSelectedPrice, zodiacName } =
    props;
  // @ts-ignore
  const { auth } = useContext(GlobalContext);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{
        pt: 1.5,
        pb: 0,
        px: 1.5,
        width: "100%",
        mb: 0,
      }}
      gap={1}
    >
      {data.map((o: any, i: number) => {
        let keyName = null;

        for (const key in selectedPrice) {
          if (
            selectedPrice.hasOwnProperty(key) &&
            selectedPrice[key] === o.label
          ) {
            keyName = key;
            break;
          }
        }

        return (
          <Grid
            key={`zodiac-bet-price-${o.label}`}
            item
            xs
            sx={{
              backgroundColor:
                zodiacName === keyName && o.label === selectedPrice[zodiacName]
                  ? "#03923D"
                  : "#D9D9D9",
            }}
            onClick={() => {
              let value = 0;
              let valueSelector = "0";
              if (o.label === ZODIACS_BET_PRICE["ALLIN"]) {
                value = auth?.wallet?.ballance || "0";
                valueSelector = ZODIACS_BET_PRICE["ALLIN"];
              } else {
                value = o.label;
                valueSelector = o.label;
              }
              // @ts-ignore
              const convertVal = parseFloat(value).toFixed(2);
              onSelectPrice(convertVal);

              setSelectedPrice((prev: any) => ({
                ...prev,
                [zodiacName]: valueSelector,
              }));
            }}
          >
            <Typography
              fontSize={14}
              color="#FFFFFF"
              fontWeight={600}
              textAlign="center"
            >
              {o.label}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};
