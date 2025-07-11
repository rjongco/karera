import { Formik } from "formik";
import { AuthSchema } from "../../../utils/schema";
import { Box, Grid, styled, Button, Typography, Alert } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { useState } from "react";

const ButtonStyled = styled(Button)(() => ({
  background: `linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)`,
  borderRadius: "35px",
  boxShadow: "none",
}));

export const VerifyForm = (props: any) => {
  const { innerRef, values, handleSubmit, authState } = props;
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
        setFieldValue,
        handleBlur,
      }) => {
        return (
          <Box component="form" noValidate>
            <Grid container direction="column" sx={{ my: 2 }}>
              <Grid item>
                <MuiPhoneNumber
                  id="mobile"
                  name="mobile"
                  label="Mobile Number"
                  defaultCountry={"ph"}
                  regions={["asia"]}
                  fullWidth
                  sx={{ width: "100%" }}
                  variant="outlined"
                  size="medium"
                  disableDropdown
                  value={values.mobile || ""}
                  autoFormat={false}
                  // @ts-ignore
                  onChange={(val: string) => {
                    setFieldValue("mobile", val);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                  }}
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
              <Grid item>
                {authState?.error && (
                  <Alert severity="error" icon={false} sx={{ mt: 1 }}>
                    {authState?.errorMessage || ""}
                  </Alert>
                )}
              </Grid>

              <Grid item sx={{ mt: 2 }}>
                <ButtonStyled
                  variant="contained"
                  fullWidth
                  sx={{ py: 1 }}
                  onClick={(e: any) => {
                    e.preventDefault();
                    setError(isValid);
                    handleSubmit(e);
                  }}
                >
                  <Typography fontSize={20}>Verify</Typography>
                </ButtonStyled>
              </Grid>
            </Grid>
          </Box>
        );
      }}
    </Formik>
  );
};
