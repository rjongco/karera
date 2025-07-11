import {
  Avatar,
  Grid,
  IconButton,
  LinearProgress,
  styled,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { IMAGE_URL_USER } from "../../../constants";
// @ts-ignore
import AvatarEditor from "react-avatar-editor";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import { GlobalContext } from "../../../context/GlobalProvider";

const ImageContainerStyled = styled("div")({
  position: "relative",
  display: "inline-block",
  "&:hover .upload-text": {
    opacity: 1,
  },
});

const ImageStyled = styled(Avatar)({
  marginTop: "12px",
  marginBottom: "12px",
  width: "140px",
  height: "140px",
  objectFit: "cover",
  transition: "opacity 0.3s ease",
  ":hover": {
    opacity: 0.7,
  },
});

const ImageUploadedStyled = styled(Avatar)({
  marginTop: "12px",
  marginBottom: "12px",
  width: "150px",
  height: "150px",
  objectFit: "cover",
  transition: "opacity 0.3s ease",
  ":hover": {
    opacity: 0.7,
  },
});

const UploadText = styled("div")({
  position: "absolute",
  top: "90%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: "0",
  backgroundColor: "rgba(91,192,222, 1)",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "12px",
  cursor: "pointer",
});

const RemoveImageText = styled("div")({
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: "0",
  backgroundColor: "rgba(187,33,36, 1)",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "12px",
  cursor: "pointer",
});

interface IUserProfileAvatarProps {
  userProfileData: any;
  onRemoveProfilePicture: any;
  userProfileState: any;
  onUploadingProfilePic: any;
  setUploadImageProcess: any;
  authInfo: any;
}

export const UserProfileAvatar: React.FunctionComponent<
  IUserProfileAvatarProps
> = (props) => {
  const {
    userProfileData,
    onRemoveProfilePicture,
    userProfileState,
    onUploadingProfilePic,
    setUploadImageProcess,
    authInfo,
  } = props;
  const fileInputRef = useRef(null);

  // @ts-ignore
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const formData = new FormData();
  const aspectRatio = 1; // Aspect ratio (width:height) - 1:1 in this example
  // @ts-ignore
  const { setUserInfo, setAuthInfo } = useContext(GlobalContext);

  const [profilePicture, setProfilePicture] = useState(
    userProfileData?.profilePicture
  );

  useEffect(() => {
    if (userProfileState.isUploadedProfilePic) {
      setAuthInfo({ ...authInfo, profilePicture: userProfileState.data });
      setProfilePicture(userProfileState.data);
      setImage(null);
      setEditor(null);
      setUploadImageProcess();
    }
  }, [userProfileState.isUploadedProfilePic]);

  useEffect(() => {
    if (userProfileState.deletingProfilePic) {
      setImage(null);
      setEditor(null);
    }
  }, [userProfileState.deletingProfilePic]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    // @ts-ignore
    setImage(URL.createObjectURL(file));
  };

  const handleCancelUpload = () => {
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current.value = ""; // Reset the value of the file input
    }
    setImage(null);
    setEditor(null);
  };

  const handleUpload = async () => {
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current.value = ""; // Reset the value of the file input
    }
    if (editor) {
      // @ts-ignore
      const canvas = editor.getImageScaledToCanvas();
      // @ts-ignore
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      // @ts-ignore
      formData.append("image", blob, "cropped-image.png");
      const { id } = userProfileData;
      onUploadingProfilePic(id, formData);
    }
  };

  const handleRemoveImage = async () => {
    onRemoveProfilePicture();
    setEditor(null);
  };

  return (
    <Grid item>
      <div
        // @ts-ignore
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        {image ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "0",
              marginTop: "10px",
            }}
          >
            <AvatarEditor
              ref={(ref: any) => setEditor(ref)}
              image={image}
              width={170}
              height={170}
              border={0}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1}
              rotate={0}
              borderRadius={150}
              onImageChange={() => {}}
              onPositionChange={() => {}}
              onRotationChange={() => {}}
              onScaleChange={() => {}}
              aspectRatio={aspectRatio}
            />
            {userProfileState.uploadProPicProgress === 0 ? (
              <Grid container flexDirection="row" justifyContent="center">
                <Grid item>
                  <IconButton
                    aria-label="save"
                    sx={{ mt: "2px" }}
                    onClick={handleUpload}
                  >
                    <SaveIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="cancel"
                    onClick={handleCancelUpload}
                    sx={{ mt: "2px" }}
                  >
                    <CancelIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ) : (
              <div
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  width: "170px",
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={userProfileState.uploadProPicProgress}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <ImageContainerStyled>
              <ImageUploadedStyled>
                {userProfileState?.deletingProfilePic ? (
                  <Typography variant="body2" sx={{ color: "red" }}>
                    Deleting...
                  </Typography>
                ) : profilePicture &&
                  !userProfileState?.isDeletingProfilePic &&
                  !userProfileState.uploadProPicProgress ? (
                  <>
                    <Avatar
                      src={`${IMAGE_URL_USER}/${authInfo?.id}/${profilePicture}`}
                      alt="Image"
                      sx={{ width: "100%", height: "100%" }}
                    />
                    <UploadText
                      className="upload-text"
                      onClick={() =>
                        // @ts-ignore
                        document.getElementById("fileInput").click()
                      }
                    >
                      Change
                    </UploadText>
                    <RemoveImageText
                      className="upload-text"
                      onClick={handleRemoveImage}
                    >
                      Delete
                    </RemoveImageText>
                  </>
                ) : (
                  <ImageContainerStyled>
                    <ImageStyled alt="Image">
                      <PersonIcon style={{ width: "60px", height: "60px" }} />
                      {!userProfileState?.uploadingProfilePic && (
                        <UploadText
                          className="upload-text"
                          onClick={() => {
                            // @ts-ignore
                            document.getElementById("fileInput").click();
                          }}
                        >
                          Upload
                        </UploadText>
                      )}
                    </ImageStyled>
                  </ImageContainerStyled>
                )}
              </ImageUploadedStyled>
            </ImageContainerStyled>
          </>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </Grid>
  );
};
