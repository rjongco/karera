import { Box, Grid, TextField, styled, Button } from "@mui/material";
import { Formik } from "formik";
import { CreditAdminSchema } from "../../../utils/schema";
import { useState } from "react";

const ButtonStyled = styled(Button)(() => ({}));

export const CreditForm = (props: any) => {
  //  @ts-ignore
  const {
    values,
    userInfo,
    innerRef,
    handleSubmit,
    validateRef,
    setTouchedRef,
    userManagementState,
  } = props;
  const [error, setError] = useState(false);

  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        ...values,
      }}
      validationSchema={CreditAdminSchema}
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
        handleChange,
        setValues,
      }) => {
        if (validateRef) validateRef.current = validateForm;
        if (setTouchedRef) setTouchedRef.current = setTouched;

        return (
          <>
            <Box component="form" noValidate sx={{ width: "100%", mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    type="text"
                    id="credit"
                    name="credit"
                    label="Credit"
                    value={values.credit || 0}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      (errors.credit && touched.credit) ||
                        userManagementState.errorMessage["credit"]
                    )}
                    helperText={
                      errors.credit && touched.credit
                        ? errors.credit
                        : userManagementState.errorMessage
                        ? userManagementState.errorMessage["credit"]
                        : ""
                    }
                  />
                </Grid>
              </Grid>
            </Box>
            <Grid sx={{ width: "100%", mt: 5 }}>
              <Grid container justifyContent="flex-end">
                <ButtonStyled
                  variant="contained"
                  onClick={(e: any) => {
                    e.preventDefault();
                    // const castValues = CreditAdminSchema.cast(values);
                    // setValues(castValues);
                    setError(isValid);
                    handleSubmit(e);
                  }}
                >
                  Submit
                </ButtonStyled>
              </Grid>
            </Grid>
          </>
        );
      }}
    </Formik>
  );
};
