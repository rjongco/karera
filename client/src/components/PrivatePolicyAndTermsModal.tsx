import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  styled,
} from "@mui/material";
import { MODALS } from "../constants/modals";
import CloseIcon from "@mui/icons-material/Close";

import { PRIVATE_PRIVACY, TERMS_AND_CONDITION_CONTENT } from "../constants";

const AgreeButtonStyled = styled(Button)(() => ({
  background: `linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)`,
  boxShadow: "none",
  padding: "5px 40px",
  borderRadius: "40px",
  fontSize: "11px",
  paddingTop: "10px",
  paddingBottom: "10px",
  fontWeight: 400,
}));

export const PrivatePolicyAndTermsModal = (props: any) => {
  const { contentType, onCloseModal } = props;
  if (contentType === PRIVATE_PRIVACY) {
    return (
      <>
        <Grid container direction="column" alignItems="center" px={1}>
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={"10px"}
            >
              <Grid item pl={3} />
              <Grid item>
                <Typography fontSize={16} fontWeight={600} mt={1} mb={0}>
                  {MODALS[PRIVATE_PRIVACY].title}
                </Typography>
              </Grid>
              <Grid item pr={"3px"} mt={-2}>
                <IconButton aria-label="Close Modal" onClick={onCloseModal}>
                  <CloseIcon sx={{ color: "#000" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              p={2}
              sx={{ height: "50vh", overflowY: "scroll" }}
            >
              {MODALS[PRIVATE_PRIVACY].content}
            </Grid>
          </Grid>
        </Grid>
        <Grid item mt={2}>
          <Grid container justifyContent="center" mt={3} mb={2}>
            <AgreeButtonStyled
              variant="contained"
              onClick={() => onCloseModal(contentType)}
            >
              Agree
            </AgreeButtonStyled>
          </Grid>
        </Grid>
      </>
    );
  } else if (contentType === TERMS_AND_CONDITION_CONTENT) {
    return (
      <>
        <Grid container direction="column" alignItems="center" px={1}>
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={"10px"}
            >
              <Grid item pl={3} />
              <Grid item>
                <Typography fontSize={16} fontWeight={600} mt={1} mb={0}>
                  {MODALS[TERMS_AND_CONDITION_CONTENT].title}
                </Typography>
              </Grid>
              <Grid item pr={"3px"} mt={-2}>
                <IconButton aria-label="Close Modal" onClick={onCloseModal}>
                  <CloseIcon sx={{ color: "#000" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              p={2}
              sx={{ height: "50vh", overflowY: "scroll" }}
            >
              {MODALS[TERMS_AND_CONDITION_CONTENT].content}
            </Grid>
          </Grid>
        </Grid>
        <Grid item mt={2}>
          <Grid container justifyContent="center" mt={3} mb={2}>
            <AgreeButtonStyled
              variant="contained"
              onClick={() => onCloseModal(contentType)}
            >
              Agree
            </AgreeButtonStyled>
          </Grid>
        </Grid>
      </>
    );
  }
};
