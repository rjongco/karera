import { Grid, Box, styled } from "@mui/material";
import { useState } from "react";

const GridStyled = styled(Grid)(({ theme }) => ({
  position: "relative",
  width: "50%",
}));

const ImageStyled = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
}));

const ZoomLensStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  border: "1px solid #d4d4d4",
  opacity: 0.4,
  backgroundColor: "#ffffff",
  pointerEvents: "none",
  display: "none",
}));

const ZoomResultStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: "105%", // Adjust as needed
  width: "250px", // Adjust as needed
  height: "100%", // Adjust as needed
  border: "1px solid #d4d4d4",
  backgroundRepeat: "no-repeat",
  display: "none",
}));

export const ImageZoomer = (props: any) => {
  const { src, alt } = props;
  const [lensStyle, setLensStyle] = useState({});
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZoomVisible, setIsZoomVisible] = useState(false);

  const handleMouseMove = (e: any) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth: width, offsetHeight: height } = target;

    const lensWidth = width / 3;
    const lensHeight = height / 3;
    const zoomWidth = width * 2;
    const zoomHeight = height * 2;

    const posX = Math.max(
      0,
      Math.min(offsetX - lensWidth / 2, width - lensWidth)
    );
    const posY = Math.max(
      0,
      Math.min(offsetY - lensHeight / 2, height - lensHeight)
    );

    setLensStyle({
      left: `${posX}px`,
      top: `${posY}px`,
      width: `${lensWidth}px`,
      height: `${lensHeight}px`,
      display: "block",
    });

    setZoomStyle({
      backgroundImage: `url(${src})`,
      backgroundPosition: `-${posX * 2}px -${posY * 2}px`,
      backgroundSize: `${zoomWidth}px ${zoomHeight}px`,
      display: "block",
    });
  };

  const handleMouseEnter = () => {
    setIsZoomVisible(true);
  };

  const handleMouseLeave = () => {
    setIsZoomVisible(false);
    setLensStyle({ display: "none" });
    setZoomStyle({ display: "none" });
  };

  return (
    <GridStyled container>
      <Grid item xs={12}>
        <Box
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          position="relative"
        >
          <ImageStyled src={src} alt={alt} />
          <ZoomLensStyled style={lensStyle} />
        </Box>
        {isZoomVisible && <ZoomResultStyled style={zoomStyle} />}
      </Grid>
    </GridStyled>
  );
};
