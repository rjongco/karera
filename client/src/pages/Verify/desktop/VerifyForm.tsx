import { useState } from "react";
import { Formik } from "formik";
import { AuthSchema } from "../../../utils/schema";
import {
  Box,
  Button,
  Typography,
  Grid,
  FormHelperText,
  FormControl,
  Alert,
} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { styled } from "@mui/material/styles";

type IVerifyFormProps = {
  innerRef?: any;
  validateRef?: any;
  setTouchedRef?: any;
  isLoading?: any;
  values?: any;
  handleSubmit?: any;
  authState?: any;
};

const NextButton = styled(Button)(() => ({
  marginTop: 15,
  background:
    "rgb(237,51,80); linear-gradient(90deg, rgba(237,51,80,1) 0%, rgba(121,9,21,1) 100%, rgba(255,0,39,1) 100%)",
  color: "#fff",
  ":hover": {
    background:
      "rgb(255,80,80); linear-gradient(90deg, rgba(255,80,80,1) 0%, rgba(249,40,40,1) 0%, rgba(121,9,9,1) 100%)",
    color: "#fff",
  },
}));

export const VerifyForm: React.FunctionComponent<IVerifyFormProps> = ({
  innerRef,
  validateRef,
  setTouchedRef,
  isLoading,
  values,
  handleSubmit,
  authState,
}) => {
  const [error, setError] = useState(false);

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
                    sx={{ width: "100%" }}
                    variant="outlined"
                    size="small"
                    disableDropdown
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
                  <Grid item>
                    <Alert severity="error" icon={false} sx={{ mt: "2px" }}>
                      {authState?.errorMessage}
                    </Alert>
                  </Grid>
                )}
              </Grid>
            </Box>
            <NextButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              onClick={(e: any) => {
                e.preventDefault();
                setError(isValid);
                handleSubmit(e);
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
