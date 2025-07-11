import { CREDITS_MODALS } from "../../constants";
import { Grid, Typography } from "@mui/material";

export const useModalCredits = (optionType: any) => {
  const renderAddCredits = () => {
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h6" component="h2">
          {CREDITS_MODALS.ADD_CREDITS.title}
        </Typography>
      </Grid>
    );
  };

  const renderModalTitle = () => {
    if (optionType === CREDITS_MODALS.ADD_CREDITS.name) {
      return renderAddCredits();
    }
  };

  return {
    renderModalTitle,
  };
};
