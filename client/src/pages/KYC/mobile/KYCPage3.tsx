import {
  Box,
  Grid,
  IconButton,
  Typography,
  styled,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import BadgeIcon from "@mui/icons-material/Badge";
import kyc3ID1 from "../../../assets/images/kyc3-id-1.png";
import kyc3UploadFile from "../../../assets/images/kyc3-upload-file.png";
import kyc3TakeSelfie from "../../../assets/images/kyc3-take-selfie.png";
import kycTopRightId from "../../../assets/images/kyc-top-right-id.png";

const ImageButton = styled(Button)(() => ({
  background: "transparent",
  boxShadow: "none",
  borderRadius: "35px",
}));

export const KYCPage3 = (props: any) => {
  const { onNextStep, onPrevStep, onOpenUploadImage } = props;

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
            <Typography>Upload Valid Document</Typography>
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
          sx={{ backgroundColor: "#5B5B5B", height: "85vh" }}
          justifyContent="space-between"
        >
          <Grid item>
            <Grid container direction="column" sx={{ mt: 2, px: 4 }}>
              <Grid item sx={{ px: 0, mt: 1 }}>
                <Typography
                  fontSize={15}
                  fontWeight={400}
                  color={"#FFFFFF"}
                  textAlign="center"
                >
                  Take a photo of your ID or choose one from your albums and put
                  well in the frame
                </Typography>
              </Grid>
              <Grid item sx={{ px: 0, mt: 3 }}>
                <Grid container direction="column" alignItems="center">
                  <Box
                    component="img"
                    alt="KYC 3 ID"
                    src={kyc3ID1}
                    width={280}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item mb={4}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                position: "absolute",
                bottom: 0,
                mb: 2,
                width: "100%",
              }}
            >
              <Grid item xs={4}>
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item ml={1}>
                    <ImageButton
                      variant="text"
                      fullWidth
                      onClick={() => onOpenUploadImage("fileUpload")}
                    >
                      <Box
                        component="img"
                        alt="KYC 3 Upload File"
                        src={kyc3UploadFile}
                        width={50}
                      />
                    </ImageButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <ImageButton
                  variant="text"
                  fullWidth
                  onClick={() => onOpenUploadImage("cameraUpload")}
                >
                  <Box
                    component="img"
                    alt="KYC 3 Take Selfie"
                    src={kyc3TakeSelfie}
                    width={80}
                  />
                </ImageButton>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
