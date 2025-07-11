import {
  Box,
  Grid,
  IconButton,
  Typography,
  styled,
  Button,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  TextField,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import kycID1 from "../../../assets/images/kyc-id-1.png";
import { useState } from "react";
import { govTypeSelect } from "../../../constants";
import kycTopRightId from "../../../assets/images/kyc-top-right-id.png";
import { Formik } from "formik";
import { UserProfileSchemaMobile } from "../../../utils/schema";

const NextButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 1%, hsla(142, 100%, 28%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
}));

export const KYCPage2 = (props: any) => {
  const {
    onNextStep,
    onPrevStep,
    values,
    innerRef,
    handleSubmit,
    userProfileState,
  } = props;

  const [errors, setError] = useState(false);

  const { govtType, ...rest } = values;
  const newValue = {
    govTypeMobile: govtType,
  };

  return (
    <Grid container direction="column" justifyContent="space-between">
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
            <Typography>Select Type of Document</Typography>
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
      <Grid item xs>
        <Formik
          enableReinitialize
          innerRef={innerRef}
          initialValues={{
            ...newValue,
          }}
          validationSchema={UserProfileSchemaMobile}
          onSubmit={(values, actions) => {
            handleSubmit(values);
          }}
        >
          {({
            handleSubmit,
            setFieldValue,
            handleBlur,
            handleChange,
            touched,
            errors,
            isValid,
            setValues,
            values,
          }) => {
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
                            backgroundColor: "#C4C4C4",
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
                    <Grid item sx={{ mt: 4 }}>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        sx={{ px: 5, mt: 2 }}
                      >
                        <Box
                          component="img"
                          alt="KYC ID"
                          src={kycID1}
                          height={80}
                          width={80}
                        />
                      </Grid>
                    </Grid>
                    <Grid item sx={{ px: 3, mt: 1 }}>
                      <Typography
                        fontSize={15}
                        fontWeight={400}
                        textAlign="center"
                      >
                        Select the type of valid document below to verify your
                        identity
                      </Typography>
                    </Grid>
                    <Grid item sx={{ px: 1, mt: 4 }}>
                      <Typography fontSize={14} fontWeight={600}>
                        Type of Document
                      </Typography>
                    </Grid>
                    <Grid item sx={{ px: 1, mt: 2 }}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors.govTypeMobile)}
                      >
                        <Select
                          autoFocus
                          id="govTypeMobile"
                          name="govTypeMobile"
                          value={values.govTypeMobile}
                          variant="outlined"
                          onChange={(e: any) => {
                            setFieldValue("govTypeMobile", e.target.value);
                          }}
                          onBlur={handleBlur}
                          error={Boolean(errors.govTypeMobile)}
                        >
                          {govTypeSelect.map((obj, index) => {
                            const { code, name } = obj;
                            return (
                              <MenuItem key={index} value={code}>
                                {name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <FormHelperText>
                          {/* @ts-ignore */}
                          {errors.govTypeMobile && errors.govTypeMobile}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    mb: 2,
                    px: 2,
                    width: "100%",
                  }}
                >
                  <NextButton
                    variant="contained"
                    fullWidth
                    sx={{ py: "10px" }}
                    onClick={(e: any) => {
                      if (isValid) {
                        handleSubmit(e);
                      }
                    }}
                  >
                    <Typography fontSize={14}>Next</Typography>
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
