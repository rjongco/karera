import { Box, Grid, Typography, styled } from "@mui/material";
import { sidebarItemsMobile } from "../../../../../../constants/sidebarMobile";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import closeRed from "../../../../../../assets/images/close-red.png";
import closeWhite from "../../../../../../assets/images/close-white.png";
import pendingBlueIcon from "../../../../../../assets/images/pending-blue-icon.png";
import checkWhite from "../../../../../../assets/images/check-white.png";

import {
  canViewCreditPage,
  canViewStatusVerifierForDenied,
  canViewStatusSupervisorApprovedDenied,
  canViewStatusVerifierForApproval,
  canViewStatusDeactivateDenied,
  canClickCreditPage,
} from "../../../../../../utils/permissions/credits";
import { LEFT_SIDEBAR_MOBILE } from "../../../../../../constants";
import { ChipStatus } from "./ChipStatus";

const SidebarMenuItem = styled(Grid)(() => ({
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#E9E9E9",
    transition: "background-color 0.3s ease-in-out",
  },
}));

const renderStatusKYC = (authInfo: any) => {
  if (
    canViewCreditPage(
      authInfo?.isSupervisorApproved,
      authInfo?.isVerifierApproved,
      authInfo?.actionStatus
    )
  ) {
    return (
      <ChipStatus
        icon={checkWhite}
        label="VERIFIED"
        borderColor="#2196F3"
        color="#FFFFFF"
        bgColor="#2196F3"
      />
    );
  } else if (
    canViewStatusVerifierForApproval(
      authInfo?.isVerifierApproved,
      authInfo?.actionStatus
    )
  ) {
    return (
      <ChipStatus
        icon={pendingBlueIcon}
        label="PENDING"
        borderColor="#2196F3"
        color="#2196F3"
        bgColor="#FFFFFF"
      />
    );
  } else if (
    canViewStatusDeactivateDenied(
      authInfo?.isDeactivated,
      authInfo?.isDenied,
      authInfo?.actionStatus
    )
  ) {
    return (
      <ChipStatus
        icon={closeRed}
        label="DENIED"
        borderColor="#FF2020"
        color="#FF2020"
        bgColor="#FFFFFF"
      />
    );
  } else if (
    canViewStatusVerifierForDenied(
      authInfo?.isDeactivated,
      authInfo?.actionStatus
    )
  ) {
    return (
      <ChipStatus
        icon={pendingBlueIcon}
        label="PENDING"
        borderColor="#2196F3"
        color="#2196F3"
        bgColor="#FFFFFF"
      />
    );
  } else if (
    canViewStatusSupervisorApprovedDenied(
      authInfo?.isSupervisorApproved,
      authInfo?.isDeactivated,
      authInfo?.actionStatus
    )
  ) {
    return (
      <ChipStatus
        icon={closeRed}
        label="DENIED"
        borderColor="#FF2020"
        color="#FF2020"
        bgColor="#FFFFFF"
      />
    );
  } else {
    if (authInfo?.isKYC) {
      return (
        <ChipStatus
          icon={pendingBlueIcon}
          label="PENDING"
          borderColor="#2196F3"
          color="#2196F3"
          bgColor="#FFFFFF"
        />
      );
    }
    return (
      <ChipStatus
        icon={closeWhite}
        label="UNVERIFIED"
        borderColor="transparent"
        color="#FFFFFF"
        bgColor="#F44336"
      />
    );
  }
};

export const SidebarMenu = (props: any) => {
  const { authInfo } = props;
  const navigate = useNavigate();

  const handleGoto = (link: any) => {
    navigate(link);
  };

  const renderLabel = (sideBarName:string, label:string) => {
    const { passcode:passcodeVar } = authInfo
    if(sideBarName === "PASSCODE"){
      return `${passcodeVar === null ? "Create" : "Change"} Wallet Passcode`
    }
    
    return label
  }

  return (
    <Grid container direction="column">
      {sidebarItemsMobile.map((obj, i) => {
        return (
          <SidebarMenuItem
            key={`sidebarmenu-${i}`}
            item
            px={2}
            py={2}
            onClick={() => {
              if (obj.sideBarName === LEFT_SIDEBAR_MOBILE.KYC.name) {
                if (
                  !canClickCreditPage(
                    authInfo?.isSupervisorApproved,
                    authInfo?.isVerifierApproved,
                    authInfo?.actionStatus,
                    authInfo?.isKYC
                  )
                ) {
                  handleGoto(obj.link);
                }
              } else {
                handleGoto(obj.link);
              }
            }}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Grid item>
                <Box
                  component="img"
                  //  @ts-ignore
                  alt={`Sidebar ${obj.label}`}
                  src={obj.icon}
                  height={25}
                />
              </Grid>
              <Grid item xs ml={1}>
                <Typography fontSize={16}>{renderLabel(obj.sideBarName, obj.label)}{}</Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    {obj.sideBarName === LEFT_SIDEBAR_MOBILE.KYC.name &&
                      renderStatusKYC(authInfo)}
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="flex-end">
                      <KeyboardArrowRightIcon />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </SidebarMenuItem>
        );
      })}
    </Grid>
  );
};
