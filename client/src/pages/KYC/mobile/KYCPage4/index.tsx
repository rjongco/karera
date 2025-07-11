import { Box, Grid, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// @ts-ignore
import AvatarEditor from "react-avatar-editor";
import { KYCPage4FileUpload } from "./FileUpload";
import { KYCPage4CameraUpload } from "./CameraUpload";
import kycTopRightId from "../../../../assets/images/kyc-top-right-id.png";
import { CAMERA_BACK, KYC } from "../../../../constants";

export const KYCPage4 = (props: any) => {
  const {
    onNextStep,
    onPrevStep,
    image,
    setImage,
    onUploadImage,
    id,
    govtIdPicture,
    govtPicture,
    editor,
    setEditor,
    uploadImageProcess,
    skipUploadFileOrCam,
    onRetake,
    onBack,
    isTakingSelfie,
    imageGovtPicture,
    setImageGovtPicture,
    uploadTheSelfie,
  } = props;

  const renderFileUpload = () => {
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
                  setEditor(null);
                  setImage(null);
                  onPrevStep();
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography>Confirm Valid Document</Typography>
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
          <KYCPage4FileUpload
            variant={KYC}
            image={image}
            setImage={setImage}
            onNextStep={onNextStep}
            onUploadImage={onUploadImage}
            id={id}
            govtIdPicture={govtIdPicture}
            govtPicture={govtPicture}
            editor={editor}
            setEditor={setEditor}
            skipUploadFileOrCam={skipUploadFileOrCam}
            onRetake={onRetake}
            onBack={onBack}
          />
        </Grid>
      </>
    );
  };

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
                  setEditor(null);
                  setImage(null);
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
            imageGovtPicture={imageGovtPicture}
            setImageGovtPicture={setImageGovtPicture}
            uploadTheSelfie={uploadTheSelfie}
            govtId={govtIdPicture}
            govtType="govtIdPic"
            presentation={false}
            isFront={false}
            onBack={onBack}
          />
        </Grid>
      </>
    );
  };

  return (
    <Grid container direction="column">
      {uploadImageProcess === "fileUpload" && renderFileUpload()}

      {uploadImageProcess === "cameraUpload" && renderCameraUpload()}
    </Grid>
  );
};
