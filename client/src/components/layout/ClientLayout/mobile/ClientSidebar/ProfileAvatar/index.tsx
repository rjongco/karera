import { Avatar, Box, Grid, Typography, styled } from "@mui/material";
import sidebarAvatarMobile from "../../../../../../assets/images/avatar-blue.png";
import sidebarAvatarCamMobile from "../../../../../../assets/images/sidebar-avatar-cam-mobile.png";
import sidebarEditPenMobile from "../../../../../../assets/images/sidebar-edit-pen-mobile.png";

import { fullName } from "../../../../../../utils/logic";
import { IMAGE_URL_USER } from "../../../../../../constants";

export const GridStyled = styled(Grid)(() => ({
  position: "relative",
}));

export const AvatarPhoto = styled(Box)(() => ({
  position: "relative",
}));

export const AvatarCam = styled(Box)(() => ({
  position: "absolute",
  bottom: 0,
  right: 0,
}));

export const ProfileAvatar = (props: any) => {
  const { authInfo } = props;

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ px: 4, pt: 2, pb: 1 }}
    >
      <GridStyled item>
        {authInfo?.profilePicture ? (
          <Avatar
            //  @ts-ignore
            src={`${IMAGE_URL_USER}/${authInfo?.id}/${authInfo?.profilePicture}`}
            alt="Image"
            sx={{ width: 57, height: 57 }}
          />
        ) : (
          <>
            <AvatarPhoto
              component="img"
              //  @ts-ignore
              alt="Sidebar Avatar Mobile"
              src={sidebarAvatarMobile}
              height={57}
            />
            <AvatarCam
              component="img"
              //  @ts-ignore
              alt="Sidebar Avatar Camera Mobile"
              src={sidebarAvatarCamMobile}
              height={20}
            />
          </>
        )}
      </GridStyled>
      <GridStyled item ml={2}>
        <Grid container direction="column">
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Typography
                  fontSize={14}
                  fontWeight={500}
                  sx={{
                    maxWidth: 170,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {authInfo.nickName}
                </Typography>
              </Grid>
              <Grid item ml={1}>
                <Box
                  component="img"
                  //  @ts-ignore
                  alt="Sidebar Edit Pen Mobile"
                  src={sidebarEditPenMobile}
                  height={10}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography fontSize={12} fontWeight={500}>
              User ID: {authInfo.accountId}
            </Typography>
          </Grid>
        </Grid>
      </GridStyled>
    </Grid>
  );
};
