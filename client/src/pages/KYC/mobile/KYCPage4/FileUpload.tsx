import {
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
// @ts-ignore
import AvatarEditor from "react-avatar-editor";
import { FileUploadEditor } from "./FileUploadEditor";


export const KYCPage4FileUpload = (props: any) => {
  const {
    variant,
    onNextStep,
    image,
    setImage,
    id,
    govtIdPicture,
    onUploadImage,
    editor,
    setEditor,
    skipUploadFileOrCam,
    onRetake,
    profilePhoto,
    onBack
  } = props;

  const [errors, setError] = useState("");

  const [ratio, setRatio] = useState(1);

  const ratioChoices = [2, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1];

  const handleChangeSlider = (event: any, newValue: any) => {
    setRatio(newValue);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!skipUploadFileOrCam) {
        // @ts-ignore
        document.getElementById("fileInputGovtIdPic").click();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [skipUploadFileOrCam]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Only JPG and PNG formats are allowed.");
        return;
      }
      setError("");
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Grid
      container
      direction="column"
      sx={{ height: "83vh" }}
      justifyContent="space-between"
    >
      <FileUploadEditor
        variant={variant}
        id={id}
        image={image}
        setEditor={setEditor}
        ratio={ratio}
        handleChangeSlider={handleChangeSlider}
        ratioChoices={ratioChoices}
        govtIdPicture={govtIdPicture}
        errors={errors}
        editor={editor}
        handleImageChange={handleImageChange}
        profilePhoto={profilePhoto}
        onUploadImage={onUploadImage}
        onRetake={onRetake}
        onNextStep={onNextStep}
        onBack={onBack}
      />
    </Grid>
  );
};
