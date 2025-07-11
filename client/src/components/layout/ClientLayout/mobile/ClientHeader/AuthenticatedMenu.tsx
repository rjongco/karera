import {
  Avatar,
  Grid,
  IconButton,
  styled,
  Box,
  Typography,
  Badge,
} from "@mui/material";
import { IMAGE_URL_USER } from "../../../../../constants";
import avatarMobile from "../../../../../assets/images/avatar-blue.png";
import addIcon from "../../../../../assets/images/add-icon.png";
import notificationIcon from "../../../../../assets/images/notification-icon.png";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const WalletContainer = styled(Grid)(() => ({
  background: `#00A24A`,
  borderRadius: "35px",
  boxShadow: "none",
}));

export const AuthenticatedMenu = (props: any) => {
  const { onOpenSideBar, authInfo } = props;
  const navigate = useNavigate();

  const notificationCount = authInfo?.notification?.totalCount;
  const notifCount = (count: number) => (count >= 100 ? `99+` : count);

  const id = authInfo?.id;
  const profilePicture = authInfo?.profilePicture;

  return (
    <Grid container direction="row" alignItems="center" height="100%">
      <Grid item>
        <WalletContainer
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px="10px"
          py="0"
          sx={{ border: "2px solid #FFF" }}
        >
          <Grid item>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "5rem",
              }}
            >
              <Typography
                fontSize={12}
                color="#FFFFFF"
                noWrap
                textAlign="right"
              >
                {`₱ ${authInfo?.wallet?.balance || "0.00"}`}
              </Typography>
            </div>
          </Grid>
          <Grid item ml="4px">
            <IconButton onClick={() => {}} color="inherit" sx={{ padding: 0 }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item mt="-3px">
                  <Box
                    component="img"
                    alt={`Add Icon`}
                    src={addIcon}
                    height={12}
                  />
                </Grid>
              </Grid>
            </IconButton>
          </Grid>
        </WalletContainer>
      </Grid>
      <Grid item mx="4px">
        <IconButton onClick={onOpenSideBar} color="inherit" sx={{ padding: 0 }}>
          {authInfo?.profilePicture ? (
            <Avatar
              //  @ts-ignore
              src={`${IMAGE_URL_USER}/${id}/${profilePicture}`}
              alt="Image"
              sx={{ width: 26, height: 26 }}
            />
          ) : (
            // <AccountCircle sx={{ fontSize: "30px" }} />
            <Avatar
              alt="Avatar Mobile Icon"
              src={avatarMobile}
              sx={{ width: 24, height: 24 }}
            />
          )}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          aria-label="notification"
          onClick={() => navigate("/game/notification")}
          sx={{ pl: 0, pr: "5px" }}
        >
          <Badge
            badgeContent={
              notificationCount !== undefined &&
              notificationCount !== 0 && (
                <Typography
                  variant="caption"
                  display="block"
                  style={{
                    border: "1px solid #d3d3d3",
                    backgroundColor: "black",
                    borderRadius: "50px",
                    padding: "3px 7px",
                    color: "yellow",
                    fontSize: "10px",
                    fontWeight: 600,
                  }}
                >
                  {notifCount(notificationCount)}
                </Typography>
              )
            }
            sx={{ color: "white" }}
          >
            <Avatar
              alt="Notification Icon"
              src={notificationIcon}
              sx={{ width: 24, height: 24 }}
            />
          </Badge>
        </IconButton>
      </Grid>
    </Grid>
  );
};
