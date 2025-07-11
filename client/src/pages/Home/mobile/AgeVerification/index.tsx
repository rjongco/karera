import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { SuccessModalContent } from "../../../../components/SuccessModalContent";
import { PrivatePolicyAndTermsModal } from "../../../../components/PrivatePolicyAndTermsModal";
import { PopupModal } from "../../../../components/PopupModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",

  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  padding: "10px 0",
};

const IAMOVER21 = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
}));

import signupPagcorLogo from "../../../../assets/images/signup-pagcor-logo.png";
import { useEffect, useState } from "react";
import {
  AUTH_LOGIN_SUCCESS,
  PRIVATE_PRIVACY,
  TERMS_AND_CONDITION_CONTENT,
} from "../../../../constants";

export const AgeVerification = (props: any) => {
  const [typeModal, setTypeModal] = useState("");
  const [openModalAgeVerification, setOpenModalAgeVerification] =
    useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModalAgeVerification = () => {
    sessionStorage.setItem("ageVerified", "true");
    setOpenModalAgeVerification(false);
  };

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    const ageVerification = sessionStorage.getItem("ageVerified");
    if (ageVerification === null || ageVerification === "false") {
      setOpenModalAgeVerification(true);
    }
  }, []);

  const handleOpenPrivacyPolicy = () => {
    setOpenModal(true);
    setTypeModal(PRIVATE_PRIVACY);
  };

  const handleOpenTermsAndConditions = () => {
    setOpenModal(true);
    setTypeModal(TERMS_AND_CONDITION_CONTENT);
  };

  const renderModalContent = (contentType: any) => {
    if (contentType === AUTH_LOGIN_SUCCESS) {
      return (
        <SuccessModalContent
          handleClose={handleCloseModal}
          modalType={AUTH_LOGIN_SUCCESS}
        />
      );
    } else if (contentType === PRIVATE_PRIVACY) {
      return (
        <PrivatePolicyAndTermsModal
          contentType={contentType}
          onCloseModal={handleCloseModal}
        />
      );
    }

    return <Grid container />;
  };

  const renderModalContentAgeVerification = () => {
    return (
      <Box sx={style}>
        <Grid container direction="column" alignItems="center">
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            sx={{ pt: 4, pb: 1, px: 3 }}
          >
            <div
              style={{ position: "absolute", top: 10, right: 10, color: "red" }}
            >
              <IconButton onClick={() => setOpenModalAgeVerification(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ width: "60vw" }}
              >
                <Grid item>
                  <Typography fontSize={16} fontWeight={700}>
                    Age Verification
                  </Typography>
                </Grid>
                <Grid item mt={2} px={1}>
                  <Typography fontSize={12} fontWeight={400} textAlign="center">
                    Please verify that you are 21 years old or older to enter
                    this site.
                  </Typography>
                </Grid>

                <Grid item mt={2} px={1}>
                  <Typography fontSize={10} fontWeight={400} textAlign="center">
                    I agree to the KareraLive
                  </Typography>
                  <Typography fontSize={10} fontWeight={400} textAlign="center">
                    <Link
                      // @ts-ignore
                      variant="button"
                      onClick={() => handleOpenPrivacyPolicy()}
                      style={{
                        marginLeft: "3px",
                        color: "#FF2020",
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
                        color: "#FF2020",
                        textDecoration: "none",
                      }}
                    >
                      Terms & Conditions.
                    </Link>
                  </Typography>
                </Grid>

                <Grid item mt={2} px={1}>
                  <IAMOVER21
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      sessionStorage.setItem("ageVerified", "true");
                      setOpenModalAgeVerification(false);
                    }}
                    sx={{ py: 1, px: 2 }}
                  >
                    <Typography
                      fontSize={12}
                      fontWeight={700}
                      textAlign="center"
                    >
                      I am over 21 Years Old
                    </Typography>
                  </IAMOVER21>
                </Grid>
                <Grid item mt={2} px={1}>
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
      </Box>
    );
  };

  return (
    <>
      <PopupModal
        openModal={openModalAgeVerification}
        onCloseModal={handleCloseModalAgeVerification}
      >
        {renderModalContentAgeVerification()}
      </PopupModal>
      <PopupModal openModal={openModal} onCloseModal={handleCloseModal}>
        {renderModalContent(typeModal)}
      </PopupModal>
    </>
  );
};
