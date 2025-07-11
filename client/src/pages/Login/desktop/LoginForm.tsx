import { useState } from "react";
import { Formik } from "formik";
import { AuthSchema } from "../../../utils/schema";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
  Alert,
  Grid,
} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { styled } from "@mui/material/styles";

type ILoginFormProps = {
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

const LoginButton = styled(Button)(() => ({
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

export const LoginForm: React.FunctionComponent<ILoginFormProps> = ({
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
      validationSchema={AuthSchema}
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
        setValues,
      }) => {
        if (validateRef) validateRef.current = validateForm;
        if (setTouchedRef) setTouchedRef.current = setTouched;

        return (
          <>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <MuiPhoneNumber
                    id="mobile"
                    name="mobile"
                    label="Phone Number"
                    defaultCountry={"ph"}
                    regions={["asia"]}
                    fullWidth
                    value={values.mobile || ""}
                    autoFormat={false}
                    autoComplete="off"
                    disableDropdown
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
                    sx={{
                      width: "100%",
                      fontSize: {
                        xs: "14px", // Extra small devices (phones)
                        sm: "16px", // Small devices (tablets)
                        md: "18px", // Medium devices (desktops)
                        lg: "20px", // Large devices (large desktops)
                      },
                    }}
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
            <LoginButton
              id="login"
              type="submit"
              disabled={!aggrement}
              fullWidth
              variant="contained"
              size="large"
              onClick={(e: any) => {
                if (aggrement) {
                  e.preventDefault();
                  const castValues = AuthSchema.cast(values);

                  setValues(castValues);
                  setError(isValid);
                  handleSubmit(e);
                }
              }}
            >
              <Typography fontSize={14}>
                {isLoading ? "Logging In..." : `Login`}
              </Typography>
            </LoginButton>
          </>
        );
      }}
    </Formik>
  );
};
