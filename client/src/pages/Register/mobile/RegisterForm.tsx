import { Formik } from "formik";
import { AuthSchemaRegister } from "../../../utils/schema";
import {
  Box,
  Grid,
  styled,
  Button,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  Alert,
} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { returnMommentDate } from "../../../utils/logic";

const ButtonStyled = styled(Button)(({ isActive }: { isActive: any }) => ({
  background: isActive
    ? `linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)`
    : `#D9D9D9`,
  boxShadow: "none",
}));

export const RegistrationForm = (props: any) => {
  const { innerRef, values, handleSubmit, authState, aggrement } = props;
  const [error, setError] = useState(false);

  const isValidDate = (date: any) => {
    // Check if the date is a valid Date object and is not NaN
    // @ts-ignore
    return date instanceof Date && !isNaN(date);
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
        setFieldValue,
        handleBlur,
        setValues,
      }) => {
        return (
          <Box component="form" noValidate>
            <Grid container direction="column" sx={{ my: 3 }}>
              <Grid item>
                <TextField
                  type="text"
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  autoComplete="off"
                  value={values.firstName || ""}
                  fullWidth
                  size="small"
                  variant="outlined"
                  // @ts-ignore
                  onChange={(e: any) => {
                    const uppercaseValue = e.target.value.toUpperCase(); // Convert to uppercase
                    setFieldValue("firstName", uppercaseValue);
                  }}
                  onBlur={handleBlur}
                  error={Boolean(
                    (errors.firstName && touched.firstName) ||
                      authState.errorMessage["firstName"]
                  )}
                  helperText={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : authState.errorMessage
                      ? authState.errorMessage["firstName"]
                      : ""
                  }
                />
              </Grid>

              <Grid item sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  size="small"
                  autoComplete="off"
                  value={values.lastName || ""}
                  fullWidth
                  variant="outlined"
                  error={Boolean(
                    (errors.lastName && touched.lastName) ||
                      authState.errorMessage["lastName"]
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
                      : authState.errorMessage
                      ? authState.errorMessage["lastName"]
                      : ""
                  }
                />
              </Grid>

              <Grid item sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <DatePicker
                    label="Birthdate"
                    value={dayjs(new Date(values.birthdate)) || null}
                    // defaultValue={dayjs(new Date(values.birthdate))}
                    // @ts-ignore
                    id="birthdate"
                    name="birthdate"
                    format="YYYY-MM-DD"
                    inputProps={{ type: "date" }}
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

              <Grid item sx={{ mt: 2 }}>
                <MuiPhoneNumber
                  id="mobile"
                  name="mobile"
                  label="Mobile Number"
                  defaultCountry={"ph"}
                  regions={["asia"]}
                  size="small"
                  fullWidth
                  autoComplete="off"
                  sx={{ width: "100%" }}
                  variant="outlined"
                  disableDropdown
                  value={values.mobile}
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

              {authState?.error && (
                <Grid item>
                  <Alert severity="error" icon={false} sx={{ mt: 1 }}>
                    {authState?.errorMessage}
                  </Alert>
                </Grid>
              )}

              <Grid item sx={{ mt: 2 }}>
                <ButtonStyled
                  variant="contained"
                  isActive={!errors.mobile && aggrement}
                  fullWidth
                  sx={{ py: 1 }}
                  onClick={(e: any) => {
                    if (aggrement) {
                      e.preventDefault();
                      setError(isValid);
                      handleSubmit(e);
                    }
                  }}
                >
                  <Typography fontSize={14}>Sign Up</Typography>
                </ButtonStyled>
              </Grid>
            </Grid>
          </Box>
        );
      }}
    </Formik>
  );
};
