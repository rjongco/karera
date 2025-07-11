import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useAxios from "../../../utils/axios";
import { BASE_URL, IMAGE_URL_USER } from "../../../constants";
import uploadIcon from "../../../assets/images/upload-icon.png";
import { catchError } from "../../../utils/logic";

interface IProfileImageProps {
  onCloseModal: any;
  values: any;
  statusUploading: any;
}

export const ProfileImage: React.FunctionComponent<IProfileImageProps> = (
  props
) => {
  const { onCloseModal, values, statusUploading } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { id, profilePicture } = values;

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // @ts-ignore
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      // @ts-ignore
      formData.append("image", selectedFile);
      const type = "user";
      // @ts-ignore
      await useAxios
        .post(`/admin/users/${id}/upload-image/${type}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: any) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
            statusUploading(true);
          },
        })
        .catch(catchError);

      setUploadProgress(0); // Reset progress after upload
      setSelectedFile(null);
      formData.delete("image");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
      setUploadProgress(0); // Reset progress on error
    }
  };

  return (
    <Grid container flexDirection="column" alignItems="center">
      <Grid>
        {previewUrl ? (
          <Grid container sx={{ mt: 2, mb: 2 }}>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          </Grid>
        ) : (
          <Grid container flexDirection="column" sx={{ mt: 2, mb: 2 }}>
            {profilePicture ? (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",

                  // @ts-ignore
                  ":hover:after": {
                    content: "Upload Image",
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    bottom: "0px",
                    width: "100%",
                    background: `url(${uploadIcon})`,
                    backgroundSize: "50px",
                  },
                }}
              >
                {/* <img src={uploadIcon} /> */}
                <Avatar
                  src={`${IMAGE_URL_USER}/${id}/${profilePicture}`}
                  alt="Profile Picture"
                  sx={{
                    width: 200,
                    height: 200,
                    ":hover": {
                      opacity: 0.4,
                    },
                  }}
                  // @ts-ignore
                  onClick={() => document.getElementById("fileInput").click()}
                />
              </div>
            ) : (
              <Grid item>
                <IconButton
                  aria-label="delete"
                  size="large"
                  // @ts-ignore
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <AddPhotoAlternateIcon sx={{ fontSize: "100px" }} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        )}
        <Grid item>
          {uploadProgress !== 0 && (
            <Box sx={{ width: "100%", mt: 4 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}
        </Grid>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Grid>
      <Grid>
        {/* <Button variant="outlined" href="#outlined-buttons" disabled>
          Upload Image
        </Button> */}
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ mt: 5 }}
      >
        <Grid item xs={6} sx={{ ml: -1 }}>
          <Button onClick={onCloseModal}>Close</Button>
        </Grid>
        <Grid item xs={6} sx={{ ml: -1 }}>
          <Grid container justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={handleUpload}
              disabled={!Boolean(previewUrl)}
            >
              Upload Image
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
