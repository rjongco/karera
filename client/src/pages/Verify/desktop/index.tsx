import { useState, useEffect, useRef } from "react";
import { Typography, Link, Button, Grid, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { VerifyForm } from "./VerifyForm";
import { OTPForm } from "../../../components/OTPForm";

import { formatTime, numWithS, useSize } from "../../../utils/logic";
import { useLocation } from "react-router-dom";
import img1ForLogin from "../../../assets/images/img-1-for-login.jpg";
import signupPagcorLogo from "../../../assets/images/signup-pagcor-logo.png";

const ContainerVerifyStyled = styled(Grid)(() => ({
  width: "100%",
  height: "100vh",
  background: "url('../assets/backgrounds/login-bg.png')",
  backgroundSize: "100% 50%", // Set the background size to auto width and 50% height
  backgroundPosition: "center 0", // Position the background image at the center horizontally and at the bottom vertically
  backgroundRepeat: "no-repeat", // Prevent the background image from repeating
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
}));
import { useNavigate } from "react-router-dom";
import { useVerifyMobileContext } from "../../../context/VerifyMobileContext";

const SuccessButtonStyled = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  padding: "10px 40px",
  borderRadius: "30px",
}));

export const DesktopVerify = () => {
  const {
    // @ts-ignore
    verifyMobileState,
    // @ts-ignore
    dispatchVerifyMobile,
    // @ts-ignore
    actions: { verify, verifyMobileOTP, resendOTP },
  } = useVerifyMobileContext() || {};

  const target = useRef(null);
  const size = useSize(target);
  const [isXSHeight, setIsXSHeight] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    if (size && size.width && size.width != 0) {
      // @ts-ignore
      if (size.height < 600) {
        setIsXSHeight(true);
      } else {
        setIsXSHeight(false);
      }
    }
  }, [size]);

  const PagCorGrid = styled(Grid)(() => ({
    display: isXSHeight ? "none" : "block",
  }));

  const GuardIconGrid = styled(Grid)(() => ({
    display: isXSHeight ? "none" : "block",
  }));

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const referralCode = params.get("ref") || null;

  const [otpPage, setOtpPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [countdown, setCountdown] = useState(0); // Initial countdown value
  // @ts-ignore
  const [formData, _] = useState({
    mobile: "",
  });

  // @ts-ignore
  const [formDataOtp, setFormDataOtp] = useState({
    otp: "",
  });

  useEffect(() => {
    if (verifyMobileState.success) {
      setOtpPage(1);
      setCountdown(verifyMobileState?.data.countdownSeconds);
    }
  }, [verifyMobileState.success]);

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
    if (verifyMobileState.successVerifiedOTP) {
      setOtpPage(2);
    }
  }, [verifyMobileState.successVerifiedOTP]);

  useEffect(() => {
    if (verifyMobileState.successResendOTP) {
      setCountdown(verifyMobileState?.data.countdownSeconds);
    }
  }, [verifyMobileState.successResendOTP]);

  const handleSubmit = (values: any) => {
    const payload = {
      ...values,
    };

    verify(payload);
  };

  const handleSubmitOTP = (values: any) => {
    const { id } = verifyMobileState.data;
    const payload = {
      id,
      referralCode,
      ...values,
    };
    verifyMobileOTP(payload);
  };

  const handleResendOTP = () => {
    const { id } = verifyMobileState.data;
    const payload = {
      id,
    };
    resendOTP(payload);
    setCountdown(60);
    setFormDataOtp({ otp: "" });
  };

  const renderVerifyPage = () => {
    return (
      <Grid
        container
        direction="column"
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "#FFFFFF",
          px: 4,
          py: 4,
          borderRadius: "35px",
          border: "1px solid #D3D3D3",
          boxShadow: "3px 3px 1px #5B5B5B80",
        }}
      >
        <Grid item>
          <Typography fontSize={18}>Verify your mobile number!</Typography>
        </Grid>
        <Grid item>
          <VerifyForm
            values={formData}
            handleSubmit={handleSubmit}
            authState={verifyMobileState}
          />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Grid item md={6}>
              <Typography fontSize={14} textAlign="left">
                <Link href="/login">Login</Link>
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography fontSize={14} textAlign="right">
                <Link href="/register">Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderSendOTPPage = () => {
    return (
      <Grid
        container
        direction="column"
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "#FFFFFF",
          px: 4,
          py: 4,
          borderRadius: "35px",
          border: "1px solid #D3D3D3",
          boxShadow: "3px 3px 1px #5B5B5B80",
        }}
      >
        <Grid item>
          <Typography fontSize={18}>Enter One-Time-Pin (OTP)</Typography>
        </Grid>
        <Grid item>
          <Typography fontSize={12}>
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
        {referralCode && (
          <Grid item>
            <Typography fontSize={12} sx={{ fontStyle: "italic" }}>
              If you want to change the code in the link, you need to refresh
              the page
            </Typography>
          </Grid>
        )}
        <Grid item>
          <OTPForm
            values={formDataOtp}
            handleSubmit={handleSubmitOTP}
            handleResend={handleResendOTP}
            authState={verifyMobileState}
          />
        </Grid>
        <Grid item>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Typography fontSize={14}>
              Resend Code in {numWithS(formatTime(countdown), countdown)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Typography fontSize={14}>
              <Link href="/verify/mobile" variant="body2">
                Change phone number
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderFinishVerify = () => {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "auto",
          backgroundColor: "#FFFFFF",
          px: 2,
          py: 4,
          borderRadius: "35px",
          border: "1px solid #D3D3D3",
          boxShadow: "3px 3px 1px #5B5B5B80",
        }}
      >
        <Grid item md={12}>
          <Typography fontSize={20} fontWeight={600} textAlign="center">
            Success
          </Typography>
        </Grid>
        <Grid item md={12} mt={2} px={2}>
          <Typography fontSize={16} textAlign="center">
            Your account has been successfully verified!
          </Typography>
        </Grid>
        <Grid item md={12} mt={4} px={5}>
          <SuccessButtonStyled
            variant="contained"
            fullWidth
            onClick={() => navigate("/login")}
          >
            <Typography
              fontSize={14}
              fontWeight={400}
              textAlign="center"
              color="#FFFFFF"
            >
              Lets Go!
            </Typography>
          </SuccessButtonStyled>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <ContainerVerifyStyled
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        ref={target}
      >
        <CssBaseline />
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100vw", height: "100vh" }}
          >
            <Grid item xs sm md lg />
            <Grid item xs={8} sm={6} md={4} lg={3} sx={{ height: "100%" }}>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                sx={{ height: "100%" }}
              >
                <Grid item md>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: "100%" }}
                  >
                    <GuardIconGrid item>
                      <Box
                        component="img"
                        alt="Verify Guard Icon"
                        src={img1ForLogin}
                        sx={{
                          width: "65px",
                          height: "auto",
                        }}
                      />
                    </GuardIconGrid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  md
                  sx={{
                    width: "100%",
                  }}
                >
                  {otpPage === 0
                    ? renderVerifyPage()
                    : otpPage === 1
                    ? renderSendOTPPage()
                    : renderFinishVerify()}
                </Grid>
                <Grid item md>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: "100%" }}
                  >
                    <PagCorGrid item>
                      <Box
                        component="img"
                        alt="Signup Pagcor Logo"
                        src={signupPagcorLogo}
                        height={65}
                      />
                    </PagCorGrid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs sm md lg />
          </Grid>
        </Grid>
      </ContainerVerifyStyled>
    </>
  );
};
