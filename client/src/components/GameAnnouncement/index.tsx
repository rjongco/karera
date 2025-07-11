import { Box, Grid, Typography, styled } from "@mui/material";
import homeAnnouncementIcon from "../../assets/images/home-announcemet-icon.png";
import { VARIANT } from "../../constants";

export const GameAnnouncement = (props: any) => {
  const { variant, content } = props;

  const GameAnnouncementGrid = styled(Grid)(() => ({
    background:
      variant === VARIANT.CONSTANT
        ? "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))"
        : "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
    borderRadius: "5px",
  }));

  return (
    <GameAnnouncementGrid
      container
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      py={1}
      px={1}
    >
      <Grid item mr={1}>
        <Grid container direction="column" alignItems="center">
          <Box
            component="img"
            alt="Game Announcement Icon"
            src={homeAnnouncementIcon}
            width={15}
            sx={{ borderRadius: "5px", boxShadow: 0, my: "auto" }}
          />
        </Grid>
      </Grid>
      <Grid item>{content}</Grid>
    </GameAnnouncementGrid>
  );
};
