import { useState, useContext, useEffect, useRef } from "react";
import { Typography, Link, Button, Grid, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { LoginForm } from "./LoginForm";
import BasicModal from "../../../components/BasicModal";
import { MODAL_CONTENT } from "../../../constants/modals";
import {
  PRIVATE_PRIVACY,
  TERMS_AND_CONDITION_CONTENT,
} from "../../../constants";
import { OTPForm } from "../../../components/OTPForm";
import { formatTime, numWithS, useSize } from "../../../utils/logic";
import { getCookie, setCookie } from "../../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { RESET_INITIAL_STATE } from "../../../constants/api";
import { GlobalContext } from "../../../context/GlobalProvider";
import img1ForLogin from "../../../assets/images/img-1-for-login.jpg";
import signupPagcorLogo from "../../../assets/images/signup-pagcor-logo.png";
import { useLoginContext } from "../../../context/LoginContext";

const ContainerStyled = styled(Grid)(() => ({
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
}));

export const DesktopLogin = () => {
  const {
    loginState,
    dispatchLogin,
    // @ts-ignore
    actions: { login, verifyOTPLogin, resendOTP },
  } = useLoginContext() || {};

  // @ts-ignore
  const { clearLayout, setAuthInfo } = useContext(GlobalContext);

  const target = useRef(null);
  const size = useSize(target);
  const [isXSHeight, setIsXSHeight] = useState(false);

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
  const [otpPage, setOtpPage] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [countdown, setCountdown] = useState(0); // Initial countdown value
  // const [cookie, setCookies] = useCookies();
  const navigate = useNavigate();
  // const token = sessionStorage.getItem("token");
  const token = getCookie("token");

  // @ts-ignore
  const [formData, _] = useState({
    mobile: "",
  });

  // @ts-ignore
  const [formDataOtp, setFormDataOtp] = useState({
    otp: "",
  });

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
      setIsRegistered(true);
      setOtpPage(2);
      const { data } = loginState;
      const { auth, token: authToken } = data;
      setCookie("token", authToken, 1);
      clearLayout();
      setAuthInfo({ ...auth });

      navigate("/admin/dashboard");
      dispatchLogin({ type: RESET_INITIAL_STATE });
    } else {
      if (token) {
        navigate("/admin/dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [loginState?.successVerifiedOTP, token, dispatchLogin]);

  useEffect(() => {
    if (loginState?.successResendOTP) {
      setCountdown(loginState?.data.countdownSeconds);
    }
  }, [loginState?.successResendOTP]);

  const handleSubmit = (values: any) => {
    login(values);
  };

  const handleSubmitOTP = (values: any) => {
    const { id } = loginState?.data;
    const payload = {
      id,
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

  const openPrivacyPolicy = () => {
    setTypeModal(PRIVATE_PRIVACY);
    setOpenModal(true);
  };

  const openTermsAndConditions = () => {
    setTypeModal(TERMS_AND_CONDITION_CONTENT);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const renderLoginPage = () => {
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
          <Typography fontSize={18}>Let’s sign you in!</Typography>
        </Grid>
        <Grid item>
          <Typography fontSize={12}>
            We’ll send a code to your mobile number
          </Typography>
        </Grid>
        <Grid item>
          <LoginForm
            values={formData}
            handleSubmit={handleSubmit}
            authState={loginState}
            onPrivacyPolicy={openPrivacyPolicy}
            onTermsAndConditions={openTermsAndConditions}
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
                <Link href="/register">Register</Link>
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography fontSize={14} textAlign="right">
                <Link href="/verify/mobile">Verify</Link>
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
          <Typography fontSize={18}>Enter One-Time-PIN (OTP)</Typography>
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
              {loginState?.data?.mobile}
            </span>
          </Typography>
        </Grid>
        <Grid item>
          <OTPForm
            values={formDataOtp}
            handleSubmit={handleSubmitOTP}
            handleResend={handleResendOTP}
            authState={loginState}
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
              <Link href="/login" variant="body2">
                Change phone number
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderFinishLogin = () => {
    if (isRegistered) {
      return (
        <div>test</div>
        // <Grid
        //   container
        //   direction="column"
        //   sx={{
        //     width: "100%",
        //     height: "auto",
        //     backgroundColor: "#FFFFFF",
        //     px: 4,
        //     py: 4,
        //     borderRadius: "35px",
        //     border: "1px solid #D3D3D3",
        //     boxShadow: "3px 3px 1px #5B5B5B80",
        //   }}
        // >
        //   <Grid item>
        //     <Typography fontSize={20} textAlign="center">
        //       Authenticated
        //     </Typography>
        //   </Grid>
        //   <Grid item>
        //     <Grid container justifyContent="center" sx={{ mt: 2 }}>
        //       <Typography fontSize={14}>
        //         <img src={success} alt="success login" />
        //       </Typography>
        //     </Grid>
        //   </Grid>
        //   <Grid item>
        //     <Typography fontSize={16} textAlign="center">
        //       You will be redirected!
        //     </Typography>
        //   </Grid>
        // </Grid>
      );
    }
  };

  const renderTitleModal = () => {
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h6" component="h2">
          {MODAL_CONTENT(typeModal)?.title}
        </Typography>
      </Grid>
    );
  };

  const renderContentModal = () => {
    return (
      <>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          sx={{ mt: 3 }}
        >
          <Typography sx={{ overflowY: "auto", height: "50vh" }}>
            {MODAL_CONTENT(typeModal)?.content}
          </Typography>
        </Grid>
        {renderFooterModal()}
      </>
    );
  };

  const renderFooterModal = () => {
    return (
      <Grid container direction="row" sx={{ mt: 3, width: "100%" }}>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end">
            <Button
              onClick={handleCloseModal}
              sx={{ ml: -1.5, mt: 3, color: "green" }}
            >
              OK
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <ContainerStyled
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
                        alt="Signin Guard Icon"
                        src={img1ForLogin}
                        sx={{
                          width: "85px",
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
                    ? renderLoginPage()
                    : otpPage === 1
                    ? renderSendOTPPage()
                    : renderFinishLogin()}
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
      </ContainerStyled>

      {/* @ts-ignore */}
      <BasicModal
        open={openModal}
        onCloseModal={handleCloseModal}
        title={renderTitleModal()}
        content={renderContentModal()}
      />
    </>
  );
};
