import { Grid, Button, styled, Box, Typography, Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { CAMERA_FRONT, IMAGE_URL_GOVT, IMAGE_URL_USER } from "../../../../constants";
import changeSelfieMode from "../../../../assets/images/change-selfie-mode.png";
import backIconTakePhoto from "../../../../assets/images/back-icon-take-photo.png";
import kyc3TakeSelfie from "../../../../assets/images/kyc3-take-selfie.png";

const ImageButton = styled(Button)(() => ({
  background: "transparent",
  boxShadow: "none",
  borderRadius: "35px",
}));

const NextButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 1%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
}));

const RetakeButton = styled(Button)(() => ({
  background: "#FFFFFF",
  border: "1px solid #00A24A",
  boxShadow: "none",
  borderRadius: "35px",
  color: "#000",
}));

export const KYCPage4CameraUpload = (props: any) => {
  const {
    id,
    isTakingSelfie,
    setIsTakingSelfie,
    imageGovtPicture,
    setImageGovtPicture,
    uploadTheSelfie,
    govtType,
    presentation,
    isFront,
    govtId,
    profilePhoto,
    closeSelfie,
    onBack
  } = props;

  const [isFrontState, setIsFrontState] = useState(isFront)

  const webcamRef = useRef(null);

  console.log("~~~", isFrontState)

  useEffect(() => {
    const initializeWebcam = async () => {
      if (webcamRef.current) {
        //  @ts-ignore
        const webcam = webcamRef.current.videoElement;

        if (webcam && !webcam.srcObject) {
          // Check if webcam has no source object (not already initialized)
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          webcam.srcObject = stream;
        }

        webcam.play(); // Start playing the video
      }
    };

    if (!isTakingSelfie) {
      initializeWebcam();
    }

    return () => {
      // Cleanup: Stop video and release resources
      //  @ts-ignore
      if (webcamRef.current && webcamRef.current.videoElement) {
        //  @ts-ignore
        webcamRef.current.videoElement.pause();
        //  @ts-ignore
        const stream = webcamRef.current.videoElement.srcObject;
        if (stream) {
          //  @ts-ignore
          stream.getTracks().forEach((track) => track.stop());
        }
      }
    };
  }, [webcamRef, isTakingSelfie]);

  const videoConstraints = {
    facingMode: "environment", // This should switch to the back camera
  };

  const renderImage = () => {
    return (
      <>
        <Grid item px={2} my={1}>
          <img
            src={imageGovtPicture || undefined}
            style={{
              position: "absolute",
              textAlign: "center",
              zIndex: 8,
              right: 0,
              left: 0,
              margin: "0 auto",
              height: "60%",
              width: "90%", // Set width to 90% of the container
              maxWidth: "100%", // Ensure the webcam doesn't exceed container width
              objectFit: "cover", // Maintain aspect ratio while covering the container
            }}
          />
        </Grid>
        <Grid
          item
          px={4}
          mb={2}
          sx={{
            position: "absolute",
            bottom: 0,
            mb: 2,
            px: 2,
            width: "100%",
          }}
        >
          <RetakeButton
            variant="contained"
            fullWidth
            sx={{ py: "10px", mb: 2 }}
            onClick={() => setImageGovtPicture(null)}
          >
            <Typography fontSize={14} color={"#00A24A"}>
              Retake
            </Typography>
          </RetakeButton>
          <NextButton
            variant="contained"
            fullWidth
            sx={{ py: "10px" }}
            onClick={() =>
              uploadTheSelfie(govtType, webcamRef.current, imageGovtPicture)
            }
          >
            <Typography fontSize={14}>Save</Typography>
          </NextButton>
        </Grid>
      </>
    );
  };

  const capture = (e: any) => {
    e.preventDefault();
    // Check if webcamRef.current is not null before calling getScreenshot()
    if (webcamRef.current) {
      //  @ts-ignore
      setImageGovtPicture(webcamRef.current.getScreenshot());
    }
  };

  const handleRetake = () => {
    setIsTakingSelfie(true);
    setImageGovtPicture(null)
  };

  const handleChangeSelfieMode = () => {

  }

  const renderCamera = () => {
    return (
      <>
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
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={4}>
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item >
                    <ImageButton
                      variant="text"
                      fullWidth
                      onClick={() => onBack()}
                    >
                      <Box
                        component="img"
                        alt="Back Icon"
                        src={backIconTakePhoto}
                        width={40}
                      />
                    </ImageButton>
                  </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
              <ImageButton variant="text" fullWidth onClick={capture}>
                <Box
                  component="img"
                  alt="KYC 3 Take Selfie"
                  src={kyc3TakeSelfie}
                  width={80}
                />
              </ImageButton>
            </Grid>
            <Grid item xs={4}>
                <Grid container direction="column" alignItems="flex-end">
                  <Grid item >
                    {presentation && (
                    <ImageButton
                      variant="text"
                      fullWidth
                      onClick={() => setIsFrontState(false)}
                    >
                      <Box
                        component="img"
                        alt="Change Selfie Mode"
                        src={changeSelfieMode}
                        width={40}
                      />
                    </ImageButton>
                    )}
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Grid
      container
      xs
      direction="column"
      alignItems="flex-start"
      justifyContent="space-between"
      pt={2}
      sx={{
        backgroundColor: "#5B5B5B",

        height: "92vh",
      }}
    >
      {isTakingSelfie ? (
        <Grid container direction="column">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            imageSmoothing
            style={{
              display: imageGovtPicture ? "none" : "block",
              position: "absolute",
              textAlign: "center",
              zIndex: 8,
              right: 0,
              left: 0,
              margin: "0 auto",
              height: "60%",
              width: "90%", // Set width to 90% of the container
              maxWidth: "100%", // Ensure the webcam doesn't exceed container width
              objectFit: "cover", // Maintain aspect ratio while covering the container
            }}
            videoConstraints={isFrontState ? {} : videoConstraints}
          />
          {imageGovtPicture ? (
            renderImage()
          ) : (
            <>
              <Grid item sx={{ width: "99vw" }}></Grid>
              {renderCamera()}
            </>
          )}
        </Grid>
      ) : (
        govtId ? (
          <Grid container direction="column">
            <Grid item px={4} pt={0}>
              <img
                src={`${IMAGE_URL_GOVT}/${id}/${govtId}` || undefined}
                alt="Government ID"
                style={{
                  position: "absolute",
                  textAlign: "center",
                  zIndex: 8,
                  right: 0,
                  left: 0,
                  margin: "0 auto",
                  height: "60%",
                  width: "90%", // Set width to 90% of the container
                  maxWidth: "100%", // Ensure the webcam doesn't exceed container width
                  objectFit: "cover", // Maintain aspect ratio while covering the container
                }}
              />
            </Grid>
            <Grid
              item
              px={4}
              mb={2}
              sx={{
                position: "absolute",
                bottom: 0,
                mb: 2,
                px: 2,
                width: "100%",
              }}
            >
              <RetakeButton
                variant="contained"
                fullWidth
                sx={{ py: "10px", mb: 2 }}
                onClick={() => handleRetake()}
              >
                <Typography fontSize={14} color={"#00A24A"}>
                  Retake
                </Typography>
              </RetakeButton>
              <NextButton
                variant="contained"
                fullWidth
                sx={{ py: "10px" }}
                onClick={() =>
                  uploadTheSelfie(govtType, webcamRef.current, imageGovtPicture)
                }
              >
                <Typography fontSize={14}>Save</Typography>
              </NextButton>
            </Grid>
          </Grid>
        ) : (
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Grid item mt={6} px={4} pt={0}>
                <Avatar 
                    alt="Profile Photo" 
                    src={`${IMAGE_URL_USER}/${id}/${profilePhoto}`}
                    sx={{ width: 200, height: 200 }}
                />
                {/* <img
                  src={`${IMAGE_URL_USER}/${id}/${profilePhoto}` || undefined}
                  alt="Government ID"
                  style={{
                    position: "absolute",
                    textAlign: "center",
                    zIndex: 8,
                    right: 0,
                    left: 0,
                    margin: "0 auto",
                    height: "60%",
                    width: "90%", // Set width to 90% of the container
                    maxWidth: "100%", // Ensure the webcam doesn't exceed container width
                    objectFit: "cover", // Maintain aspect ratio while covering the container
                  }}
                /> */}
              </Grid>
              <Grid
                item
                px={4}
                mb={2}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  mb: 2,
                  px: 2,
                  width: "100%",
                }}
              >
                <RetakeButton
                  variant="contained"
                  fullWidth
                  sx={{ py: "10px", mb: 2 }}
                  onClick={() => handleRetake()}
                >
                  <Typography fontSize={14} color={"#00A24A"}>
                    Retake
                  </Typography>
                </RetakeButton>
                <NextButton
                  variant="contained"
                  fullWidth
                  sx={{ py: "10px" }}
                  onClick={() =>
                    closeSelfie()
                  }
                >
                  <Typography fontSize={14}>Close</Typography>
                </NextButton>
              </Grid>
            </Grid>
        )
      )}
    </Grid>
  );
};
