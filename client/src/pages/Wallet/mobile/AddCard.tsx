import {
  Grid,
  IconButton,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import rightArrowIcon from "../../../assets/images/right-arrow-white.png";
import transactionIcon from "../../../assets/images/transaction-icon.png";
import { AddPaymentCardFormSchema } from "../../../utils/schema";
import { Formik } from "formik";

export const AddCard = (props: any) => {
  const {
    innerRef,
    validateRef,
    setTouchedRef,
    values,
    handleSubmit,
    setIsAddCard,
    walletState,
  } = props;
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      sx={{ height: "100vh" }}
    >
      <Grid item>
        <Grid
          container
          direction="column"
          sx={{ backgroundColor: "#00a24a", zIndex: 10 }}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ pt: 1, py: 1 }}
            >
              <Grid item>
                <IconButton onClick={() => setIsAddCard(false)}>
                  <Box
                    component="img"
                    alt="Right Arrow"
                    src={rightArrowIcon}
                    height={15}
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography fontFamily="Baloo" fontSize={16} color="#FFFFFF">
                  Add a GCASH Account
                </Typography>
              </Grid>
              <Grid item pr={1}>
                <IconButton onClick={() => navigate("/game/transactions")}>
                  <Box
                    component="img"
                    alt="KYC Top Right ID"
                    src={transactionIcon}
                    height={20}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs sx={{ position: "relative" }}>
        <Formik
          enableReinitialize
          innerRef={innerRef}
          initialValues={{
            ...values,
          }}
          validationSchema={AddPaymentCardFormSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values);
          }}
        >
          {({
            setTouched,
            validateForm,
            handleSubmit,
            setFieldValue,
            handleChange,
            handleBlur,
            touched,
            errors,
            isValid,
            values,
          }) => {
            if (validateRef) validateRef.current = validateForm;
            if (setTouchedRef) setTouchedRef.current = setTouched;

            const haveMobile = values.mobile !== "";

            return (
              <Grid container direction="column" px={2} py={3} pb={2}>
                <Grid item>
                  <Grid container direction="column">
                    <Grid item pl="5px" pb="5px">
                      <Typography fontSize={14}>Bank</Typography>
                    </Grid>
                    <Grid item>
                      <Box
                        component="section"
                        sx={{
                          backgroundColor: "#C4C4C4",
                          borderRadius: "15px",
                        }}
                        px={2}
                        py={1}
                      >
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Grid item>
                            <Typography
                              fontFamily="Baloo"
                              fontSize={14}
                              color="#FFFFFF"
                            >
                              GCASH
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Box
                              onClick={() => {
                                setFieldValue("paymentType", "GCASH");
                              }}
                              width={50}
                              height={30}
                              sx={{
                                background: `url('../assets/images/gcash-box-bg.png')`,
                                backgroundSize: "100% 100%",
                                borderRadius: "5px",
                                backgroundPosition: "center center", // Position the background image at the center horizontally and at the bottom vertically
                                backgroundRepeat: "no-repeat", // Prevent the background image from repeating
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item mt={3}>
                  <Grid container direction="column">
                    <Grid item pl="5px" pb="5px">
                      <Typography fontFamily="Baloo" fontSize={14}>
                        Account Number
                      </Typography>
                    </Grid>
                    <Grid item>
                      <FormControl variant="standard" fullWidth>
                        <TextField
                          fullWidth
                          placeholder="Add a GCash Account"
                          variant="outlined"
                          size="small"
                          name="mobile"
                          value={values.mobile || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          // @ts-ignore
                          error={
                            (errors.mobile && touched.mobile) ||
                            walletState?.error
                          }
                          helperText={
                            errors?.mobile && touched?.mobile
                              ? errors?.mobile
                              : walletState?.errorMessage
                              ? walletState?.errorMessage
                              : ""
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item mt={3}>
                  <Button
                    variant="contained"
                    disabled={!haveMobile}
                    fullWidth
                    sx={{
                      py: 1,
                      background: haveMobile
                        ? `linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)`
                        : `#D9D9D9`,
                      borderRadius: "35px",
                      boxShadow: "none",
                      "&:active": {
                        background: haveMobile
                          ? `linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)`
                          : `#D9D9D9`,
                      },
                      "&:hover": {
                        background: haveMobile
                          ? `linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)`
                          : `#D9D9D9`,
                      },
                    }}
                    onClick={(e: any) => {
                      e.preventDefault();
                      handleSubmit(e);
                    }}
                  >
                    <Typography
                      fontFamily="Baloo"
                      color="#FFFFFF"
                      fontSize={20}
                    >
                      Add this Account
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};
