import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { LoginForm } from "./LoginForm";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1ForLogin from "../../../assets/images/img-1-for-login.jpg";
import signupPagcorLogo from "../../../assets/images/signup-pagcor-logo.png";
import { OTPForm } from "./OTPForm";
import { formatTime, numWithS } from "../../../utils/logic";
import { useLocation } from "react-router-dom";
import { PopupModal } from "../../../components/PopupModal";
import { useNavigate } from "react-router-dom";
import {
  AUTH_LOGIN_SUCCESS,
  PRIVATE_PRIVACY,
  TERMS_AND_CONDITION_CONTENT,
} from "../../../constants";
import { SuccessModalContent } from "../../../components/SuccessModalContent";
import { PrivatePolicyAndTermsModal } from "../../../components/PrivatePolicyAndTermsModal";

import { getCookie, setCookie } from "../../../utils/cookie";
import { GlobalContext } from "../../../context/GlobalProvider";
import { RESET_INITIAL_STATE } from "../../../constants/api";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useLoginContext } from "../../../context/LoginContext";
import { MobileLandscape } from "../../../components/MobileLandscape";

const ContainerStyled = styled(Grid)(() => ({
  display: "none",
  "@media screen and (max-aspect-ratio: 13/9)": {
    display: "block",
    width: "100%",
    height: "100vh",
    background: "url('./assets/backgrounds/login-bg.png')",
    backgroundSize: "100% 50%", // Set the background size to auto width and 50% height
    backgroundPosition: "center 0", // Position the background image at the center horizontally and at the bottom vertically
    backgroundRepeat: "no-repeat", // Prevent the background image from repeating

    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
}));

export const MobileLogin = () => {
  const {
    loginState,
    dispatchLogin,
    // @ts-ignore
    actions: { login, verifyOTPLogin, resendOTP },
  } = useLoginContext() || {};

  // @ts-ignore
  const { clearLayout, setAuthInfo } = useContext(GlobalContext);
  const token = getCookie("token");

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const handleCloseModal = () => setOpenModal(false);
  const [redirect, setRedirect] = useState(false);
  const [aggrement, setAggrement] = useState(false);
  const [otpPage, setOtpPage] = useState(0);
  const [countdown, setCountdown] = useState(0); // Initial countdown value

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const referralCode = params.get("ref") || null;

  const [formData, _] = useState({
    mobile: "",
  });

  // @ts-ignore
  const [formDataOtp, setFormDataOtp] = useState({
    otp: "",
  });

  useEffect(() => {
    dispatchLogin({ type: RESET_INITIAL_STATE });
    if (token && redirect === false) {
      navigate("/home");
    }
  }, [token, redirect, dispatchLogin]);

  useEffect(() => {
    if (loginState?.success) {
      setOtpPage(1);
      setCountdown(loginState?.data.countdownSeconds);
    }
  }, [loginState?.success]);

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
    if (loginState?.successVerifiedOTP) {
      const { data } = loginState;
      const { auth, token: authToken } = data;
      clearLayout();
      setCookie("token", authToken, 1);
      setAuthInfo({ ...auth });
      setOtpPage(0);
      setRedirect(true);
      setOpenModal(true);
      setTypeModal(AUTH_LOGIN_SUCCESS);
    }
  }, [loginState?.successVerifiedOTP, clearLayout]);

  useEffect(() => {
    if (loginState?.successResendOTP) {
      setCountdown(loginState?.data.countdownSeconds);
    }
  }, [loginState?.successResendOTP]);

  const handleAggrement = (event: any) => {
    setAggrement(event.target.checked);
  };

  const handleSubmit = (values: any) => {
    login(values);
  };

  const handleSubmitOTP = (values: any) => {
    const { id } = loginState?.data;
    const payload = {
      id,
      referralCode,
      ...values,
    };
    verifyOTPLogin(payload);
  };

  const handleResendOTP = () => {
    const { id } = loginState?.data;
    const payload = {
      id,
    };
    resendOTP(payload);
    setCountdown(60);
    setFormDataOtp({ otp: "" });
  };

  const handleCloseSuccessLogin = () => {
    setOtpPage(0);
    setOpenModal(false);
    const timeoutRedirect = setTimeout(() => {
      navigate("/home");
    }, 300);
    return () => clearTimeout(timeoutRedirect);
  };

  const handleChangeMobileNumber = () => {
    navigate("/login");
    setOtpPage(0);
  };

  const handleGoToSignUp = () => {
    navigate("/register");
  };

  const handleGoToVerify = () => {
    navigate("/verify/mobile");
  };

  const handleOpenPrivacyPolicy = () => {
    setOpenModal(true);
    setTypeModal(PRIVATE_PRIVACY);
  };

  const handleOpenTermsAndConditions = () => {
    setOpenModal(true);
    setTypeModal(TERMS_AND_CONDITION_CONTENT);
  };

  const renderLoginForm = () => {
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
              Let's sign you in!
            </Typography>
          </Grid>
          <Grid item sx={{ mt: "5px" }}>
            <Typography variant="caption" color="#1A1A1A">
              We'll send a code to your mobile number
            </Typography>
          </Grid>
          <Grid item>
            <LoginForm
              authState={loginState}
              values={formData}
              aggrement={aggrement}
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
                Get verify your mobile?
                <Link
                  // @ts-ignore
                  variant="button"
                  onClick={() => handleGoToVerify()}
                  style={{
                    marginLeft: "3px",
                    color: "#2196F3",
                    textDecoration: "none",
                  }}
                >
                  Verify
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item sx={{ mt: 4, mb: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  value="allowExtraEmails"
                  color="primary"
                  onChange={handleAggrement}
                  sx={{ marginTop: "-30px" }}
                />
              }
              sx={{
                width: "100%",
                textAlign: "left",
              }}
              label={
                <Typography fontSize="12px">
                  {`By signing up, you are confirming that you are above 21
                    years old, and agreed to our`}
                  <Link
                    // @ts-ignore
                    variant="button"
                    onClick={() => handleOpenPrivacyPolicy()}
                    style={{
                      marginLeft: "3px",
                      color: "#2196F3",
                      textDecoration: "none",
                    }}
                  >
                    Privacy Policy
                  </Link>
                  {` and`}
                  <Link
                    // @ts-ignore
                    variant="button"
                    onClick={() => handleOpenTermsAndConditions()}
                    style={{
                      marginLeft: "3px",
                      color: "#2196F3",
                      textDecoration: "none",
                    }}
                  >
                    Terms & Conditions.
                  </Link>
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderModalContent = (contentType: any) => {
    switch (contentType) {
      case AUTH_LOGIN_SUCCESS:
        return (
          <SuccessModalContent
            handleClose={handleCloseSuccessLogin}
            modalType={AUTH_LOGIN_SUCCESS}
          />
        );
      default:
        return (
          <PrivatePolicyAndTermsModal
            contentType={contentType}
            onCloseModal={handleCloseModal}
          />
        );
    }
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
              {loginState?.data?.mobile}
            </span>
          </Typography>
        </Grid>
        <Grid item>
          <OTPForm
            values={formDataOtp}
            authState={loginState}
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
                    Sign Up
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
        <Grid item xs={12} sx={{ px: 4, py: 2 }}>
          <Grid container direction="column" justifyContent="space-between">
            {otpPage === 0 ? renderLoginForm() : renderOTPForm()}
            {/* Confirm checkbox that your 21 years old */}
            <Grid item mt={9}>
              <Grid container direction="column" alignItems="center">
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
