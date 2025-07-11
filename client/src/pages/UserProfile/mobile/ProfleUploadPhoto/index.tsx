import { Grid, Box, Typography, Divider, Button, styled } from "@mui/material"
import { PopupModal } from "../../../../components/PopupModal";
import { CAMERA_FRONT, TAKE_PICTURE, UPLOAD_PICTURE, USER_PROFILE } from "../../../../constants";
import { KYCPage4CameraUpload } from "../../../KYC/mobile/KYCPage4/CameraUpload";
import { KYCPage4FileUpload } from "../../../KYC/mobile/KYCPage4/FileUpload";

  const CancelButton = styled(Button)(() => ({
    background: "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
    color: "#000000",
    padding: "15px 120px",
    boxShadow: "none",
    borderRadius:"35px",
    "&:hover": {
      background: "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
      color: "#000000",
    },
  }));

  
export const ProfileUploadPhoto = (props:any) => {
    const { 
        userId,
        openModal, 
        onCloseModal, 
        onTakePhoto, 
        onFileUpload,
        modalType, 
        
        uploadTheSelfie,
        imagePicture,
        setImagePicture,
        govtType,
        profilePhoto,
        isTakingSelfie,
        setIsTakingSelfie,
        closeSelfie,

        image,
        setImage,
        onUploadImage,
        editor,
        setEditor,
        onRetake,
        isUploadFile,
        onBack
     } = props
    
    const style = {
        position: "absolute" as "absolute",
        bottom: "0",
        left: "50%",
        transform: "translate(-50%, 100%)",  // Start off-screen
        width: "100vw",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        bgcolor: "background.paper",
        boxShadow: 24,
        padding: "0",
        animation: openModal ? "slide-up 0.3s ease-in-out forwards" : "slide-down 0.3s ease-in-out forwards"
    };

    const renderModalContent = () => {
        if(modalType === TAKE_PICTURE){
            return (
                <KYCPage4CameraUpload
                    id={userId}
                    isTakingSelfie={isTakingSelfie}
                    setIsTakingSelfie={setIsTakingSelfie}
                    presentation={true}
                    isFront={true}
                    govtType={govtType}
                    imageGovtPicture={imagePicture}
                    setImageGovtPicture={setImagePicture}
                    uploadTheSelfie={uploadTheSelfie}
                    profilePhoto={profilePhoto}
                    govtId={null}
                    closeSelfie={closeSelfie}
                    onBack={onBack}
                />
            )
        }else if(modalType === UPLOAD_PICTURE){
            return (
                <KYCPage4FileUpload
                    variant={USER_PROFILE}
                    image={image}
                    setImage={setImage}
                    onUploadImage={onUploadImage}
                    id={userId}
                    profilePhoto={profilePhoto}
                    govtIdPicture={null}
                    editor={editor}
                    setEditor={setEditor}
                    onRetake={onRetake}
                    skipUploadFileOrCam={isUploadFile}
                    onBack={onBack}
              />
            )
        }

        return (
            <Box sx={style}>
                <Grid container direction="column" alignItems="center" my={4}>
                    <Grid item mt={2}>
                        <Button variant="text" onClick={() => onTakePhoto()} sx={{padding:0,margin:0}}>
                            <Typography
                                fontFamily="Baloo"
                                fontSize={24}
                                fontWeight={500}
                                color="#000000"
                                textAlign="center"
                            >
                                Take Photo
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item my={2} px={4}>
                        <Divider sx={{width:"80vw",border:"1px solid #C4C4C4"}} />
                    </Grid>
                    <Grid item>
                        <Button variant="text" onClick={() => onFileUpload()}>
                            <Typography
                                fontFamily="Baloo"
                                fontSize={24}
                                fontWeight={500}
                                color="#000000"
                                textAlign="center"
                            >
                                Choose from Gallery
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item my={2} px={4}>
                        <Divider sx={{width:"80vw",border:"1px solid #C4C4C4"}} />
                    </Grid>
                    <Grid item>
                        <Button variant="text" onClick={() => {}}>
                            <Typography
                                fontFamily="Baloo"
                                fontSize={24}
                                fontWeight={500}
                                color="#000000"
                                textAlign="center"
                            >
                                Remove Photo
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item mt={4} px={4}>
                        <CancelButton
                            fullWidth
                            onClick={() => onCloseModal()}
                        >
                            <Typography fontFamily="Baloo" color="#FFFFFF" fontSize={20}>
                                Cancel
                            </Typography>
                        </CancelButton>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    /*
      
    */

    return (
        <PopupModal
          openModal={openModal}
          onCloseModal={onCloseModal}
        >
          {renderModalContent()}
        </PopupModal>
      );
}