import { useContext, useEffect, useState } from "react";
import { KYCPage1 } from "./KYCPage1";
import { KYCPage2 } from "./KYCPage2";
import { useNavigate } from "react-router-dom";
import { KYCPage3 } from "./KYCPage3";
import { KYCPage4 } from "./KYCPage4";
import { getDefaultDateFormat, uniqueFilename } from "../../../utils/logic";
import { useUserProfileContext } from "../../../context/UserProfileContext";
import { GlobalContext } from "../../../context/GlobalProvider";
import { KYCPage5 } from "./KYCPage5";
import { KYCPage6 } from "./KYCPage6";
import { KYCPage7 } from "./KYCPage7";
import { PopupModal } from "../../../components/PopupModal";
import { Box, Grid, Button, Typography, styled } from "@mui/material";
import kyc7GuardIcon from "../../../assets/images/kyc7-guard-icon.png";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",

  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  padding: "10px 0",
};

const PlayNowButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(185, 80%, 51%, 1) 0%, hsla(205, 92%, 62%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
}));

export const MobileKYC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [uploadImageGovtType, setUploadImageGovtType] = useState("");
  const [uploadImageProcess, setUploadImageProcess] = useState("");
  const [skipUploadFileOrCam, setSkipUploadFileOrCam] = useState(false);
  // @ts-ignore
  const { auth: authInfo, setAuthInfo } = useContext(GlobalContext) || {};
  const { id, govtIdPicture, govtPicture, govtType } = authInfo;
  const {
    // @ts-ignore
    userProfileState,
    // @ts-ignore
    actions: {
      // @ts-ignore
      uploadProfilePic,
      // @ts-ignore
      updateUserProfile,
      // @ts-ignore
      removeProfilePicture,
      // @ts-ignore
      finishKYC,
    },
  } = useUserProfileContext() || {};

  const navigate = useNavigate();

  const [steps, setSteps] = useState(1);
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);

  const [isTakingSelfie, setIsTakingSelfie] = useState(false);
  const [imageGovtPicture, setImageGovtPicture] = useState(null);
  const handleCloseModal = () => setOpenModal(false);

  const [formDataKYC, setFormDataKYC] = useState({
    firstName: "",
    lastName: "",
    gender: 0,
    birthdate: "",
    placeOfBirth: "",
    nationalities: "",
    natureOfWork: "",
    mobile: "",
    email: "",
    address: "",
    govType: 0,
    usePresentAddress: false,
    currentAddresses: {
      street: "",
      barangayId: "",
      CitiesId: "",
      provinceId: "",
      zipCode: "",
    },
    permanentAddresses: {
      street: "",
      barangayId: "",
      CitiesId: "",
      provinceId: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    if (authInfo) {
      const {
        firstName,
        lastName,
        role,
        profilePicture,
        uuid,
        currentAddress,
        permanentAddress,
        ...rest
      } = authInfo;

      setFormDataKYC({
        ...rest,
        firstName: firstName,
        lastName: lastName,
        permanentAddresses: {
          street: permanentAddress?.street || "",
          barangayId: permanentAddress?.barangay || "",
          cityId: permanentAddress?.city || "",
          provinceId: permanentAddress?.province || "",
          zipCode: permanentAddress?.zipCode || "",
        },
        currentAddresses: {
          street: currentAddress?.street || "",
          barangayId: currentAddress?.barangay || "",
          cityId: currentAddress?.city || "",
          provinceId: currentAddress?.province || "",
          zipCode: currentAddress?.zipCode || "",
        },
      });
    }
  }, [authInfo]);

  useEffect(() => {
    if (userProfileState.isUploadedProfilePic) {
      if (uploadImageGovtType === "govt") {
        setAuthInfo({
          ...authInfo,
          govtPicture: userProfileState?.data,
        });
        setIsTakingSelfie(false);
      } else if (uploadImageGovtType === "govtIdPic") {
        setAuthInfo({
          ...authInfo,
          govtIdPicture: userProfileState?.data,
        });
        setIsTakingSelfie(false);
        setImage(null);
        setEditor(null);
      }
    }
  }, [userProfileState.isUploadedProfilePic]);

  useEffect(() => {
    if (steps === 0) {
      navigate("/home");
      setSteps(0);
    } else {
      setSteps(steps);
    }
  }, [steps]);

  const handleOpenUploadImage = (type: any) => {
    setIsTakingSelfie(true);
    setImageGovtPicture(null);
    setUploadImageProcess(type);
    setUploadImageGovtType("govtIdPic");
    handleNextStep();
  };

  const handlePreperationForKYC7 = () => {
    if (govtPicture) {
      setIsTakingSelfie(false);
    } else {
      setIsTakingSelfie(true);
    }

    setImageGovtPicture(null);
    setUploadImageProcess("fileUpload");
    setUploadImageGovtType("govt");
    handleNextStep();
  };

  const handleNextStep = () => {
    if (steps === 2) {
      if (govtIdPicture) {
        // setUploadImageProcess("fileUpload");
        // setUploadImageGovtType("govtIdPic");
        setSkipUploadFileOrCam(true);
        // setIdType(data);
        setSteps((prev) => prev + 2);
      } else {
        setSkipUploadFileOrCam(false);
        setSteps((prev) => prev + 1);
      }
    } else {
      setSkipUploadFileOrCam(false);
      setSteps((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (steps === 4) {
      if (govtIdPicture) {
        setUploadImageProcess("fileUpload");
        setUploadImageGovtType("govtIdPic");
        setSkipUploadFileOrCam(false);
        setSteps((prev) => prev - 1);
      } else {
        setSkipUploadFileOrCam(false);
        setSteps((prev) => prev - 1);
      }
    } else if (steps === 5) {
      if (govtIdPicture) {
        setUploadImageProcess("fileUpload");
        setUploadImageGovtType("govtIdPic");
        setSkipUploadFileOrCam(true);
        setSteps((prev) => prev - 1);
      } else {
        setSkipUploadFileOrCam(true);
        setSteps((prev) => prev - 1);
      }
    } else {
      setSkipUploadFileOrCam(false);
      setSteps((prev) => prev - 1);
    }
  };

  const handleUploadImage = async (editorGovtIdPic: any) => {
    // @ts-ignore
    const canvas = editorGovtIdPic.getImageScaledToCanvas();

    // Create a new canvas to resize the image
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = 400;
    resizedCanvas.height = 251;

    const ctx = resizedCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(canvas, 0, 0, 400, 251);
    }

    // Convert the resized canvas to a blob
    const blob: Blob = await new Promise((resolve: any) =>
      resizedCanvas.toBlob(resolve, "image/jpeg")
    );

    const file = new File([blob], uniqueFilename, { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", file);
    const type = "govtIdPic";

    uploadProfilePic(id, formData, type);
  };

  const handleSubmitGovtType = (values: any) => {
    const { govTypeMobile } = values;
    setAuthInfo({
      ...authInfo,
      govtType: govTypeMobile,
    });

    if (govtIdPicture) {
      setUploadImageProcess("fileUpload");
      setUploadImageGovtType("govtIdPic");
      setSkipUploadFileOrCam(true);
      // setIdType(data);
      setSteps((prev) => prev + 2);
    } else {
      setSkipUploadFileOrCam(false);
      setSteps((prev) => prev + 1);
    }
  };

  const handleUploadGovtIds = async (
    govtType: any,
    webcamRef: any,
    image: any
  ) => {
    if (govtType === "govtIdPic") {
      try {
        // Check if webcamRef.current and image are not null before uploading
        if (webcamRef && image) {
          //  @ts-ignore
          const capturedImage = webcamRef.getScreenshot();
          if (capturedImage) {
            const blob = await fetch(capturedImage).then((res) => res.blob());
            const file = new File([blob], uniqueFilename, {
              type: "image/jpeg",
            });
            const formData = new FormData();
            formData.append("image", file);
            uploadProfilePic(id, formData, govtType);
            setUploadImageProcess("selfieUpload");
            setUploadImageGovtType(govtType);
            setSkipUploadFileOrCam(false);

            setSteps((prev) => prev + 1);
          } else {
            console.error("Failed to capture image.");
          }
        } else {
          console.error("No image or webcam reference.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else if (govtType === "govt") {
      try {
        // Check if webcamRef.current and image are not null before uploading
        if (webcamRef && image) {
          //  @ts-ignore
          const capturedImage = webcamRef.getScreenshot();
          if (capturedImage) {
            const blob = await fetch(capturedImage).then((res) => res.blob());
            const file = new File([blob], uniqueFilename, {
              type: "image/jpeg",
            });
            const formData = new FormData();
            formData.append("image", file);
            uploadProfilePic(id, formData, govtType);
            setUploadImageProcess("selfieUpload");
            setUploadImageGovtType(govtType);
            setSkipUploadFileOrCam(false);
            setSteps((prev) => prev - 6);
            setOpenModal(true);
          } else {
            console.error("Failed to capture image.");
          }
        } else {
          if (govtPicture) {
            setSteps((prev) => prev - 6);
            setOpenModal(true);
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleRetake = () => {
    setSkipUploadFileOrCam(true);
    setSteps((prev) => prev - 1);
  };

  const handleBack = () => {
    setSkipUploadFileOrCam(true);
    setSteps((prev) => prev - 1);
  };

  const handleSubmitForm = (values: any) => {
    const {
      birthdate,
      currentAddresses,
      permanentAddresses,
      usePresentAddress,
      ...rest
    } = values;
    const newCurrentAddresses = {
      street: currentAddresses.street,
      provinceId: currentAddresses.provinceId.id,
      cityId: currentAddresses.cityId.id,
      barangayId: currentAddresses.barangayId.id,
      zipCode: currentAddresses.zipCode,
    };
    const permaCurrentAddresses = {
      street: permanentAddresses.street,
      provinceId: permanentAddresses.provinceId.id,
      cityId: permanentAddresses.cityId.id,
      barangayId: permanentAddresses.barangayId.id,
      zipCode: permanentAddresses.zipCode,
    };

    const newForm = {
      birthdate: getDefaultDateFormat(birthdate),
      usePresentAddress: usePresentAddress,
      currentAddresses: newCurrentAddresses,
      permanentAddresses: permaCurrentAddresses,
      ...rest,
    };
    updateUserProfile(newForm);
    setSteps((prev) => prev + 1);
  };

  const renderKYCS = (steps: any) => {
    if (steps === 2) {
      return (
        <KYCPage2
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          govtType={govtType}
          values={authInfo}
          userProfileState={userProfileState}
          handleSubmit={handleSubmitGovtType}
        />
      );
    } else if (steps === 3) {
      return (
        <KYCPage3
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          onOpenUploadImage={handleOpenUploadImage}
        />
      );
    } else if (steps === 4) {
      return (
        <KYCPage4
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          image={image}
          setImage={setImage}
          editor={editor}
          setEditor={setEditor}
          onUploadImage={handleUploadImage}
          id={id}
          govtIdPicture={govtIdPicture}
          uploadImageProcess={uploadImageProcess}
          skipUploadFileOrCam={skipUploadFileOrCam}
          isTakingSelfie={isTakingSelfie}
          setImageGovtPicture={setImageGovtPicture}
          imageGovtPicture={imageGovtPicture}
          govtPicture={govtPicture}
          uploadTheSelfie={handleUploadGovtIds}
          onRetake={handleRetake}
          onBack={handleBack}
        />
      );
    } else if (steps === 5) {
      return (
        <KYCPage5
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          values={formDataKYC}
          userProfileState={userProfileState}
          handleSubmit={handleSubmitForm}
        />
      );
    } else if (steps === 6) {
      return (
        <KYCPage6
          onPreperationForKYC7={handlePreperationForKYC7}
          onPrevStep={handlePrevStep}
        />
      );
    } else if (steps === 7) {
      return (
        <KYCPage7
          id={id}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          govtPicture={govtPicture}
          imageGovtPicture={imageGovtPicture}
          setImageGovtPicture={setImageGovtPicture}
          isTakingSelfie={isTakingSelfie}
          setIsTakingSelfie={setIsTakingSelfie}
          uploadTheSelfie={handleUploadGovtIds}
        />
      );
    }

    return <KYCPage1 onNextStep={handleNextStep} onPrevStep={handlePrevStep} />;
  };

  const handleGoToHome = () => {
    finishKYC();
    // @ts-ignore
    const timer = setTimeout(() => {
      navigate("/");
    }, 1000);

    () => clearTimeout(timer);
  };

  const renderModalContent = () => {
    return (
      <Box sx={style}>
        <Grid container direction="column" alignItems="center">
          <Grid sx={{ mt: 2 }}>
            <Box
              component="img"
              alt="KYC Success Guard Icon"
              src={kyc7GuardIcon}
              height={100}
            />
          </Grid>
          <Grid sx={{ mt: "2px" }}>
            <Typography fontSize={14} fontWeight={600}>
              Thank You!
            </Typography>
          </Grid>
          <Grid sx={{ mt: 3, mb: 3, px: 8, textAlign: "center" }}>
            <Typography fontSize={11} fontWeight={400}>
              Please wait within 24 hours for the review of your KYC
              application.
            </Typography>
          </Grid>
          <Grid sx={{ mt: 1, mb: 4 }}>
            <PlayNowButton
              variant="contained"
              fullWidth
              sx={{ px: 6 }}
              onClick={() => handleGoToHome()}
            >
              <Typography fontSize={14} fontWeight={600}>
                Okay
              </Typography>
            </PlayNowButton>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <>
      {renderKYCS(steps)}
      {/* <Button onClick={() => setOpenModal(true)}>test</Button> */}
      <PopupModal openModal={openModal} onCloseModal={handleCloseModal}>
        {renderModalContent()}
      </PopupModal>
    </>
  );
};
