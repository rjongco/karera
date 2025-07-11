import { Grid, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { IMAGE_URL_GOVT } from "../../constants";

export const CameraUpload = (props: any) => {
  const {
    closeSelfie,
    isTakingSelfie,
    uploadTheSelfie,
    values,
    authInfo,

    setImageGovtPicture,
    imageGovtPicture,
  } = props;

  const webcamRef = useRef(null);

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

  const capture = (e: any) => {
    e.preventDefault();
    // Check if webcamRef.current is not null before calling getScreenshot()
    if (webcamRef.current) {
      //  @ts-ignore
      setImageGovtPicture(webcamRef.current.getScreenshot());
    }
  };

  const renderImage = () => {
    return (
      <>
        <Grid item>
          <img src={imageGovtPicture || undefined} alt="Captured" />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              uploadTheSelfie(webcamRef.current, imageGovtPicture);
            }}
            sx={{ mr: 1 }}
            color="info"
          >
            Save
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setImageGovtPicture(null)}
            color="warning"
          >
            Cancel
          </Button>
        </Grid>
      </>
    );
  };

  const renderCamera = () => {
    return (
      <>
        <Grid item>
          <Button
            variant="contained"
            size="small"
            onClick={capture}
            sx={{ mr: 1 }}
            color="success"
          >
            Capture
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => closeSelfie()}
            color="warning"
          >
            Cancel
          </Button>
        </Grid>
      </>
    );
  };

  return (
    <Grid container direction="column">
      {isTakingSelfie ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            imageSmoothing
            width={320}
            height={240}
            style={{
              display: imageGovtPicture ? "none" : "block",
              marginBottom: "5px",
            }}
          />
          {imageGovtPicture ? renderImage() : renderCamera()}
        </>
      ) : (
        authInfo?.govtPicture && (
          <img
            src={
              `${IMAGE_URL_GOVT}/${authInfo?.id}/${authInfo.govtPicture}` ||
              undefined
            }
            alt="Captured"
            width={320}
            height={240}
          />
        )
      )}
    </Grid>
  );
};
