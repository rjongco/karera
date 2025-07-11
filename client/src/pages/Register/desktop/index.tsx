import { useState, useContext, useEffect, useRef } from "react";
import { Typography, Link, Button, Grid, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { RegisterForm } from "./RegisterForm";
import { OTPForm } from "../../../components/OTPForm";
import BasicModal from "../../../components/BasicModal";
import {
  TERMS_AND_CONDITION_CONTENT,
  PRIVATE_PRIVACY,
} from "../../../constants";
import { MODAL_CONTENT } from "../../../constants/modals";
import { formatTime, numWithS, useSize } from "../../../utils/logic";
import { useLocation } from "react-router-dom";
import img1ForLogin from "../../../assets/images/img-1-for-login.jpg";
import signupPagcorLogo from "../../../assets/images/signup-pagcor-logo.png";

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
import { useNavigate } from "react-router-dom";
import { useRegisterContext } from "../../../context/RegisterContext";

const SuccessButtonStyled = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  padding: "10px 40px",
  borderRadius: "30px",
}));

export const DesktopRegister = () => {
  const {
    registerState,
    // @ts-ignore
    actions: { register, verifyOTP, resendOTP },
  } = useRegisterContext() || {};

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

  const location = useLocation();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newReferralCode = params.get("ref") || null;
    console.log(newReferralCode);
    setReferralCode(newReferralCode);
  }, [location]);

  const [otpPage, setOtpPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [countdown, setCountdown] = useState(0); // Initial countdown value
  // @ts-ignore
  const [formData, _] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    birthdate: "",
  });

  // @ts-ignore
  const [formDataOtp, setFormDataOtp] = useState({
    otp: "",
  });

  useEffect(() => {
    if (registerState.success) {
      setOtpPage(1);
      setCountdown(registerState?.data?.countdownSeconds || 0);
    }
  }, [registerState.success]);

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
    if (registerState.successVerifiedOTP) {
      setOtpPage(2);
    }
  }, [registerState.successVerifiedOTP]);

  useEffect(() => {
    if (registerState.successResendOTP) {
      setCountdown(registerState?.data?.countdownSeconds || 0);
    }
  }, [registerState.successResendOTP]);

  const handleSubmit = (values: any) => {
    const payload = {
      ...values,
    };
    register(payload);
  };

  const handleSubmitOTP = (values: any) => {
    const { id } = registerState.data;
    const payload = {
      id,
      referralCode,
      ...values,
    };
    verifyOTP(payload);
  };

  const handleResendOTP = () => {
    const { id } = registerState.data;
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

  const renderRegistrationPage = () => {
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
          <Typography fontSize={18}>Let’s create your account!</Typography>
        </Grid>
        <Grid item>
          <RegisterForm
            values={formData}
            handleSubmit={handleSubmit}
            authState={registerState}
            onPrivacyPolicy={openPrivacyPolicy}
            onTermsAndConditions={openTermsAndConditions}
          />
        </Grid>

        <Grid item>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Typography fontSize={14}>
              Already have an account? <Link href="/login">Sign in</Link>
            </Typography>
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
              {registerState?.data?.mobile}
            </span>
          </Typography>
        </Grid>
        <Grid item>
          <OTPForm
            values={formDataOtp}
            handleSubmit={handleSubmitOTP}
            handleResend={handleResendOTP}
            authState={registerState}
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
              <Link href="/register" variant="body2">
                Change phone number
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderFinishRegister = () => {
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
            Your account has been successfully created!
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
                        alt="Signup Guard Icon"
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
                    ? renderRegistrationPage()
                    : otpPage === 1
                    ? renderSendOTPPage()
                    : renderFinishRegister()}
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
