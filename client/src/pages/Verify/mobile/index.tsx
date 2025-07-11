import { Box, Grid, IconButton, Typography, styled } from "@mui/material";
import { VerifyForm } from "./VerifyForm";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1ForLogin from "../../../assets/images/img-1-for-login.jpg";
import signupPagcorLogo from "../../../assets/images/signup-pagcor-logo.png";
import { OTPForm } from "./OTPForm";
import { formatTime, numWithS } from "../../../utils/logic";
import { useNavigate } from "react-router-dom";
import { VERIFY_SUCCESS } from "../../../constants";

import { GlobalContext } from "../../../context/GlobalProvider";
import { RESET_INITIAL_STATE } from "../../../constants/api";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { PopupModal } from "../../../components/PopupModal";
import { SuccessModalContent } from "../../../components/SuccessModalContent";
import { useVerifyMobileContext } from "../../../context/VerifyMobileContext";
import { MobileLandscape } from "../../../components/MobileLandscape";

const ContainerStyled = styled(Grid)(() => ({
  display: "none",
  "@media screen and (max-aspect-ratio: 13/9)": {
    width: "100%",
    height: "100vh",
    background: "url('./assets/backgrounds/login-bg.png')",
    backgroundSize: "100% 50%", // Set the background size to auto width and 50% height
    backgroundPosition: "center 0", // Position the background image at the center horizontally and at the bottom vertically
    backgroundRepeat: "no-repeat", // Prevent the background image from repeating
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
}));

export const MobileVerify = () => {
  const {
    // @ts-ignore
    verifyMobileState,
    // @ts-ignore
    dispatchVerifyMobile,
    // @ts-ignore
    actions: { verify, verifyMobileOTP, resendOTP },
  } = useVerifyMobileContext() || {};

  // @ts-ignore
  const { clearLayout, setAuthInfo } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [otpPage, setOtpPage] = useState(0);
  const [countdown, setCountdown] = useState(0); // Initial countdown value

  const [formData, _] = useState({
    mobile: "",
  });

  // @ts-ignore
  const [formDataOtp, setFormDataOtp] = useState({
    otp: "",
  });

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    dispatchVerifyMobile({ type: RESET_INITIAL_STATE });
  }, [dispatchVerifyMobile]);

  useEffect(() => {
    if (verifyMobileState?.success) {
      setOtpPage(1);
      setCountdown(verifyMobileState?.data.countdownSeconds);
    }
  }, [verifyMobileState?.success]);

  useEffect(() => {
    if (otpPage === 1) {
      const intervalId = setInterval(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [countdown, otpPage]);

  useEffect(() => {
    if (verifyMobileState?.successVerifiedOTP) {
      setOpenModal(true);
      setTypeModal(VERIFY_SUCCESS);
    }
  }, [verifyMobileState?.successVerifiedOTP]);

  useEffect(() => {
    if (verifyMobileState?.successResendOTP) {
      setCountdown(verifyMobileState?.data.countdownSeconds);
    }
  }, [verifyMobileState?.successResendOTP]);

  const handleSubmit = (values: any) => {
    verify(values);
  };

  const handleSubmitOTP = (values: any) => {
    const { id } = verifyMobileState?.data;
    const payload = {
      id,
      ...values,
    };
    verifyMobileOTP(payload);
  };

  const handleResendOTP = () => {
    const { id } = verifyMobileState?.data;
    const payload = {
      id,
    };
    resendOTP(payload);
    setCountdown(60);
    setFormDataOtp({ otp: "" });
  };

  const handleChangeMobileNumber = () => {
    navigate("/verify/mobile");
    setOtpPage(0);
  };

  const handleGoToSignUp = () => {
    navigate("/register");
  };

  const handleGoToSignIn = () => {
    navigate("/login");
  };

  const renderVerifyForm = () => {
    return (
      <Grid item>
        <Grid
          container
          direction="column"
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "35px",
            px: 4,
            py: 4,
            border: "1px solid #D3D3D3",
            boxShadow: "3px 3px 1px #5B5B5B80",
          }}
        >
          <Grid item>
            <Typography variant="body1" fontSize={18} fontWeight="bold">
              Verify your mobile no.
            </Typography>
          </Grid>
          <Grid item sx={{ mt: "5px" }}>
            <Typography variant="caption" color="#1A1A1A">
              We'll send a code to your mobile number
            </Typography>
          </Grid>
          <Grid item>
            <VerifyForm
              authState={verifyMobileState}
              values={formData}
              handleSubmit={handleSubmit}
            />
          </Grid>
          {/* Already have an account link */}
          <Grid item>
            <Grid container justifyContent="center">
              <Typography fontSize={14}>
                Don't have an account?
                <Link
                  // @ts-ignore
                  variant="button"
                  onClick={() => handleGoToSignUp()}
                  style={{
                    marginLeft: "3px",
                    color: "#2196F3",
                    textDecoration: "none",
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justifyContent="center" mt={1}>
              <Typography fontSize={14}>
                Already have an account?
                <Link
                  // @ts-ignore
                  variant="button"
                  onClick={() => handleGoToSignIn()}
                  style={{
                    marginLeft: "3px",
                    color: "#2196F3",
                    textDecoration: "none",
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderOTPForm = () => {
    return (
      <Grid
        container
        direction="column"
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "35px",
          px: 3,
          py: 4,
          border: "1px solid #D3D3D3",
          boxShadow: "3px 3px 1px #5B5B5B80",
        }}
        mb={3}
      >
        <Grid item>
          <Typography variant="body1" fontSize={15} fontWeight="bold">
            Enter One-Time-Pin (OTP)
          </Typography>
        </Grid>
        <Grid item sx={{ mt: "5px" }}>
          <Typography variant="caption" fontSize={13} color="#1A1A1A">
            Please enter 6-digit sent to
            <span
              style={{
                fontWeight: "bold",
                color: "#000000",
                marginLeft: "2px",
              }}
            >
              {verifyMobileState?.data?.mobile}
            </span>
          </Typography>
        </Grid>
        <Grid item>
          <OTPForm
            values={formDataOtp}
            authState={verifyMobileState}
            handleSubmit={handleSubmitOTP}
            handleResend={handleResendOTP}
          />
        </Grid>
        {/* Already have an account link */}
        <Grid item>
          <Grid container justifyContent="center">
            <Typography fontSize={13} color="#1A1A1A">
              Resend Code in {numWithS(formatTime(countdown), countdown)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ mt: 1 }}>
          <Grid container justifyContent="center">
            <Link
              // @ts-ignore
              variant="button"
              onClick={() => handleChangeMobileNumber()}
            >
              <Typography fontSize={13} color="#1A1A1A">
                Change Mobile Number
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const handleCloseSuccessLogin = () => {
    setOtpPage(0);
    setOpenModal(false);
    setTypeModal("");
    navigate("/login");
  };

  const renderModalContent = (contentType: any) => {
    if (contentType === VERIFY_SUCCESS) {
      return (
        <SuccessModalContent
          handleClose={handleCloseSuccessLogin}
          modalType={VERIFY_SUCCESS}
        />
      );
    }
    return <Grid />;
  };

  return (
    <>
      <ContainerStyled>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100vw" }}
          >
            <Grid item xs>
              <Grid
                container
                direction="row"
                alignItems="center"
                mt={0}
                spacing={0}
              >
                <Grid item>
                  <IconButton onClick={() => navigate("/")}>
                    <ChevronLeftIcon
                      sx={{ color: "#FFFFFF", fontSize: "26px" }}
                    />
                  </IconButton>
                </Grid>
                <Grid item ml="-10px">
                  <Typography color="#FFFFFF" fontSize={14} fontWeight={400}>
                    Verify
                  </Typography>
                </Grid>
                <Grid item />
              </Grid>
            </Grid>
            <Grid item xs={1} mt={2} mr={2}>
              <Box
                component="img"
                alt="Signin Guard Icon"
                src={img1ForLogin}
                sx={{
                  width: "35px",
                  height: "auto",
                  px: "auto",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ px: 4, py: 12, width: "100%" }}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            {otpPage === 0 ? renderVerifyForm() : renderOTPForm()}
            {/* Confirm checkbox that your 21 years old */}
            <Grid item mt={4}>
              <Grid container direction="column">
                <Grid item>
                  <Box
                    component="img"
                    alt="Signup Pagcor Logo"
                    src={signupPagcorLogo}
                    height={65}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ContainerStyled>
      <MobileLandscape />
      <PopupModal openModal={openModal} onCloseModal={handleCloseModal}>
        {renderModalContent(typeModal)}
      </PopupModal>
    </>
  );
};
