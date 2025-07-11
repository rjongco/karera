import { Formik } from "formik";
import { OTPSchema } from "../../../utils/schema";
import {
  Box,
  Grid,
  styled,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material";

import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";

const MuiOtpInputStyled = styled(MuiOtpInput)(() => ({
  display: "flex",
  maxWidth: "650px",
  marginInline: "auto",
  gap: "10px",
  "& input": {
    height: "35px",
    padding: "3px 5px",
    fontWeight: 600,
    backgroundColor: "#E9E9E9",
  },
}));

/*     background:
      "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)", for sign up */

const VerifiedButtonStyled = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
}));

const ResendOTPButtonStyled = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
}));

export const OTPForm = (props: any) => {
  const { innerRef, values, handleSubmit, authState, handleResend } = props;
  const [error, setError] = useState(false);

  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        ...values,
      }}
      validationSchema={OTPSchema}
      onSubmit={(values, actions) => {
        if (error) {
          actions.resetForm();
        }

        handleSubmit(values);
      }}
    >
      {({
        values,
        handleSubmit,
        isValid,
        errors,
        touched,
        setFieldValue,
        handleBlur,
        setValues,
      }) => {
        return (
          <Box component="form" noValidate>
            <Grid container direction="column" sx={{ my: 3 }}>
              <Grid item>
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
                <FormHelperText sx={{ color: "red", mt: 1, mb: 1 }}>
                  {errors.otp && touched.otp
                    ? errors.otp
                    : authState.errorMessage
                    ? authState.errorMessage
                    : ""}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ mt: 2 }}>
                <VerifiedButtonStyled
                  variant="contained"
                  fullWidth
                  sx={{ py: "10px" }}
                  onClick={(e: any) => {
                    e.preventDefault();
                    const castValues = OTPSchema.cast(values);

                    setValues(castValues);
                    setError(isValid);
                    handleSubmit(e);
                  }}
                >
                  <Typography fontSize={14}>
                    {authState?.verifyOTP ? "Verifying..." : `Verify`}
                  </Typography>
                </VerifiedButtonStyled>
              </Grid>
              <Grid item sx={{ mt: 2 }}>
                <ResendOTPButtonStyled
                  variant="contained"
                  fullWidth
                  sx={{ py: "10px" }}
                  onClick={(e: any) => handleResend(e)}
                >
                  <Typography fontSize={14}>
                    {authState?.resendOTP ? "Resending..." : "Resend OTP"}
                  </Typography>
                </ResendOTPButtonStyled>
              </Grid>
            </Grid>
          </Box>
        );
      }}
    </Formik>
  );
};
