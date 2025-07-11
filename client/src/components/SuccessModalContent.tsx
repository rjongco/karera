import { Box, Grid, Typography, styled, Button } from "@mui/material";

import signupCheckIcon from "../assets/images/signup-check-icon.png";
import { MODALS } from "../constants/modals";

const SuccessButtonStyled = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  padding: "5px 40px",
  borderRadius: "30px",
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  padding: "10px 0",
};

export const SuccessModalContent = (props: any) => {
  const { handleClose, modalType }: { handleClose: any; modalType?: any } =
    props;
  return (
    <Box sx={style}>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ p: "15px 10px 30px 10px" }}
      >
        <Grid item>
          <Box
            component="img"
            alt="Signup Banner"
            src={signupCheckIcon}
            height={57}
          />
        </Grid>
        <Grid item sx={{ mt: 2 }}>
          <Typography fontSize={14} fontWeight={600}>
            {/* @ts-ignore */}
            {MODALS[modalType].title}
          </Typography>
        </Grid>
        <Grid item sx={{ mt: 2 }}>
          <Typography
            fontSize={11}
            fontWeight={400}
            textAlign="center"
            sx={{ mx: 4 }}
          >
            {/* @ts-ignore */}
            {MODALS[modalType].content}
          </Typography>
        </Grid>
        <Grid item sx={{ mt: 3 }}>
          <SuccessButtonStyled
            variant="contained"
            fullWidth
            onClick={handleClose}
          >
            <Typography
              fontSize={14}
              fontWeight={400}
              textAlign="center"
              color="#FFFFFF"
            >
              Lets Go!
            </Typography>
          </SuccessButtonStyled>
        </Grid>
      </Grid>
    </Box>
  );
};
