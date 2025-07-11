import { useState } from "react";
import { Formik } from "formik";
import { AuthSchemaRegister } from "../../../utils/schema";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
  TextField,
  Grid,
  FormControl,
  Alert,
} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { returnMommentDate } from "../../../utils/logic";
import dayjs from "dayjs";

type IRegisterFormProps = {
  innerRef?: any;
  validateRef?: any;
  setTouchedRef?: any;
  isLoading?: any;
  values?: any;
  handleSubmit?: any;
  authState?: any;
  onTermsAndConditions: any;
  onPrivacyPolicy: any;
};

const NextButton = styled(Button)(() => ({
  marginTop: 35,
  background:
    "rgb(237,51,80); linear-gradient(90deg, rgba(237,51,80,1) 0%, rgba(121,9,21,1) 100%, rgba(255,0,39,1) 100%)",
  color: "#fff",
  ":hover": {
    background:
      "rgb(255,80,80); linear-gradient(90deg, rgba(255,80,80,1) 0%, rgba(249,40,40,1) 0%, rgba(121,9,9,1) 100%)",
    color: "#fff",
  },
}));

export const RegisterForm: React.FunctionComponent<IRegisterFormProps> = ({
  innerRef,
  validateRef,
  setTouchedRef,
  isLoading,
  values,
  handleSubmit,
  authState,
  onTermsAndConditions,
  onPrivacyPolicy,
}) => {
  const [error, setError] = useState(false);
  const [aggrement, setAggrement] = useState(false);

  const handleAggrement = (event: any) => {
    setAggrement(event.target.checked);
  };

  const handleTermsAndConditions = (e: any) => {
    e.preventDefault();
    onTermsAndConditions();
  };

  const handlePrivacyPolicy = (e: any) => {
    e.preventDefault();
    onPrivacyPolicy();
  };

  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        ...values,
      }}
      validationSchema={AuthSchemaRegister}
      onSubmit={(values, actions) => {
        handleSubmit(values);

        if (!error) {
          actions.resetForm();
        }
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
      }) => {
        if (validateRef) validateRef.current = validateForm;
        if (setTouchedRef) setTouchedRef.current = setTouched;

        return (
          <>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    type="text"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={values.firstName || ""}
                    fullWidth
                    size="small"
                    variant="outlined"
                    inputProps={{
                      style: { textTransform: "capitalize" },
                    }}
                    // @ts-ignore
                    onChange={(e: any) => {
                      const uppercaseValue = e.target.value.toUpperCase(); // Convert to uppercase
                      setFieldValue("firstName", uppercaseValue);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(
                      (errors.firstName && touched.firstName) ||
                        authState?.errorMessage["firstName"]
                    )}
                    helperText={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : authState?.errorMessage
                        ? authState?.errorMessage["firstName"]
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    type="text"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    size="small"
                    inputProps={{
                      style: { textTransform: "capitalize" },
                    }}
                    value={values.lastName || ""}
                    fullWidth
                    variant="outlined"
                    error={Boolean(
                      (errors.lastName && touched.lastName) ||
                        authState?.errorMessage["lastName"]
                    )}
                    // @ts-ignore
                    onChange={(e: any) => {
                      const uppercaseValue = e.target.value.toUpperCase(); // Convert to uppercase
                      setFieldValue("lastName", uppercaseValue);
                    }}
                    onBlur={handleBlur}
                    // @ts-ignore
                    helperText={
                      errors.lastName && touched.lastName
                        ? errors.lastName
                        : authState?.errorMessage
                        ? authState?.errorMessage["lastName"]
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FormControl fullWidth>
                    <DatePicker
                      label="Birthdate"
                      value={dayjs(new Date(values.birthdate)) || null}
                      // defaultValue={dayjs(new Date(values.birthdate))}
                      // @ts-ignore
                      id="birthdate"
                      name="birthdate"
                      format="YYYY-MM-DD"
                      onChange={(date) => {
                        setFieldValue(
                          "birthdate",
                          dayjs(date).format("YYYY-MM-DD")
                        );
                      }}
                      onBlur={() => {
                        handleBlur("birthdate");
                      }}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          size: "small",
                          error: Boolean(errors.birthdate && touched.birthdate),
                          helperText:
                            errors.birthdate && touched.birthdate
                              ? errors.birthdate
                              : authState?.errorMessage
                              ? authState?.errorMessage["birthdate"]
                              : "",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <MuiPhoneNumber
                    id="mobile"
                    name="mobile"
                    label="Phone Number"
                    defaultCountry={"ph"}
                    regions={["asia"]}
                    fullWidth
                    sx={{ width: "100%" }}
                    variant="outlined"
                    size="small"
                    disableDropdown
                    TextFieldsProps={{
                      size: "small",
                    }}
                    value={values.mobile}
                    autoFormat={false}
                    // @ts-ignore
                    onChange={(val: string) => {
                      setFieldValue("mobile", val);
                    }}
                    onBlur={handleBlur}
                    onlyCountries={["ph"]}
                    countryCodeEditable={false}
                    error={Boolean(
                      (errors.mobile && touched.mobile) ||
                        authState.errorMessage["mobile"]
                    )}
                    // @ts-ignore
                    helperText={
                      errors.mobile && touched.mobile
                        ? errors.mobile
                        : authState.errorMessage
                        ? authState.errorMessage["mobile"]
                        : ""
                    }
                  />
                </Grid>
                {authState?.error && (
                  <Grid item xs={12}>
                    <Alert
                      severity="error"
                      icon={false}
                      sx={{ mt: "5px", mb: 1 }}
                    >
                      {authState?.errorMessage}
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        onChange={handleAggrement}
                        sx={{ marginTop: -2 }}
                      />
                    }
                    sx={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    label={
                      <Typography fontSize={12}>
                        I confirm that I am 21 years old and I aggree to the{" "}
                        <Link
                          component="button"
                          tabIndex={0}
                          onClick={handleTermsAndConditions}
                        >
                          Terms and Conditions
                        </Link>{" "}
                        and {` `}
                        <Link
                          component="button"
                          tabIndex={0}
                          onClick={handlePrivacyPolicy}
                        >
                          Privacy Policy
                        </Link>
                        .
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
            </Box>
            <NextButton
              type="submit"
              disabled={!aggrement}
              fullWidth
              variant="contained"
              size="large"
              onClick={(e: any) => {
                if (aggrement) {
                  e.preventDefault();
                  // const castValues = AuthSchemaRegister.cast(values);

                  // setValues(castValues);
                  setError(isValid);
                  handleSubmit(e);
                }
              }}
            >
              <Typography fontSize={14}>
                {isLoading ? "Loading..." : `Next`}
              </Typography>
            </NextButton>
          </>
        );
      }}
    </Formik>
  );
};
