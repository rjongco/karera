import { 
    Grid, 
    Box,
    Slider,
    FormControl,
    FormHelperText,
    Typography,
    IconButton,
    Button,
    styled,
    Avatar
 } from "@mui/material"
// @ts-ignore
import AvatarEditor from "react-avatar-editor";
import { IMAGE_URL_GOVT, IMAGE_URL_USER, KYC, USER_PROFILE } from "../../../../constants";
import kyc4ID1 from "../../../../assets/images/kyc4-id-1.png";
import profileAvatar from "../../../../assets/images/profile-avatar.png";
import kycAvatarId from "../../../../assets/images/kyc-avatar-id.png";
import { useRef } from "react";

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

const ChooseAvatarButton = styled(Button)(() => ({
    background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 1%, hsla(142, 100%, 28%, 1) 100%)",
    boxShadow: "none",
    borderRadius: "35px",
}));

const BackButton = styled(Button)(() => ({
    background: "#FFFFFF",
    border: "1px solid #00A24A",
    boxShadow: "none",
    borderRadius: "35px",
    color: "#000",
}));


export const FileUploadEditor = (props:any) => {
    const { 
        id, 
        variant,
        image, 
        setEditor, 
        ratio, 
        handleChangeSlider, 
        ratioChoices, 
        govtIdPicture, 
        errors,
        editor,
        handleImageChange,
        profilePhoto,
        onUploadImage,
        onRetake,
        onNextStep,
        onBack
    } = props

    const fileInputRefGovtIdPic = useRef<HTMLInputElement>(null);

    const handleUploadImage = async () => {
        if (fileInputRefGovtIdPic.current) {
          // @ts-ignore
          fileInputRefGovtIdPic.current.value = ""; // Reset the value of the file input
        }
        if (editor) {
          onUploadImage(editor);
        }
    };
    
    const renderFileInput = () => {
        return (
          <Grid container direction="column" alignItems="center" mt={6}>
            <Grid item>
              <IconButton
                onClick={() => {
                  // @ts-ignore
                  document.getElementById("fileInputGovtIdPic").click();
                }}
              >
                <Box
                  component="img"
                  alt="KYC Avatar ID"
                  src={kycAvatarId}
                  width={260}
                />
              </IconButton>
            </Grid>
          </Grid>
        )
    }

    const renderProfilePlaceholder = () => {
        return (
          <Grid container direction="column" alignItems="center" mt={8}>
            <Grid item>
                <Box
                  component="img"
                  alt="User Profile Avatar"
                  src={profileAvatar}
                  width={260}
                />
            </Grid>
          </Grid>
        )
    }

    const handleSelectFile = () => {
        if (fileInputRefGovtIdPic.current) {
            fileInputRefGovtIdPic.current.click();
        } else {
            console.error('File input element not found.');
        }
    }

    const renderContentKYC = () => {
        return (
            <>
                <Grid item>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        sx={{ px: 5, mt: 2 }}
                    >
                        <Grid
                            item
                            sx={{
                            width: "22%",
                            p: "3px",
                            backgroundColor: "#2196F3",
                            borderRadius: "35px",
                            }}
                        />
                        <Grid
                            item
                            sx={{
                            width: "22%",
                            p: "3px",
                            backgroundColor: "#2196F3",
                            borderRadius: "35px",
                            }}
                        />
                        <Grid
                            item
                            sx={{
                            width: "22%",
                            p: "3px",
                            backgroundColor: "#C4C4C4",
                            borderRadius: "35px",
                            }}
                        />
                        <Grid
                            item
                            sx={{
                            width: "22%",
                            p: "3px",
                            backgroundColor: "#C4C4C4",
                            borderRadius: "35px",
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs>
                    {govtIdPicture !== null && (
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ mt: 6 }}
                        >
                            <Grid item>
                            <Box
                                component="img"
                                src={`${IMAGE_URL_GOVT}/${id}/${govtIdPicture}`}
                                alt="Government Id Picture"
                                sx={{
                                width: "90%", // Set width to 90% of the container
                                maxWidth: "100%", // Ensure the image doesn't exceed container width
                                height: "auto", // Maintain aspect ratio
                                objectFit: "cover", // Maintain aspect ratio while covering the container
                                ml: 2,
                                }}
                            />
                            </Grid>
                            {errors !== "" && (
                            <Grid item mt={2}>
                                <FormControl variant="outlined" error fullWidth>
                                <FormHelperText>
                                    <Typography fontSize={16}>{errors}</Typography>
                                </FormHelperText>
                                </FormControl>
                            </Grid>
                            )}
                        </Grid>
                    )}
                    {govtIdPicture === null && editor === null && renderFileInput()}
                    <input
                        type="file"
                        id="fileInputGovtIdPic"
                        accept="image/*"
                        ref={fileInputRefGovtIdPic}
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
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
                    <RetakeButton
                        variant="contained"
                        fullWidth
                        sx={{ py: "10px", mb: 2 }}
                        onClick={() => onRetake()}
                    >
                        <Typography fontSize={14} color={"#00A24A"}>
                            Retake
                        </Typography>
                    </RetakeButton>
                    <NextButton
                        variant="contained"
                        fullWidth
                        sx={{ py: "10px" }}
                        onClick={() => onNextStep()}
                    >
                        <Typography fontSize={14}>Next</Typography>
                    </NextButton>
                </Grid>
            </>
        )
    }

    const renderContentUP = () => {
        return ( 
            <>
            <Grid item xs>
                {profilePhoto !== null && (
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ mt: 8 }}
                    >
                        <Grid item>
                            <Avatar 
                                alt="Profile Photo" 
                                src={`${IMAGE_URL_USER}/${id}/${profilePhoto}`}
                                sx={{ width: 200, height: 200 }}
                            />
                        </Grid>
                    </Grid>
                )}
                {profilePhoto === null && editor === null && renderProfilePlaceholder()}
                <input
                    type="file"
                    id="fileInputGovtIdPic"
                    accept="image/*"
                    ref={fileInputRefGovtIdPic}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />
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
                <ChooseAvatarButton
                    variant="contained"
                    fullWidth
                    sx={{ py: "15px" }}
                    onClick={() => handleSelectFile()}
                >
                    <Typography fontSize={14}>Choose a photo</Typography>
                </ChooseAvatarButton>
                <BackButton
                    variant="contained"
                    fullWidth
                    sx={{ mt:2, py: "15px" }}
                    onClick={() => onBack()}
                >
                    <Typography fontSize={14}>Back</Typography>
                </BackButton>
            </Grid>
            </>
        ) 
    }

    const renderBody = () => {
        if(variant === KYC){
            return renderContentKYC()
        }else{
            return renderContentUP()
        }
    }

    const renderAvatarEditor = () => {
        if(variant === KYC){
            return (
                <AvatarEditor
                    ref={(ref: any) => setEditor(ref)}
                    image={image}
                    scale={1}
                    aspectRatio={1.2}
                    width={324}
                    height={204}
                    rotate={0}
                    borderRadius={0}
                    onImageChange={() => {}}
                    onPositionChange={() => {}}
                    onRotationChange={() => {}}
                    onScaleChange={() => {}}
                    style={{
                        position: "absolute",
                        textAlign: "center",
                        zIndex: 8,
                        right: 0,
                        left: 0,
                        margin: "0 auto",
                        // width: "90%", // Set width to 90% of the container
                        // maxWidth: "100%", // Ensure the webcam doesn't exceed container width
                        objectFit: "cover", // Maintain aspect ratio while covering the container
                    }}
                />
            )
        }

        if(variant === USER_PROFILE){
            return (
            <Grid
                container
                direction="column"
                alignItems="center"
                sx={{ mt: 6 }}
            >
                <Grid item>
                    <AvatarEditor
                        ref={(ref: any) => setEditor(ref)}
                        image={image}
                        scale={ratio}
                        aspectRatio={1.2}
                        rotate={0}
                        borderRadius={0}
                        onImageChange={() => {}}
                        onPositionChange={() => {}}
                        onRotationChange={() => {}}
                        onScaleChange={() => {}}
                    />
                </Grid>
                <Grid item>
                    <Box
                    sx={{
                        width: "50%",
                        position: "absolute",
                        top: 350,
                        left: "25%",
                        right: 0,
                        zIndex: "9",
                    }}
                    >
                    <Slider
                        size="small"
                        min={1} // Set min value to 0.7
                        max={2} // Set max value to 1
                        value={ratio} // Current value
                        onChange={handleChangeSlider}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        step={null} // Disable snapping to steps
                        marks={ratioChoices.map((choice: string) => ({
                        value: choice,
                        }))}
                    />
                    </Box>
                </Grid>
            </Grid>
            )
        }
    }

    const renderContent = () => {
        if(image !== null){
          return (
            <>
                <Grid item>
                    <Grid container direction="column" sx={{ mt: 2 }}>
                       {renderAvatarEditor()}
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
                        sx={{
                        py: "10px",
                        }}
                        onClick={() => handleUploadImage()}
                    >
                        <Typography fontSize={14}>Save</Typography>
                    </NextButton>
                    <RetakeButton
                        variant="contained"
                        fullWidth
                        sx={{ py: "10px", mt: 2 }}
                        onClick={() => onRetake()}
                    >
                        <Typography fontSize={14} color={"#00A24A"}>
                            Cancel
                        </Typography>
                    </RetakeButton>
                   
                </Grid>
            </>
            )
        }
        
        return renderBody()
    }
        
    return renderContent() 
}