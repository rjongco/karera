import { useState } from "react";
import { Formik } from "formik";
import { OTPSchema } from "../utils/schema";
import { Box, Button, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { styled } from "@mui/material/styles";
import { MuiOtpInput } from "mui-one-time-password-input";

type IOTPFormProps = {
  innerRef?: any;
  validateRef?: any;
  setTouchedRef?: any;
  isLoading?: any;
  values?: any;
  handleSubmit?: any;
  authState?: any;
  handleResend?: any;
};

const NextButton = styled(Button)(() => ({
  marginTop: 35,
  background:
    "rgb(237,51,80); linear-gradient(90deg, rgba(237,51,80,1) 0%, rgba(121,9,21,1) 100%, rgba(255,0,39,1) 100%)",
  color: "#fff",
  ":hover": {
    background: "red",
    color: "#fff",
  },
}));

const ResendButton = styled(Button)(() => ({
  marginTop: 10,
  background: "blue",
  color: "#fff",
  ":hover": {
    background: "blue",
    color: "#fff",
  },
}));

const MuiOtpInputStyled = styled(MuiOtpInput)(({ theme }) => ({
  display: "flex",
  maxWidth: "650px",
  marginInline: "auto",

  "& input": {
    height: "35px",
    padding: "5px 5px",
    fontWeight: 600,
    backgroundColor: "#E9E9E9",
  },
}));

export const OTPForm: React.FunctionComponent<IOTPFormProps> = ({
  innerRef,
  validateRef,
  setTouchedRef,
  values,
  handleSubmit,
  handleResend,
  authState,
}) => {
  const [error, setError] = useState(false);
  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        ...values,
      }}
      validationSchema={OTPSchema}
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
                <Grid xs={12} sm={12} md={12}>
                  <MuiOtpInputStyled
                    id="otp"
                    autoFocus
                    // @ts-ignore
                    validateChar={(val) => !isNaN(val)}
                    // @ts-ignore
                    name="otp"
                    value={values.otp}
                    length={6}
                    sx={{ width: "100%" }}
                    onChange={(val: string) => {
                      setFieldValue("otp", val);
                    }}
                    onBlur={handleBlur}
                    TextFieldsProps={{
                      type: "tel",
                      inputProps: {
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      },
                    }}
                  />
                  <FormHelperText sx={{ mt: 1, color: "red" }}>
                    {errors.otp && touched.otp
                      ? errors.otp
                      : authState.errorMessage
                      ? authState.errorMessage
                      : ""}
                  </FormHelperText>
                </Grid>
              </Grid>
            </Box>
            <NextButton
              id="verifyButton"
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              onClick={(e: any) => {
                e.preventDefault();
                // const castValues = OTPSchema.cast(values);
                // setValues(castValues);
                setError(isValid);
                handleSubmit(e);
              }}
            >
              {authState.verifyOTP ? "Verifying..." : `Verify`}
            </NextButton>
            {
              <ResendButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                // @ts-ignore
                onClick={(e: any) => handleResend(e)}
              >
                {" "}
                {authState.resendOTP ? "Resending..." : `Resend OTP`}
              </ResendButton>
            }
          </>
        );
      }}
    </Formik>
  );
};
