import {
  Grid,
  IconButton,
  Typography,
  styled,
  Button,
  Box,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { KYCPage5PersonalInfo } from "./PersonalInfo";
import { KYCSchema } from "../../../../utils/schema";
import { Formik } from "formik";
import { KYCPage5AddressPermanentInfo } from "./AddressPermanentInfo";
import { KYCPage5AddressCurrentInfo } from "./AddressCurrentInfo";
import { useState } from "react";
import kycTopRightId from "../../../../assets/images/kyc-top-right-id.png";

const NextButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 1%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
}));

export const KYCPage5 = (props: any) => {
  const {
    onPrevStep,
    innerRef,
    values,
    validateRef,
    setTouchedRef,
    userProfileState,
    handleSubmit,
  } = props;

  const [error, setError] = useState(false);

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2, px: 3 }}
        >
          <Grid item sx={{ ml: -2 }}>
            <IconButton onClick={onPrevStep}>
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography>Confirm Personal Information</Typography>
          </Grid>
          <Grid item>
            <Box
              component="img"
              alt="KYC Top Right ID"
              src={kycTopRightId}
              height={20}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignContent="center">
          <Grid
            item
            sx={{ pb: 1, borderBottom: "2px solid #C4C4C4", width: "95%" }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Formik
          enableReinitialize
          innerRef={innerRef}
          initialValues={{
            ...values,
          }}
          validationSchema={KYCSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values);
          }}
        >
          {({
            setTouched,
            validateForm,
            isValid,
            handleSubmit,
            setFieldValue,
            handleBlur,
            errors,
            values,
            touched,
          }) => {
            if (validateRef) validateRef.current = validateForm;
            if (setTouchedRef) setTouchedRef.current = setTouched;
            return (
              <Grid container direction="column" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" sx={{ mt: 2, px: 4 }}>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        sx={{ px: 5, mt: 2 }}
                      >
                        <Grid
                          item
                          sx={{
                            width: "22%",
                            p: "3px",
                            backgroundColor: "#2196F3",
                            borderRadius: "35px",
                          }}
                        />
                        <Grid
                          item
                          sx={{
                            width: "22%",
                            p: "3px",
                            backgroundColor: "#2196F3",
                            borderRadius: "35px",
                          }}
                        />
                        <Grid
                          item
                          sx={{
                            width: "22%",
                            p: "3px",
                            backgroundColor: "#2196F3",
                            borderRadius: "35px",
                          }}
                        />
                        <Grid
                          item
                          sx={{
                            width: "22%",
                            p: "3px",
                            backgroundColor: "#C4C4C4",
                            borderRadius: "35px",
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid item sx={{ px: 0, mt: 1 }}>
                      <>
                        <KYCPage5PersonalInfo
                          setFieldValue={setFieldValue}
                          values={values}
                          handleBlur={handleBlur}
                          errors={errors}
                          userProfileState={userProfileState}
                          touched={touched}
                        />
                        <KYCPage5AddressPermanentInfo
                          userProfileState={userProfileState}
                        />
                        <KYCPage5AddressCurrentInfo
                          userProfileState={userProfileState}
                        />
                      </>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item px={4} mt={8} mb={2}>
                  <NextButton
                    variant="contained"
                    fullWidth
                    sx={{ py: "10px" }}
                    onClick={(e) => {
                      const { gender, ...rest } = values;
                      values["gender"] = parseInt(gender);
                      // const castValues = UserProfileSchema.cast(values);
                      // setValues(castValues);

                      setError(isValid);
                      handleSubmit(values);
                    }}
                  >
                    <Typography fontSize={14}>Confirm</Typography>
                  </NextButton>
                </Grid>
              </Grid>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};
