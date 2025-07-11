import {
  Grid,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  FormControl,
  Typography,
  FormLabel,
  Button,
  styled,
  FormHelperText,
  Box,
} from "@mui/material";
import { Formik } from "formik";
import { UserProfileSchema } from "../../../utils/schema";
import { useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { returnMommentDate } from "../../../utils/logic";
import { CameraUpload } from "../../../components/CameraUpload";
import { FileUpload } from "../../../components/FileUpload";
import { UserProfileAddresses } from "./UserProfileAddresses";
import { NATIONALITIES, govTypeSelect } from "../../../constants";

interface IUserProfileFormProps {
  innerRef?: any;
  validateRef?: any;
  setTouchedRef?: any;
  isLoading?: any;
  values?: any;
  handleSubmit?: any;
  userProfileState?: any;
  uploadTheSelfie?: any;
  onIsTakingSelfie?: any;
  isTakingSelfie?: any;
  authInfo?: any;
  setImageGovtPicture?: any;
  imageGovtPicture?: any;
  imageGovtIdPic?: any;
  setImageGovtIdPic?: any;
  editorGovtIdPic?: any;
  setEditorGovtIdPic?: any;
  uploadGovtIdPic?: any;
}

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 3px 0  3px 1px;
    border-radius: 0;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-bottom: 1px solid black;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    margin: 0 0 5px -2px;

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

export const UserProfileForm: React.FunctionComponent<
  IUserProfileFormProps
> = ({
  innerRef,
  validateRef,
  setTouchedRef,
  isLoading,
  values,
  handleSubmit,
  // @ts-ignore
  userProfileState,
  uploadTheSelfie,
  onIsTakingSelfie,
  isTakingSelfie,
  authInfo,
  setImageGovtPicture,
  imageGovtPicture,
  imageGovtIdPic,
  setImageGovtIdPic,
  editorGovtIdPic,
  setEditorGovtIdPic,
  uploadGovtIdPic,
}) => {
  const [error, setError] = useState(false);
  const [isFieldEditing, setIsFieldEditing] = useState(false);

  const handleFieldFocus = () => {
    setIsFieldEditing(true);
  };

  const handleFieldBlur = () => {
    setIsFieldEditing(false);
  };

  return (
    <Formik
      enableReinitialize
      innerRef={innerRef}
      initialValues={{
        ...values,
      }}
      validationSchema={UserProfileSchema}
      onSubmit={(values, actions) => {
        handleFieldBlur();
        handleSubmit(values);
      }}
    >
      {({
        values,
        handleSubmit,
        isValid,
        errors,
        touched,
        setTouched,
        validateForm,
        setFieldValue,
        handleBlur,
        handleChange,
        setValues,
      }) => {
        if (validateRef) validateRef.current = validateForm;
        if (setTouchedRef) setTouchedRef.current = setTouched;

        return (
          <Grid container>
            <Box component="form" noValidate sx={{ width: "100%" }}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 1, ml: 3 }}>
                  Personal Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
                {/* First Name and Last Name */}
                <Grid item xs={12} sm={12} md={12} sx={{ px: 1 }}>
                  <Grid
                    container
                    flexDirection="row"
                    justifyContent="space-between"
                    sx={{}}
                  >
                    <Grid item xs={12} sm={6} md={6} sx={{ px: 2, mb: 2 }}>
                      <TextField
                        type="text"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        autoFocus
                        value={values?.firstName || ""}
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onFocus={handleFieldFocus}
                        onBlur={() => {
                          handleBlur("firstName");
                        }}
                        error={Boolean(
                          (errors.firstName && touched.firstName) ||
                            userProfileState?.errorMessage["firstName"]
                        )}
                        helperText={
                          errors.firstName && touched.firstName
                            ? errors.firstName
                            : userProfileState.errorMessage
                            ? userProfileState.errorMessage["firstName"]
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{ px: 2 }}>
                      <TextField
                        type="text"
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={values.lastName || ""}
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onFocus={handleFieldFocus}
                        onBlur={() => {
                          handleBlur("lastName");
                        }}
                        error={Boolean(
                          (errors.lastName && touched.lastName) ||
                            userProfileState.errorMessage["lastName"]
                        )}
                        helperText={
                          errors.lastName && touched.lastName
                            ? errors.lastName
                            : userProfileState.errorMessage
                            ? userProfileState.errorMessage["lastName"]
                            : ""
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* Gender */}
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 0, px: 3 }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    id="gender"
                    name="gender"
                    value={values.gender || ""}
                    label="Gender"
                    fullWidth
                    onChange={handleChange}
                    onFocus={handleFieldFocus}
                    onBlur={() => {
                      handleBlur("gender");
                    }}
                    error={Boolean(
                      (errors.gender && touched.gender) ||
                        userProfileState.errorMessage["gender"]
                    )}
                  >
                    <MenuItem value={0}>Select gender</MenuItem>
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.lastName && touched.lastName
                      ? errors.lastName
                      : userProfileState.errorMessage
                      ? userProfileState.errorMessage["lastName"]
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
              {/* Birthdate */}
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 2, px: 3 }}>
                <FormControl
                  variant="standard"
                  fullWidth
                  onFocus={handleFieldFocus}
                >
                  <DatePicker
                    label="Birthdate"
                    value={dayjs(new Date(values.birthdate)) || null}
                    // defaultValue={dayjs(new Date(values.birthdate))}
                    // @ts-ignore
                    id="birthdate"
                    name="birthdate"
                    format="YYYY-MM-DD"
                    onChange={(date) => {
                      setFieldValue("birthdate", returnMommentDate(date));
                    }}
                    onBlur={() => {
                      handleBlur("birthdate");
                    }}
                    slotProps={{
                      textField: {
                        variant: "standard",

                        error: Boolean(errors.birthdate && touched.birthdate),
                        helperText:
                          errors.birthdate && touched.birthdate
                            ? errors.birthdate
                            : userProfileState.errorMessage
                            ? userProfileState.errorMessage["birthdate"]
                            : "",
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              {/* Place of Birth */}
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 2, px: 3 }}>
                <TextField
                  type="text"
                  id="placeOfBirth"
                  name="placeOfBirth"
                  label="Place of Birth"
                  autoFocus
                  value={values?.placeOfBirth || ""}
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onFocus={handleFieldFocus}
                  onBlur={() => {
                    handleBlur("placeOfBirth");
                  }}
                  error={Boolean(
                    (errors.placeOfBirth && touched.placeOfBirth) ||
                      userProfileState?.errorMessage["placeOfBirth"]
                  )}
                  helperText={
                    errors.placeOfBirth && touched.placeOfBirth
                      ? errors.placeOfBirth
                      : userProfileState.errorMessage
                      ? userProfileState.errorMessage["placeOfBirth"]
                      : ""
                  }
                />
              </Grid>
              {/* Nationalities */}
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 2, px: 3 }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Nationality
                  </InputLabel>
                  <Select
                    id="nationalities"
                    name="nationalities"
                    label="Nationality"
                    defaultValue=""
                    value={values.nationalities || ""}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      errors.nationalities ||
                        userProfileState.errorMessage["nationalities"]
                    )}
                  >
                    {NATIONALITIES.map((nationality, i) => (
                      <MenuItem key={`nationality-${i}`} value={nationality}>
                        {nationality}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.nationalities && touched.nationalities
                      ? errors.nationalities
                      : userProfileState.errorMessage
                      ? userProfileState.errorMessage["nationalities"]
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
              {/* Nature of Work */}
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 2, px: 3 }}>
                <TextField
                  type="text"
                  id="natureOfWork"
                  name="natureOfWork"
                  label="Nature of Work"
                  autoFocus
                  value={values?.natureOfWork || ""}
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onFocus={handleFieldFocus}
                  onBlur={() => {
                    handleBlur("natureOfWork");
                  }}
                  error={Boolean(
                    (errors.natureOfWork && touched.natureOfWork) ||
                      userProfileState?.errorMessage["natureOfWork"]
                  )}
                  helperText={
                    errors.natureOfWork && touched.natureOfWork
                      ? errors.natureOfWork
                      : userProfileState.errorMessage
                      ? userProfileState.errorMessage["natureOfWork"]
                      : ""
                  }
                />
              </Grid>
              {/* Source of Income */}
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 2, px: 3 }}>
                <TextField
                  type="text"
                  id="sourceOfIncome"
                  name="sourceOfIncome"
                  label="Source of Income"
                  autoFocus
                  value={values?.sourceOfIncome || ""}
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onFocus={handleFieldFocus}
                  onBlur={() => {
                    handleBlur("sourceOfIncome");
                  }}
                  error={Boolean(
                    (errors.sourceOfIncome && touched.sourceOfIncome) ||
                      userProfileState?.errorMessage["sourceOfIncome"]
                  )}
                  helperText={
                    errors.sourceOfIncome && touched.sourceOfIncome
                      ? errors.sourceOfIncome
                      : userProfileState.errorMessage
                      ? userProfileState.errorMessage["sourceOfIncome"]
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, ml: 3 }}>
                  Contact Information
                </Typography>
              </Grid>
              {/* Mobile No. */}
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 2, px: 3 }}>
                <MuiPhoneNumber
                  id="mobile"
                  name="mobile"
                  label="Phone Number"
                  defaultCountry={"ph"}
                  regions={["asia"]}
                  fullWidth
                  value={values.mobile || ""}
                  autoFormat={false}
                  // @ts-ignore
                  onChange={(val: string) => {
                    setFieldValue("mobile", val);
                    userProfileState.errorMessage = { mobile: "" };
                  }}
                  onFocus={handleFieldFocus}
                  onBlur={() => {
                    handleBlur("mobile");
                  }}
                  onlyCountries={["ph"]}
                  countryCodeEditable={false}
                  error={Boolean(
                    (errors.mobile && touched.mobile) ||
                      userProfileState.errorMessage["mobile"]
                  )}
                  // @ts-ignore
                  helperText={
                    errors.mobile && touched.mobile
                      ? errors.mobile
                      : userProfileState.errorMessage
                      ? userProfileState.errorMessage["mobile"]
                      : ""
                  }
                />
              </Grid>
              {/* Email */}
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 2, px: 3 }}>
                <TextField
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email || ""}
                  fullWidth
                  variant="standard"
                  error={Boolean(
                    (errors.email && touched.email) ||
                      userProfileState.errorMessage["email"]
                  )}
                  onChange={handleChange}
                  onFocus={handleFieldFocus}
                  onBlur={() => {
                    handleBlur("email");
                  }}
                  // @ts-ignore
                  helperText={
                    errors.email && touched.email
                      ? errors.email
                      : userProfileState.errorMessage
                      ? userProfileState.errorMessage["email"]
                      : ""
                  }
                />
              </Grid>
              {/* Address */}

              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, ml: 3 }}>
                  Address Information
                </Typography>
              </Grid>
              <UserProfileAddresses userProfileState={userProfileState} />

              <Grid item xs={12} sm={12} md={12} sx={{ mt: 3, px: 3 }}>
                <FormControl variant="standard" fullWidth>
                  <FormLabel sx={{ fontSize: "12px" }}>
                    Address (Optional)
                  </FormLabel>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder=""
                    maxRows={2}
                    value={values.address || ""}
                    onChange={handleChange}
                    onFocus={handleFieldFocus}
                    onBlur={() => {
                      handleBlur("address");
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, ml: 3 }}>
                  Government Infomation
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} sx={{ mt: 3, px: 3 }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Accepted Gov't ID
                  </InputLabel>
                  <Select
                    labelId="govtType"
                    id="govtType"
                    value={values.govtType || 0}
                    label=""
                    defaultValue={0}
                    onChange={(e) => {
                      setFieldValue("govtType", e.target.value);
                      setFieldValue("govtId", "");
                    }}
                    onFocus={handleFieldFocus}
                    onBlur={() => {
                      handleBlur("govtType");
                    }}
                  >
                    {govTypeSelect.map(({ code, name }, index) => (
                      <MenuItem key={index} value={code}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={12} sx={{ mt: 3, px: 3 }}>
                <TextField
                  type="text"
                  id="govtId"
                  name="govtId"
                  label="Gov't ID"
                  autoFocus
                  value={values?.govtId || ""}
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onFocus={handleFieldFocus}
                  onBlur={() => {
                    handleBlur("govtId");
                  }}
                  error={Boolean(
                    (errors.govtId && touched.govtId) ||
                      userProfileState?.errorMessage["govtId"]
                  )}
                  helperText={
                    errors.govtId && touched.govtId
                      ? errors.govtId
                      : userProfileState.errorMessage
                      ? userProfileState.errorMessage["govtId"]
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} sx={{ mt: 3, px: 3, mb: 3 }}>
                <Grid container direction="row">
                  <Grid item xs={12} sm={4} md={4} sx={{ mr: 3 }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                      Camera Upload
                    </Typography>
                    <CameraUpload
                      closeSelfie={() => {
                        onIsTakingSelfie(false);
                      }}
                      isTakingSelfie={isTakingSelfie}
                      uploadTheSelfie={uploadTheSelfie}
                      values={values}
                      authInfo={authInfo}
                      setImageGovtPicture={setImageGovtPicture}
                      imageGovtPicture={imageGovtPicture}
                    />
                    {!isTakingSelfie && (
                      <Grid item xs={12} sm={12} md={12} sx={{ mt: 1, mb: 3 }}>
                        <Button
                          variant="contained"
                          disabled={userProfileState.loading}
                          onClick={() => {
                            onIsTakingSelfie(true);
                            handleFieldFocus();
                          }}
                        >
                          {authInfo.govtPicture
                            ? "Change Selfie with Government ID"
                            : "Take a photo"}
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                      File Upload
                    </Typography>
                    <FileUpload
                      authInfo={authInfo}
                      imageGovtIdPic={imageGovtIdPic}
                      setImageGovtIdPic={setImageGovtIdPic}
                      editorGovtIdPic={editorGovtIdPic}
                      setEditorGovtIdPic={setEditorGovtIdPic}
                      uploadGovtIdPic={uploadGovtIdPic}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {isFieldEditing && (
                <Grid item xs={12} sm={12} md={12} sx={{ mt: 5, mb: 3, px: 3 }}>
                  <Button
                    variant="contained"
                    disabled={userProfileState.loading}
                    onClick={(e: any) => {
                      const { birthdate, gender, ...rest } = values;
                      values = {
                        gender: parseInt(gender),
                        birthdate,
                        ...rest,
                      };
                      e.preventDefault();
                      // const castValues = UserProfileSchema.cast(values);
                      // setValues(castValues);

                      setError(isValid);
                      handleSubmit(e);
                    }}
                  >
                    {userProfileState.loading ? "Updating..." : "Update"}
                  </Button>
                </Grid>
              )}
            </Box>
          </Grid>
        );
      }}
    </Formik>
  );
};
