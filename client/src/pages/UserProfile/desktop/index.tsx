import { Grid, Paper, Typography, Link } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserProfileAvatar } from "./UserProfileAvatar";
import { UserProfileForm } from "./UserProfileForm";
import { useUserProfileContext } from "../../../context/UserProfileContext";
import "dayjs/locale/en";
import {
  getDefaultDateFormat,
  getRole,
  uniqueFilename,
} from "../../../utils/logic";
import { useSWRConfig } from "swr";
import { useAlert } from "../../../utils/hooks/useAlert";
import { PageComponent } from "../../../components/PageComponent/index";
import { GlobalContext } from "../../../context/GlobalProvider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ROLES } from "../../../constants";
import { UserProfileReferral } from "./UserProfileReferral";
import { canViewReferralTab } from "../../../utils/permissions/userProfile";

interface IUserProfileProps {}

export const DesktopUserProfile: React.FunctionComponent<
  IUserProfileProps
> = () => {
  const { handleAlertMessage, ...alertRest } = useAlert();
  const [uploadImageProcess, setUploadImageProcess] = useState("");
  const [isTakingSelfie, setIsTakingSelfie] = useState(false);
  const [imageGovtPicture, setImageGovtPicture] = useState(null);
  const [imageGovtIdPic, setImageGovtIdPic] = useState(null);
  const [editorGovtIdPic, setEditorGovtIdPic] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: 0,
    birthdate: "",
    placeOfBirth: "",
    nationalities: "",
    natureOfWork: "",
    sourceOfIncome: "",
    mobile: "",
    email: "",
    address: "",
    usePresentAddress: false,
    currentAddresses: {
      street: "",
      barangayId: "",
      CitiesId: "",
      provinceId: "",
      zipCode: "",
    },
    permanentAddresses: {
      street: "",
      barangayId: "",
      CitiesId: "",
      provinceId: "",
      zipCode: "",
    },
  });

  // @ts-ignore
  const {
    // @ts-ignore
    userProfileState,
    // @ts-ignore
    actions: {
      // @ts-ignore
      uploadProfilePic,
      // @ts-ignore
      updateUserProfile,
      // @ts-ignore
      removeProfilePicture,
      // @ts-ignore
      generateCode,
    },
  } = useUserProfileContext();

  const {
    // @ts-ignore
    auth: authInfo,
    // @ts-ignore
    setAuthInfo,
  } = useContext(GlobalContext);
  const { id } = authInfo;

  const [toCopyReferralLinkSA, setToCopyReferralLinkSA] = useState("");
  const [toCopyReferralLinkMA, setToCopyReferralLinkMA] = useState("");
  const [toCopyReferralLinkA, setToCopyReferralLinkA] = useState("");

  const handleSubmit = (form: any) => {
    const {
      birthdate,
      currentAddresses,
      permanentAddresses,
      usePresentAddress,
      ...rest
    } = form;
    const newCurrentAddresses = {
      street: currentAddresses.street,
      provinceId: currentAddresses.provinceId.id,
      cityId: currentAddresses.cityId.id,
      barangayId: currentAddresses.barangayId.id,
      zipCode: currentAddresses.zipCode,
    };
    const permaCurrentAddresses = {
      street: permanentAddresses.street,
      provinceId: permanentAddresses.provinceId.id,
      cityId: permanentAddresses.cityId.id,
      barangayId: permanentAddresses.barangayId.id,
      zipCode: permanentAddresses.zipCode,
    };

    const newForm = {
      birthdate: getDefaultDateFormat(birthdate),
      usePresentAddress: usePresentAddress,
      currentAddresses: newCurrentAddresses,
      permanentAddresses: permaCurrentAddresses,
      ...rest,
    };
    updateUserProfile(newForm);
  };

  useEffect(() => {
    if (authInfo?.role === ROLES.SUPERAGENT.name) {
      setToCopyReferralLinkSA(authInfo?.referralLinkForSA);
      setToCopyReferralLinkA(authInfo?.referralLinkForAgent);
    } else if (authInfo?.role === ROLES.MASTERAGENT.name) {
      setToCopyReferralLinkMA(authInfo?.referralLinkForMA);
      setToCopyReferralLinkA(authInfo?.referralLinkForAgent);
    } else if (authInfo?.role === ROLES.AGENT.name) {
      setToCopyReferralLinkA(authInfo?.referralLinkForAgent);
    }
  }, [authInfo]);

  useEffect(() => {
    if (userProfileState.generateCode) {
      setAuthInfo({
        ...authInfo,
        referralCodeForAgent: userProfileState?.data?.referralCodeForAgent,
        referralLinkForAgent: userProfileState?.data?.referralLinkForAgent,
        referralCodeForMA: userProfileState?.data?.referralCodeForMA,
        referralLinkForMA: userProfileState?.data?.referralLinkForMA,
        referralCodeForSA: userProfileState?.data?.referralCodeForSA,
        referralLinkForSA: userProfileState?.data?.referralLinkForSA,
      });
    }
  }, [userProfileState.generateCode]);

  useEffect(() => {
    if (userProfileState.isUploadedProfilePic) {
      if (uploadImageProcess === "govt") {
        setAuthInfo({
          ...authInfo,
          govtPicture: userProfileState?.data,
        });

        setUploadImageProcess("");
        setIsTakingSelfie(false);
        setImageGovtPicture(null);
      } else if (uploadImageProcess === "govtIdPic") {
        setAuthInfo({
          ...authInfo,
          govtIdPicture: userProfileState?.data,
        });
        setUploadImageProcess("");
        setImageGovtIdPic(null);
        setEditorGovtIdPic(null);
      }
    }
  }, [userProfileState.isUploadedProfilePic]);

  const handleRemoveProfilePicture = () => {
    removeProfilePicture();
  };

  const handleUploadingProfilePic = (id: any, formData: any) => {
    const type = "user";
    setUploadImageProcess(type);
    uploadProfilePic(id, formData, type);
  };

  useEffect(() => {
    if (authInfo) {
      const {
        role,
        profilePicture,
        uuid,
        currentAddress,
        permanentAddress,
        ...rest
      } = authInfo;

      setFormData({
        ...rest,
        permanentAddresses: {
          street: permanentAddress?.street || "",
          barangayId: permanentAddress?.barangay || "",
          cityId: permanentAddress?.city || "",
          provinceId: permanentAddress?.province || "",
          zipCode: permanentAddress?.zipCode || "",
        },
        currentAddresses: {
          street: currentAddress?.street || "",
          barangayId: currentAddress?.barangay || "",
          cityId: currentAddress?.city || "",
          provinceId: currentAddress?.province || "",
          zipCode: currentAddress?.zipCode || "",
        },
      });
    }
  }, [authInfo]);

  const handleUploadTheSelfie = async (webcamRef: any, image: any) => {
    try {
      // Check if webcamRef.current and image are not null before uploading
      if (webcamRef && image) {
        //  @ts-ignore
        const capturedImage = webcamRef.getScreenshot();

        if (capturedImage) {
          const blob = await fetch(capturedImage).then((res) => res.blob());

          const file = new File([blob], uniqueFilename, { type: "image/jpeg" });

          const formData = new FormData();
          formData.append("image", file);
          const type = "govt";
          setUploadImageProcess(type);
          uploadProfilePic(id, formData, type);
        } else {
          console.error("Failed to capture image.");
        }
      } else {
        console.error("No image or webcam reference.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUploadGovtIdPic = async (editorGovtIdPic: any) => {
    // @ts-ignore
    const canvas = editorGovtIdPic.getImageScaledToCanvas();
    // @ts-ignore
    const blob: Blob = await new Promise((resolve) => canvas.toBlob(resolve));

    const file = new File([blob], uniqueFilename, { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", file);
    const type = "govtIdPic";
    setUploadImageProcess(type);
    uploadProfilePic(id, formData, type);
  };

  const handleIsTakingSelfie = (value: any) => {
    setIsTakingSelfie(value);
  };

  const handleUploadImageProcess = () => {
    setUploadImageProcess("");
  };

  const copyReferralLink = (type: any) => {
    if (type === "SA") {
      navigator.clipboard.writeText(toCopyReferralLinkSA).catch((error) => {
        console.error("Error copying text:", error);
      });
    } else if (type === "MA") {
      navigator.clipboard.writeText(toCopyReferralLinkMA).catch((error) => {
        console.error("Error copying text:", error);
      });
    } else if (type === "A") {
      navigator.clipboard.writeText(toCopyReferralLinkA).catch((error) => {
        console.error("Error copying text:", error);
      });
    }
  };

  return (
    //  @ts-ignore
    <PageComponent
      showAlert={alertRest.showAlert}
      handleCloseAlert={alertRest.handleCloseAlert}
      alertSeverity={alertRest.alertSeverity}
      alertMessage={alertRest.alertMessage}
    >
      <Grid container direction="column" sx={{}}>
        <Grid item xs={12} md={8} lg={9} sx={{ my: 2, mx: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Profile
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Grid container direction="row">
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Grid container>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Paper
                    sx={{
                      mx: 1,
                      mb: 2,
                      border: "1px solid #c5c5c5",
                      display: "flex",
                      flexDirection: "column",
                      pb: 3,
                    }}
                  >
                    {/* @ts-ignore */}
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <UserProfileAvatar
                        authInfo={authInfo}
                        userProfileData={authInfo}
                        userProfileState={userProfileState}
                        onRemoveProfilePicture={handleRemoveProfilePicture}
                        onUploadingProfilePic={handleUploadingProfilePic}
                        setUploadImageProcess={handleUploadImageProcess}
                      />

                      {authInfo?.role && (
                        <Grid item sx={{ mt: 0 }}>
                          {getRole(authInfo?.role)}
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
                {canViewReferralTab(authInfo?.role) && (
                  <UserProfileReferral
                    authInfo={authInfo}
                    copyReferralLink={copyReferralLink}
                    generateCode={generateCode}
                  />
                )}
              </Grid>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9} xl={10}>
              <Paper
                sx={{
                  mx: 1,
                  border: "1px solid #c5c5c5",
                  display: "flex",
                  flexDirection: "column",
                  mb: 1,
                }}
                elevation={3}
              >
                <Grid container sx={{ mt: 2 }}>
                  <UserProfileForm
                    handleSubmit={handleSubmit}
                    values={formData}
                    userProfileState={userProfileState}
                    uploadTheSelfie={handleUploadTheSelfie}
                    onIsTakingSelfie={handleIsTakingSelfie}
                    isTakingSelfie={isTakingSelfie}
                    authInfo={authInfo}
                    /* File Uploading */
                    setImageGovtPicture={setImageGovtPicture}
                    imageGovtPicture={imageGovtPicture}
                    imageGovtIdPic={imageGovtIdPic}
                    setImageGovtIdPic={setImageGovtIdPic}
                    editorGovtIdPic={editorGovtIdPic}
                    setEditorGovtIdPic={setEditorGovtIdPic}
                    uploadGovtIdPic={handleUploadGovtIdPic}
                  />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageComponent>
  );
};
