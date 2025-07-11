import {
  Box,
  Grid,
  Typography,
  styled,
  Button,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import kycID1 from "../../../assets/images/kyc-id-1.png";
import kycID2 from "../../../assets/images/kyc-id-2.png";
import kycID3 from "../../../assets/images/kyc-id-3.png";
import kycTopRightId from "../../../assets/images/kyc-top-right-id.png";

const NextButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 1%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
}));

export const KYCPage1 = (props: any) => {
  const { onNextStep, onPrevStep } = props;

  return (
    <Grid container direction="column" justifyContent="space-between">
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2, px: 3 }}
        >
          <Grid item sx={{ ml: -2 }}>
            <IconButton onClick={onPrevStep}>
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography>KYC Setting</Typography>
          </Grid>
          <Grid item>
            <Box
              component="img"
              alt="KYC Top Right ID"
              src={kycTopRightId}
              height={20}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignContent="center">
          <Grid
            item
            sx={{ pb: 1, borderBottom: "2px solid #C4C4C4", width: "95%" }}
          />
        </Grid>
      </Grid>
      <Grid item xs>
        <Grid
          container
          direction="column"
          height="100%"
          justifyContent="space-between"
        >
          <Grid item>
            <Grid container direction="column" sx={{ mt: 2, px: 2 }}>
              <Grid item>
                <Typography fontSize={16} fontWeight={600}>
                  Verification Process
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Grid item xs={8}>
                    <Grid container direction="column" alignItems="flex-start">
                      <Grid>
                        <Typography fontSize={14} fontWeight={600}>
                          Step 1 Upload ID Picture
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography
                          fontSize={12}
                          fontWeight={400}
                          sx={{ my: "5px" }}
                        >
                          Choose a valid ID and take a picture of the ID or
                          upload from the album.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" alignItems="flex-end">
                      <Box
                        component="img"
                        alt="KYC ID"
                        src={kycID1}
                        height={80}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignContent="center">
                  <Grid
                    item
                    sx={{
                      my: 2,
                      pb: 1,
                      borderBottom: "2px solid #C4C4C4",
                      width: "100%",
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Grid item xs={8}>
                    <Grid container direction="column" alignItems="flex-start">
                      <Grid>
                        <Typography fontSize={14} fontWeight={600}>
                          Step 2 Confirm Information
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography
                          fontSize={12}
                          fontWeight={400}
                          sx={{ my: "5px" }}
                        >
                          Review and update personal details as needed for
                          verification
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" alignItems="flex-end">
                      <Box
                        component="img"
                        alt="KYC ID"
                        src={kycID2}
                        height={80}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignContent="center">
                  <Grid
                    item
                    sx={{
                      my: 2,
                      pb: 1,
                      borderBottom: "2px solid #C4C4C4",
                      width: "100%",
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Grid item xs={8}>
                    <Grid container direction="column" alignItems="flex-start">
                      <Grid>
                        <Typography fontSize={14} fontWeight={600}>
                          Step 3 Upload Selfie
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography
                          fontSize={12}
                          fontWeight={400}
                          sx={{ my: "5px" }}
                        >
                          Upload a selfie holding your ID for verification
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" alignItems="flex-end">
                      <Box
                        component="img"
                        alt="KYC ID 3"
                        src={kycID3}
                        height={80}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              position: "absolute",
              bottom: 0,
              mb: 2,
              px: 2,
              width: "100%",
            }}
          >
            <NextButton
              variant="contained"
              fullWidth
              sx={{ py: "10px" }}
              onClick={() => onNextStep()}
            >
              <Typography fontSize={14}>Start</Typography>
            </NextButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
