import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export const GameVideo = (props: any) => {
  const { height, width, py, styles, autoPlay } = props;
  const [play, setPlay] = useState(0);

  useEffect(() => {
    if (autoPlay === 1) {
      setPlay(autoPlay);
    }
  }, [autoPlay]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      py={py || "3px"}
      sx={styles && { ...styles }}
    >
      {/* <YouTube videoId="3cMKSqC1i4g" opts={opts} onReady={onPlayerReady} /> */}
      <iframe
        src={`https://www.youtube.com/embed/3cMKSqC1i4g?controls=0?autoplay=${play}`}
        title="Embedded youtube"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          pointerEvents: "none", // This line makes the overlay unclickable
        }}
      />
    </Grid>
  );
};
