import {
  Grid,
  Typography,
  IconButton,
  Button,
  Box,
  styled,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import personIcon from "../../../assets/images/sidebar-menu-profile.png";
import avatarBlue from "../../../assets/images/avatar-blue.png";
import arrowRight from "../../../assets/images/arrow-right-black.png";
import arrowGrayRight from "../../../assets/images/arrow-left.png";
import personEdit from "../../../assets/images/person-edit.png";
import cameraIcon from "../../../assets/images/camera-icon.png";


import { useNavigate } from "react-router-dom";
import { ProfileUploadPhoto } from "./ProfleUploadPhoto";
import { useContext, useEffect, useState } from "react";
import { KYCPage4CameraUpload } from "../../KYC/mobile/KYCPage4/CameraUpload";
import { TAKE_PICTURE, UPLOAD_PICTURE } from "../../../constants";
import { uniqueFilename } from "../../../utils/logic";
import { useUserProfileContext } from "../../../context/UserProfileContext";
import { GlobalContext } from "../../../context/GlobalProvider";

const ChangeAvatarStyled = styled(Button)(() => ({
  background: "linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)",
  color: "#000000",
  padding: "15px 10px",
  boxShadow: "none",
  "&:hover": {
    background: "linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)",
    color: "#000000",
  },
}));

const UpdateInfoStyled = styled(Button)(() => ({
  background: "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
  color: "#FFFFFF",
  padding: "20px 10px",
  boxShadow: "none",
  "&:hover": {
    background: "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
    color: "#FFFFFF",
  },
}));

export const MobileUserProfile = () => {
  const {
    auth: authInfo,
    setAuthInfo,
  } = useContext(GlobalContext) || {};

  const { id } = authInfo
  const navigate = useNavigate();
  const [openModalChangePhoto, setOpenModalChangePhoto] = useState(false);
  const [modalType, setModalType] = useState("");

  // FOR CAMERA SELFIE
  const [isTakingSelfie, setIsTakingSelfie] = useState(false);
  const [imagePicture, setImagePicture] = useState(null);


  // FOR FILE UPLOAD PHOTO
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);

  const handleChangePhoto = () => {
    setModalType("")
    setOpenModalChangePhoto(true);
  };

  const handleCloseModalChangePhoto = () => {
    setOpenModalChangePhoto(false);
  }

  const handleTakePhoto = () => {
    setModalType(TAKE_PICTURE)
    setOpenModalChangePhoto(true);
    if(authInfo?.profilePicture){
      setIsTakingSelfie(false)
    }else{
      setIsTakingSelfie(true)
    }
  }

  const handleFileUploadPhoto = () => {
    setModalType(UPLOAD_PICTURE)
    setOpenModalChangePhoto(true);
    if(authInfo?.profilePicture){
      setIsUploadFile(false)
    }else{
      setIsUploadFile(true)
    }
  }

  const {
    userProfileState,
    actions: {
      uploadProfilePic
    },
  } = useUserProfileContext();


  useEffect(() => {
    if (userProfileState.isUploadedProfilePic) {
      setAuthInfo({
        ...authInfo,
        profilePicture: userProfileState.data,
      });
      setImagePicture(userProfileState.data)
      setIsTakingSelfie(false)
      setImage(null)
    }
  },[userProfileState.isUploadedProfilePic])

  const handleUploadPhoto = async (
    type: any,
    webcamRef: any,
    image: any
  ) => {
    if (type === "user") {
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

            uploadProfilePic(id, formData, type);

            // setModalType("")
            // setImagePicture(null)
          } else {
            console.error("Failed to capture image.");
          }
        } else {
          console.error("No image or webcam reference.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleUploadImage = async (editorGovtIdPic: any) => {
    // @ts-ignore
    const canvas = editorGovtIdPic.getImageScaledToCanvas();

    // Create a new canvas to resize the image
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = 250;
    resizedCanvas.height = 250;

    const ctx = resizedCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(canvas, 0, 0, 250, 250);
    }

    // Convert the resized canvas to a blob
    const blob: Blob = await new Promise((resolve: any) =>
      resizedCanvas.toBlob(resolve, "image/jpeg")
    );

    const file = new File([blob], uniqueFilename, { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", file);
    const type = "user";

    uploadProfilePic(id, formData, type);
  };

  const handleCloseSelfie = () => {
      setModalType("")
      setImagePicture(null)
      setIsTakingSelfie(false)
  }

  const handleOnRetake = () => {
    setIsUploadFile(false)
    setImage(null)
    setEditor(null)
  }

  const handleBack = () => {
    setModalType("")
  }

  return (
    <>
    <Grid container direction="column" sx={{ height: "100vh" }}>
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ pt: 1 }}
        >
          <Grid item>
            <IconButton onClick={() => navigate("/")}>
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography fontFamily="Baloo" fontSize={18} fontWeight={600}>
              Edit Profile
            </Typography>
          </Grid>
          <Grid item pr={1}>
            <IconButton
              aria-label="notification"
              onClick={() => {}}
              sx={{ pl: 0 }}
            >
              <Box component="img" width={20} src={personIcon} />
            </IconButton>
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
      <Grid
        item
        px={2}
        py={2}
        sx={{
          height: "80vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Grid container direction="column" mt={1} gap={2}>
          <Grid item>
            <ChangeAvatarStyled fullWidth onClick={() => handleChangePhoto()}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item mr={1}>
                  <Box
                    component="img"
                    width={25}
                    alt="Person Edit"
                    src={cameraIcon}
                    sx={{ display: "flex", alignItems: "center" }}
                  />
                </Grid>
                <Grid item xs>
                  <Typography textAlign="left" fontSize={14} fontWeight={400} color="#FFFFFF">
                    Change Photo
                  </Typography>
                </Grid>
                <Grid item mr={1}>
                  <Box
                    component="img"
                    width={15}
                    alt="Arrow Right"
                    src={arrowGrayRight}
                    sx={{ display: "flex", alignItems: "center" }}
                  />
                </Grid>
              </Grid>
            </ChangeAvatarStyled>
          </Grid>
          <Grid item>
            <UpdateInfoStyled fullWidth>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item mr={1}>
                  <Box
                    component="img"
                    width={25}
                    alt="Person Edit"
                    src={personEdit}
                    sx={{ display: "flex", alignItems: "center" }}
                  />
                </Grid>
                <Grid item xs>
                  <Typography textAlign="left" fontSize={14} fontWeight={400} color="#FFFFFF">
                    Update Information
                  </Typography>
                </Grid>
                <Grid item mr={1}>
                  <Box
                    component="img"
                    width={15}
                    alt="Arrow Right"
                    src={arrowGrayRight}
                    sx={{ display: "flex", alignItems: "center" }}
                  />
                </Grid>
              </Grid>
            </UpdateInfoStyled>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <ProfileUploadPhoto
      userId={id}
      onTakePhoto={handleTakePhoto}
      onFileUpload={handleFileUploadPhoto}
      openModal={openModalChangePhoto}
      onCloseModal={handleCloseModalChangePhoto}
      modalType={modalType}
      uploadTheSelfie={handleUploadPhoto}
      onUploadImage={handleUploadImage}
      imagePicture={imagePicture}
      setImagePicture={setImagePicture}
      govtType="user"
      profilePhoto={authInfo?.profilePicture}
      isTakingSelfie={isTakingSelfie}
      setIsTakingSelfie={setIsTakingSelfie}
      closeSelfie={handleCloseSelfie}
      image={image}
      setImage={setImage}
      editor={editor}
      setEditor={setEditor}
      onRetake={handleOnRetake}
      onBack={handleBack}
      isUploadFile={isUploadFile}
    />
    </>
  );
};
