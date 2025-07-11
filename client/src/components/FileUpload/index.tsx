import { Grid, styled, Button, Slider, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import AvatarEditor from "react-avatar-editor";
import { IMAGE_URL_GOVT } from "../../constants";

export const ButtonStyled = styled(Button)(() => ({}));

export const FileUpload = (props: any) => {
  const {
    authInfo,
    imageGovtIdPic,
    setImageGovtIdPic,
    editorGovtIdPic,
    setEditorGovtIdPic,
    uploadGovtIdPic,
  } = props;
  const fileInputRefGovtIdPic = useRef(null);

  const [ratio, setRatio] = useState(0.9);

  const aspectRatio = 1;

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setDragStartPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseMove = (e: any) => {
    if (isDragging && fileInputRefGovtIdPic.current) {
      const deltaX = e.clientX - dragStartPos.x;
      const deltaY = e.clientY - dragStartPos.y;
      // @ts-ignore
      fileInputRefGovtIdPic.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    // @ts-ignore
    setImageGovtIdPic(URL.createObjectURL(file));
  };

  const changeRatio = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setRatio(newValue);
    }
  };

  const handleUploadGovtIdPic = async () => {
    if (fileInputRefGovtIdPic.current) {
      // @ts-ignore
      fileInputRefGovtIdPic.current.value = ""; // Reset the value of the file input
    }
    if (editorGovtIdPic) {
      uploadGovtIdPic(editorGovtIdPic);
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        {imageGovtIdPic ? (
          <>
            <AvatarEditor
              ref={(ref: any) => setEditorGovtIdPic(ref)}
              image={imageGovtIdPic}
              width={324}
              height={204}
              border={0}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={ratio}
              rotate={0}
              borderRadius={0}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onImageChange={() => {}}
              onPositionChange={() => {}}
              onRotationChange={() => {}}
              onScaleChange={() => {}}
              aspectRatio={aspectRatio}
            />
            <Box sx={{ width: 300 }}>
              <Slider
                step={0.1}
                min={0.1}
                max={1}
                defaultValue={0.9}
                onChange={changeRatio}
                aria-label="Default"
                valueLabelDisplay="auto"
                sx={{ py: "10px" }}
              />
            </Box>
          </>
        ) : (
          <img
            src={
              `${IMAGE_URL_GOVT}/${authInfo?.id}/${authInfo.govtIdPicture}` ||
              undefined
            }
            alt="Captured"
            width={324}
            height={204}
          />
        )}
      </Grid>
      <Grid item sx={{ mt: 1 }}>
        {!editorGovtIdPic ? (
          <ButtonStyled
            variant="contained"
            onClick={() => {
              // @ts-ignore
              document.getElementById("fileInputGovtIdPic").click();
            }}
          >
            Select Government ID
          </ButtonStyled>
        ) : (
          <ButtonStyled
            variant="contained"
            onClick={() => handleUploadGovtIdPic()}
          >
            Upload Government ID
          </ButtonStyled>
        )}

        <input
          type="file"
          id="fileInputGovtIdPic"
          accept="image/*"
          ref={fileInputRefGovtIdPic}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </Grid>
    </Grid>
  );
};
