import {
  Box,
  Grid,
  TextField,
  styled,
  Button,
  InputLabel,
  Select,
  FormHelperText,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import { CreditPlayerSchema } from "../../utils/schema";
import { useState } from "react";

const ButtonStyled = styled(Button)(() => ({}));

export const CreditAddForm = (props: any) => {
  //  @ts-ignore
  const {
    values,
    userInfo,
    innerRef,
    handleSubmit,
    validateRef,
    setTouchedRef,
    transactionState,
  } = props;
  const [error, setError] = useState(false);

  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        ...values,
      }}
      validationSchema={CreditPlayerSchema}
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
                  {/* @ts-ignore */}
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Outlet Type
                    </InputLabel>
                    <Select
                      id="outletType"
                      name="outletType"
                      label="Outlet Type"
                      defaultValue=""
                      value={values.outletType || ""}
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        errors.outletType ||
                          transactionState.errorMessage["outletType"]
                      )}
                    >
                      <MenuItem key={1} value={1}>
                        e-Wallet
                      </MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.outletType && touched.outletType
                        ? errors.outletType
                        : transactionState.errorMessage
                        ? transactionState.errorMessage["outletType"]
                        : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  {/* @ts-ignore */}
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Outlet
                    </InputLabel>
                    <Select
                      id="outlet"
                      name="outlet"
                      label="Outlet"
                      defaultValue=""
                      value={values.outlet || ""}
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        errors.outlet || transactionState.errorMessage["outlet"]
                      )}
                    >
                      <MenuItem key={1} value={1}>
                        G-Cash
                      </MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.outlet && touched.outlet
                        ? errors.outlet
                        : transactionState.errorMessage
                        ? transactionState.errorMessage["outlet"]
                        : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
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
                        transactionState.errorMessage["credit"]
                    )}
                    helperText={
                      errors.credit && touched.credit
                        ? errors.credit
                        : transactionState.errorMessage
                        ? transactionState.errorMessage["credit"]
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
                    setError(isValid);
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
