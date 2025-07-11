import { Box, Grid, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// @ts-ignore
import AvatarEditor from "react-avatar-editor";
import { KYCPage4CameraUpload } from "../KYCPage4/CameraUpload";
import kycTopRightId from "../../../../assets/images/kyc-top-right-id.png";
import { CAMERA_BACK, CAMERA_FRONT } from "../../../../constants";

export const KYCPage7 = (props: any) => {
  const {
    onPrevStep,
    id,
    govtPicture,
    isTakingSelfie,
    setIsTakingSelfie,
    imageGovtPicture,
    setImageGovtPicture,
    uploadTheSelfie,
  } = props;

  const renderCameraUpload = () => {
    return (
      <>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2, px: 3 }}
          >
            <Grid item sx={{ ml: -2 }}>
              <IconButton
                onClick={() => {
                  onPrevStep();
                }}
              >
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
          <KYCPage4CameraUpload
            id={id}
            isTakingSelfie={isTakingSelfie}
            setIsTakingSelfie={setIsTakingSelfie}
            imageGovtPicture={imageGovtPicture}
            setImageGovtPicture={setImageGovtPicture}
            uploadTheSelfie={uploadTheSelfie}
            govtId={govtPicture}
            presentation={false}
            isFront={true}
            govtType="govt"
          />
        </Grid>
      </>
    );
  };

  return (
    <Grid container direction="column">
      {renderCameraUpload()}
    </Grid>
  );
};
