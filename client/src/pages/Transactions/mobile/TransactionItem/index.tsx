import { Grid, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import {
  allSmallLetters,
  capitalizeFirstLetter,
  paymentStatus,
} from "../../../../utils/logic";
import { BET, WITHDRAWAL } from "../../../../constants";

export const TransactionItem = (props: any) => {
  const { values } = props;
  let fontColor = "#00A24A";
  let integerSign = "+";
  if (
    allSmallLetters(values.type) === WITHDRAWAL ||
    allSmallLetters(values.type) === BET
  ) {
    fontColor = "#FF2020";
    integerSign = "-";
  }

  return (
    <Button fullWidth variant="text" sx={{ p: 0, my: "5px" }}>
      <Grid
        item
        xs={12}
        sx={{
          border: "1px solid #C4C4C4",
          borderRadius: "5px",
          p: 1,
        }}
      >
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  textAlign="left"
                  fontFamily="Baloo"
                  fontSize={14}
                  color="#000000"
                >
                  {capitalizeFirstLetter(values.type)}
                </Typography>
              </Grid>
              <Grid item mt="5px">
                <Typography fontFamily="Baloo" fontSize={14} color="#5B5B5B">
                  {dayjs(values.createdAt).format("YYYY-MM-DD HH:mm")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  fontFamily="Baloo"
                  fontSize={14}
                  fontWeight={600}
                  color={fontColor}
                >
                  {`${integerSign}₱ ${Number(values.amount).toFixed(2)}`}
                </Typography>
              </Grid>
              <Grid item mt="5px">
                <Typography fontFamily="Baloo" fontSize={12} color="#000000">
                  {capitalizeFirstLetter(paymentStatus(values.status))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Button>
  );
};
