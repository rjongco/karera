import {
  Box,
  Grid,
  Typography,
  styled,
  Button,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import kyc6Img1 from "../../../../assets/images/kyc6-image-1.png";
import kyc6Img2 from "../../../../assets/images/kyc6-image-2.png";
import kyc6Img3 from "../../../../assets/images/kyc6-image-3.png";
import kycTopRightId from "../../../../assets/images/kyc-top-right-id.png";

const NextButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 1%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
}));

export const KYCPage6 = (props: any) => {
  const { onPreperationForKYC7, onPrevStep } = props;

  return (
    <Grid container direction="column">
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
            <Typography>Upload Selfie</Typography>
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
      <Grid item>
        <Grid
          container
          direction="column"
          sx={{ height: "83vh" }}
          justifyContent="space-between"
        >
          <Grid item>
            <Grid container direction="column" sx={{ mt: 2, px: 4 }}>
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
                        <Typography
                          fontSize={14}
                          fontWeight={400}
                          color={"#000000"}
                          sx={{ my: "5px" }}
                        >
                          Upload a selfie holding your valid identification
                          document.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" alignItems="flex-end">
                      <Box
                        component="img"
                        alt="KYC Page 6 Image 1"
                        src={kyc6Img1}
                        height={80}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sx={{ mt: 2 }}>
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
                        <Typography
                          fontSize={14}
                          fontWeight={400}
                          color={"#000000"}
                          sx={{ my: "5px" }}
                        >
                          Ensure that the environment is well-lit and your face
                          is clear.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" alignItems="flex-end">
                      <Box
                        component="img"
                        alt="KYC Page 6 Image 2"
                        src={kyc6Img2}
                        height={80}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sx={{ mt: 2 }}>
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
                        <Typography
                          fontSize={14}
                          fontWeight={400}
                          color={"#000000"}
                          sx={{ my: "5px" }}
                        >
                          Please do not wear hats, masks, or eyeglasses that may
                          obscure your face.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" alignItems="flex-end">
                      <Box
                        component="img"
                        alt="KYC Page 6 Image 3"
                        src={kyc6Img3}
                        height={80}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item px={4} mb={2}>
            <NextButton
              variant="contained"
              fullWidth
              sx={{ py: "10px" }}
              onClick={() => onPreperationForKYC7()}
            >
              <Typography fontSize={14}>Start</Typography>
            </NextButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
