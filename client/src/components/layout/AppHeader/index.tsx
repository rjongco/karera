import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../../context/GlobalProvider";
import {
  Grid,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Paper,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../../constants";
import companyLogoXS from "../../../assets/images/logo-text-white-one-char.png";
import MailIcon from "@mui/icons-material/Mail";
import { NotificationContent } from "./components/NotificationContent";
import { ProfileContent } from "./components/ProfileContent";
import {
  getNotificationCustomAPI,
  readNotifAPI,
} from "../../../api/notificationAPI";
import useSWR, { useSWRConfig } from "swr";
import { AppBar, PopperStyled } from "./styles";
import { notifCount } from "../../../utils/logic";
import { ProfileAvatar } from "./components/ProfileAvatar";
import { UserCredits } from "./components/UserCredits";
import { getCreditsAPI } from "../../../api/transactionsAPI";

interface IAppHeaderProps {}

//  @ts-ignore
const AppHeader: React.FC<IAppHeaderProps> = () => {
  const {
    //  @ts-ignore
    openSideBar: open,
    //  @ts-ignore
    items,
    //  @ts-ignore
    setOpenSideBar,
    //  @ts-ignore
    clearLayout,
    //  @ts-ignore
    auth: userInfo,
  } = useContext(GlobalContext);
  const { mutate } = useSWRConfig();

  const getNotification = async () => {
    const response = await getNotificationCustomAPI();
    return response?.data;
  };

  const getCredits = async () => {
    const response = await getCreditsAPI();
    return response?.data;
  };

  const { data: notifInfo } = useSWR(
    "/admin/notification/custom",
    getNotification
  );

  const { data: creditsInfo } = useSWR("/admin/credits/custom", getCredits);

  const handleReadNotif = (payload: any) => {
    const { module, reference, ...rest } = payload;
    readNotifAPI(rest).then(() => {
      mutate("/admin/notification/custom");
      mutate("/admin/notification/search");

      if (module === PAGES.USER_MANAGEMENT.name) {
        // navigate(`/admin/${PAGES.USER_MANAGEMENT.name}/${reference}`);
        navigate(`/admin/${PAGES.USER_MANAGEMENT.name}`);
      } else if (module === PAGES.PROFILE.name) {
        navigate(`/admin/${PAGES.PROFILE.name}`);
      } else if (module === PAGES.CREDITS.name) {
        navigate(`/admin/${PAGES.CREDITS.name}`);
      } else if (module === PAGES.REFERRALS.name) {
        navigate(`/admin/${PAGES.REFERRALS.name}`);
      }
    });
  };

  const navigate = useNavigate();

  const anchorRefNotif = useRef(null);
  const anchorRefProf = useRef(null);

  const [openNotification, setOpenNotification] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleProfileClick = () => {
    setOpenProfile(true);
  };
  const handleNotificationClick = () => {
    setOpenNotification(true);
  };

  const handleCloseNotif = () => {
    setOpenNotification(false);
  };
  const handleCloseProf = () => {
    setOpenProfile(false);
  };

  const handleProfleMenu = (e: any) => {
    e.preventDefault();
    navigate("/admin/profile");
  };
  const handleLogoutMenu = (e: any) => {
    e.preventDefault();
    navigate("/admin/logout");
  };

  function notificationsLabel(count: number) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  return (
    //  @ts-ignore
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <Box
          component="img"
          sx={{
            ml: -0.5,
            display: { xs: "block", md: "none" },
            width: "30px",
          }}
          alt="Yamaha Logo"
          src={companyLogoXS}
        />
        <Grid
          gap={1}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item>
            <UserCredits creditsInfo={creditsInfo} />
          </Grid>
          <Grid item>
            <IconButton
              ref={anchorRefNotif}
              aria-label={notificationsLabel(notifInfo?.totalCount)}
              onClick={handleNotificationClick}
            >
              <Badge
                badgeContent={
                  notifInfo?.totalCount !== undefined &&
                  notifInfo?.totalCount !== 0 && (
                    <Typography
                      variant="caption"
                      display="block"
                      style={{
                        backgroundColor: "yellow",
                        borderRadius: "50px",
                        padding: "3px 7px",
                        color: "black",
                        fontSize: "10px",
                      }}
                    >
                      {notifCount(notifInfo?.totalCount)}
                    </Typography>
                  )
                }
                sx={{ color: "white" }}
              >
                <MailIcon style={{ color: "black" }} />
              </Badge>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              ref={anchorRefProf}
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={handleOpenUserMenu}
              onClick={handleProfileClick}
              color="inherit"
            >
              {/* <Typography sx={{ mr: 2 }}>{userInfo?.role}</Typography> */}
              {/*  @ts-ignore */}
              {userInfo?.profilePicture ? (
                <ProfileAvatar userInfo={userInfo} />
              ) : (
                <AccountCircle sx={{ fontSize: "30px" }} />
              )}
            </IconButton>

            <PopperStyled
              open={openNotification}
              anchorEl={anchorRefNotif.current}
              placement="bottom-start"
            >
              {() => (
                <>
                  <ClickAwayListener onClickAway={handleCloseNotif}>
                    <Paper sx={{ mr: 2 }}>
                      <NotificationContent
                        notifInfo={notifInfo}
                        onUpdateRead={handleReadNotif}
                      />
                    </Paper>
                  </ClickAwayListener>
                </>
              )}
            </PopperStyled>

            <PopperStyled
              open={openProfile}
              anchorEl={anchorRefProf.current}
              placement="bottom-end"
            >
              {() => (
                <>
                  <ClickAwayListener onClickAway={handleCloseProf}>
                    <Paper sx={{ mr: 2 }}>
                      <ProfileContent
                        userInfo={userInfo}
                        notifInfo={notifInfo}
                        handleProfleMenu={handleProfleMenu}
                        handleLogoutMenu={handleLogoutMenu}
                      />
                    </Paper>
                  </ClickAwayListener>
                </>
              )}
            </PopperStyled>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
