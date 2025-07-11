import { Grid, Typography, styled } from "@mui/material";
import { ClientHeader } from "./ClientHeader";
import { ClientSidebar } from "./ClientSidebar";
import { ClientRightSidebar } from "./ClientRightSidebar";

import { ClientContent } from "./ClientContent";
import { ClientFooter } from "./ClientFooter";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../context/GlobalProvider";
import { AgeVerification } from "../../../../pages/Home/mobile/AgeVerification";
import useSWR from "swr";
import { getCookie } from "../../../../utils/cookie";
import axios from "axios";
import { API_URL, API_URL_PREFIX } from "../../../../constants";
import { MobileLandscape } from "../../../MobileLandscape";

const baseURL = `${API_URL}/${API_URL_PREFIX}`;

const MainContainer = styled(Grid)(() => ({
  display: "none",
  "@media screen and (max-aspect-ratio: 13/9)": {
    height: "100%",
    width: "100%",
    display: "block",
  },
  position: "relative",
}));

const MainHeader = styled(Grid)(() => ({
  height: "8vh",
  position: "sticky",
  top: "0",
  zIndex: 999,
  background:
    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
}));

const MainBody = styled(Grid)(() => ({}));

const MainSidebar = styled(Grid)(() => ({}));

const MainRightSidebar = styled(Grid)(() => ({}));

const MainFooter = styled(Grid)(() => ({
  height: "10vh",
  position: "sticky",
  zIndex: "20",
  bottom: "0",
  background:
    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
}));

export const MobileClientLayout = () => {
  const {
    // @ts-ignore
    auth: authInfo,
    // @ts-ignore
    setAuthInfo,
  } = useContext(GlobalContext) || {};

  const getUserProfile = async () => {
    const token = getCookie("token");
    if (token) {
      const response = await axios.get(`${baseURL}/admin/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach the token as a Bearer token
        },
      });

      return response?.data.data;
    }
    return null;
  };
  const { data: profile } = useSWR("/get/profile/", getUserProfile, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    setAuthInfo({
      ...authInfo,
      wallet: { ...profile?.Wallet },
      actionStatus: profile?.actionStatus,
      isSupervisorApproved: profile?.isSupervisorApproved,
      isVerifierApproved: profile?.isVerifierApproved,
      isDenied: profile?.isDenied,
      isDeactivated: profile?.isDeactivated,
      isKYC: profile?.isKYC,
      notification: profile?.notification,
    });
  }, [profile]);

  const [openToggleSideBar, setOpenToggleSideBar] = useState(false);
  const [openToggleRightSideBar, setOpenToggleRightSideBar] = useState(false);

  const handleOpenSideBar = () => {
    setOpenToggleSideBar(true);
  };

  const handleCloseSidebar = () => {
    setOpenToggleSideBar(false);
  };

  const handleOpenRightSideBar = () => {
    setOpenToggleRightSideBar(true);
  };

  const handleCloseRightSidebar = () => {
    setOpenToggleRightSideBar(false);
  };

  return (
    <>
      <MainContainer
        container
        direction="column"
        alignItems="space-between"
        justifyContent="space-between"
      >
        <MainHeader item>
          <ClientHeader onOpenSideBar={handleOpenSideBar} authInfo={authInfo} />
        </MainHeader>
        <MainSidebar item>
          <ClientSidebar
            authInfo={authInfo}
            toggleDrawer={openToggleSideBar}
            onToggleSideBar={handleCloseSidebar}
          />
        </MainSidebar>
        <MainRightSidebar item>
          <ClientRightSidebar
            toggleDrawer={openToggleRightSideBar}
            onToggleSideBar={handleCloseRightSidebar}
          />
        </MainRightSidebar>
        <MainBody item>
          <ClientContent />
        </MainBody>
        <MainFooter item>
          <ClientFooter onOpenRightSideBar={handleOpenRightSideBar} />
        </MainFooter>
      </MainContainer>
      <MobileLandscape />
      <AgeVerification />
    </>
  );
};
