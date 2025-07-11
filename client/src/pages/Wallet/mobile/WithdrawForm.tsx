import {
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  Box,
  Button,
  TextField,
  InputAdornment,
  Autocomplete,
  CircularProgress,
  IconButton
} from "@mui/material";
import { Formik } from "formik";
import { WithdrawFormSchema } from "../../../utils/schema";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";


const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-popupIndicator": {
    display: "none",
    position: "absolute",
    zIndex: -1,
  },
  "& .MuiAutocomplete-endAdornment": {
    display: "none",
    position: "absolute",
    zIndex: -1,
  },
});


export const WithdrawForm = (props: any) => {
  const {
    innerRef,
    validateRef,
    setTouchedRef,
    values,
    paymentCards,
    handleSubmit,
    passKYC,
  } = props;
  const [registeredMobile, setRegisteredMobile] = useState("");
  const [openAccountNumber, setOpenAccountNumber] = useState(false);
  const [optionAccountNumber, setOptionAccountNumber] = useState([]);

  const loadingAccountNumber =
    openAccountNumber && optionAccountNumber.length === 0;

    
  const sleep = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };


  useEffect(() => {
    let activeAccountNumber = true;
    if (!loadingAccountNumber) {
      return undefined;
    }
    (async () => {
      await sleep(1000);
      if (activeAccountNumber) {
        // @ts-ignore
        setOptionAccountNumber([...paymentCards]);
      }
    })();
    return () => {
      activeAccountNumber = false;
    };
  }, [loadingAccountNumber]);

  const renderRegisteredNumber = () => {
    return (
      <Grid item pt={1}>
        <Button
          fullWidth
          sx={{
            borderRadius: "10px",
            backgroundColor: "#999999",
            "&:hover": {
              backgroundColor: "#999999",
            },
            py: 2,
          }}
          onClick={() => {}}
        >
          <Grid container direction="row" justifyContent="flex-start" pl={1}>
            <Typography
              fontFamily="Baloo"
              fontSize={14}
              fontWeight={400}
              color="#FFFFFF"
            >
              0912****789
            </Typography>
          </Grid>
        </Button>
      </Grid>
    );
  };

  return (
    <Formik
      enableReinitialize
      innerRef={innerRef}
      initialValues={{
        ...values,
      }}
      validationSchema={WithdrawFormSchema}
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

        const isActive =
          values?.paymentType !== "" &&
          values?.withdrawAmount !== "" &&
          isValid;

        return (
          <Grid container direction="column">
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Grid container direction="row" py={1}>
                    <Grid item pr={2}>
                      <Box
                        onClick={() => {
                          passKYC && setFieldValue("paymentType", "GCASH");
                        }}
                        width={100}
                        height={50}
                        sx={{
                          background: `${
                            values.paymentType === "GCASH"
                              ? ""
                              : "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),"
                          } url('../assets/images/gcash-box-bg.png')`,
                          backgroundSize: "100% 100%",
                          borderRadius: "10px",
                          backgroundPosition: "center center", // Position the background image at the center horizontally and at the bottom vertically
                          backgroundRepeat: "no-repeat", // Prevent the background image from repeating
                        }}
                      />
                    </Grid>
                    <Grid item pr={2}>
                      <Box
                        onClick={() => {
                          passKYC && setFieldValue("paymentType", "PAYMAYA");
                        }}
                        width={100}
                        height={50}
                        sx={{
                          background: `${
                            values.paymentType === "PAYMAYA"
                              ? ""
                              : "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),"
                          } url('../assets/images/paymaya-box-bg.png')`,

                          backgroundSize: "100% 100%",
                          borderRadius: "10px",
                          backgroundPosition: "center center", // Position the background image at the center horizontally and at the bottom vertically
                          backgroundRepeat: "no-repeat", // Prevent the background image from repeating
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {errors?.paymentType && touched.paymentType && (
                  <Grid item>
                    <FormControl variant="outlined" error fullWidth>
                      <FormHelperText>
                        {/*  @ts-ignore */}
                        {errors?.paymentType}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                )}
                {registeredMobile && renderRegisteredNumber()}
                <Grid mt={2}>
                  <FormControl variant="standard" fullWidth>
                    <TextField
                      fullWidth
                      disabled={!passKYC}
                      placeholder="Min. Withdrawal Amount is 200 "
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₱</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      size="small"
                      name="withdrawAmount"
                      value={values.withdrawAmount || ""}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      error={Boolean(
                        errors.withdrawAmount && touched.withdrawAmount
                      )}
                      helperText={`${errors?.withdrawAmount || ""}`}
                    />
                  </FormControl>
                </Grid>

                <Grid mt={2}>
                    <FormControl variant="standard" fullWidth>
                      <StyledAutocomplete
                        id="accountNumber"
                        disabled={values.depositAmount === ""}
                        open={openAccountNumber}
                        onOpen={() => {
                          setOpenAccountNumber(true);
                        }}
                        onClose={() => {
                          setOpenAccountNumber(false);
                        }}
                        value={values.accountNumber || null}
                        options={optionAccountNumber}
                        fullWidth
                        onChange={(_, val) => {
                          setFieldValue("accountNumber", val);
                        }}
                        //  @ts-ignore
                        getOptionLabel={(option) => option?.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size="small"
                            label="Account Number"
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {loadingAccountNumber ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

              </Grid>
              <Grid
                mb={2}
                sx={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 30,
                }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  sx={{ px: 2 }}
                >
                  <Button
                    variant="contained"
                    disabled={!isActive}
                    fullWidth
                    sx={{
                      py: 1,
                      background: isActive
                        ? `linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)`
                        : `#D9D9D9`,
                      borderRadius: "35px",
                      boxShadow: "none",
                      "&:active": {
                        background: isActive
                          ? `linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)`
                          : `#D9D9D9`,
                      },
                      "&:hover": {
                        background: isActive
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
                      Withdraw
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      }}
    </Formik>
  );
};
