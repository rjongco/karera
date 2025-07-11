import { Formik } from "formik";
import { DepositFormSchema } from "../../../utils/schema";
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
  FormHelperText,
  InputAdornment,
  Autocomplete,
  CircularProgress,
  IconButton,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import additionalIcon from "../../../assets/images/additions-icon.png";

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

export const DepositForm = (props: any) => {
  const {
    innerRef,
    validateRef,
    setTouchedRef,
    values,
    paymentCards,
    handleSubmit,
    onChangePaymentType,
    selectedAmount,
    setSelectedAmount,
    onAddCard,
  } = props;

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

  const toggleAmount = (amount: number) => {
    setSelectedAmount((prev: any) => {
      // If the amount is already selected, clear the state
      if (prev[amount]) {
        return {};
      }
      // Otherwise, set the new state with only the selected amount
      return { [amount]: amount };
    });
  };

  return (
    <Formik
      enableReinitialize
      innerRef={innerRef}
      initialValues={{
        ...values,
      }}
      validationSchema={DepositFormSchema}
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
          values?.paymentType !== "" && values?.depositAmount !== "" && isValid;

        return (
          <Grid container direction="column">
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography fontFamily="Baloo" fontSize={14} fontWeight={400}>
                    Payment Method
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="row" spacing={2} py={1}>
                    <Grid item xs={4}>
                      <Box
                        onClick={() => {
                          setFieldValue("paymentType", "GCASH");
                          onChangePaymentType("GCASH");
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
                    <Grid item xs={4}>
                      <Box
                        onClick={() => {
                          setFieldValue("paymentType", "PAYMAYA");
                          onChangePaymentType("GCASH");
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
              </Grid>
            </Grid>
            <Grid item sx={{ mt: 1 }}>
              {values.paymentType !== "" && (
                <Grid container direction="column">
                  <Grid item>
                    <Typography
                      fontFamily="Baloo"
                      fontSize={14}
                      fontWeight={400}
                    >
                      Deposit Amount
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      py={1}
                      spacing={2}
                    >
                      {/* 100 PESOS */}
                      <Grid item xs={4}>
                        <Button
                          variant="text"
                          fullWidth
                          sx={{
                            borderRadius: "10px",
                            py: 1,
                            backgroundColor: selectedAmount[100]
                              ? "#00A24A"
                              : "#FFFFFF",
                            border: selectedAmount[100]
                              ? 0
                              : "1px solid #BEBEBE",
                            "&:hover": {
                              backgroundColor: selectedAmount[100]
                                ? "#00A24A"
                                : "#FFFFFF",
                            },
                          }}
                          onClick={() => {
                            setFieldValue(
                              "depositAmount",
                              `${!selectedAmount[100] ? 100 : ""}`
                            );
                            toggleAmount(100);
                          }}
                        >
                          <Typography
                            fontFamily="Baloo"
                            fontSize={14}
                            fontWeight={600}
                            color={selectedAmount[100] ? "#FFFFFF" : "#999999"}
                            textAlign="left"
                          >
                            100
                          </Typography>
                        </Button>
                      </Grid>
                      {/* 200 PESOS */}
                      <Grid item xs={4}>
                        <Button
                          fullWidth
                          sx={{
                            borderRadius: "10px",
                            py: 1,
                            backgroundColor: selectedAmount[200]
                              ? "#00A24A"
                              : "#FFFFFF",
                            border: selectedAmount[200]
                              ? 0
                              : "1px solid #BEBEBE",
                            "&:hover": {
                              backgroundColor: selectedAmount[200]
                                ? "#00A24A"
                                : "#FFFFFF",
                            },
                          }}
                          onClick={() => {
                            setFieldValue(
                              "depositAmount",
                              `${!selectedAmount[200] ? 200 : ""}`
                            );
                            toggleAmount(200);
                          }}
                        >
                          <Typography
                            fontFamily="Baloo"
                            fontSize={14}
                            fontWeight={600}
                            color={selectedAmount[200] ? "#FFFFFF" : "#999999"}
                            textAlign="center"
                          >
                            200
                          </Typography>
                        </Button>
                      </Grid>
                      {/* 500 PESOS */}
                      <Grid item xs={4}>
                        <Button
                          fullWidth
                          sx={{
                            borderRadius: "10px",
                            py: 1,
                            backgroundColor: selectedAmount[500]
                              ? "#00A24A"
                              : "#FFFFFF",
                            border: selectedAmount[500]
                              ? 0
                              : "1px solid #BEBEBE",
                            "&:hover": {
                              backgroundColor: selectedAmount[500]
                                ? "#00A24A"
                                : "#FFFFFF",
                            },
                          }}
                          onClick={() => {
                            setFieldValue(
                              "depositAmount",
                              `${!selectedAmount[500] ? 500 : ""}`
                            );
                            toggleAmount(500);
                          }}
                        >
                          <Typography
                            fontFamily="Baloo"
                            fontSize={14}
                            fontWeight={600}
                            color={selectedAmount[500] ? "#FFFFFF" : "#999999"}
                            textAlign="right"
                          >
                            500
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      spacing={2}
                      py={1}
                    >
                      {/* 1,000 PESOS */}
                      <Grid item xs={4}>
                        <Button
                          fullWidth
                          sx={{
                            borderRadius: "10px",
                            py: 1,
                            backgroundColor: selectedAmount[1000]
                              ? "#00A24A"
                              : "#FFFFFF",
                            border: selectedAmount[1000]
                              ? 0
                              : "1px solid #BEBEBE",
                            "&:hover": {
                              backgroundColor: selectedAmount[1000]
                                ? "#00A24A"
                                : "#FFFFFF",
                            },
                          }}
                          onClick={() => {
                            setFieldValue(
                              "depositAmount",
                              `${!selectedAmount[1000] ? 1000 : ""}`
                            );
                            toggleAmount(1000);
                          }}
                        >
                          <Typography
                            fontFamily="Baloo"
                            fontSize={14}
                            fontWeight={600}
                            color={selectedAmount[1000] ? "#FFFFFF" : "#999999"}
                            textAlign="left"
                          >
                            1,000
                          </Typography>
                        </Button>
                      </Grid>
                      {/* 5,000 PESOS */}
                      <Grid item xs={4}>
                        <Button
                          fullWidth
                          sx={{
                            borderRadius: "10px",
                            py: 1,
                            backgroundColor: selectedAmount[5000]
                              ? "#00A24A"
                              : "#FFFFFF",
                            border: selectedAmount[5000]
                              ? 0
                              : "1px solid #BEBEBE",
                            "&:hover": {
                              backgroundColor: selectedAmount[5000]
                                ? "#00A24A"
                                : "#FFFFFF",
                            },
                          }}
                          onClick={() => {
                            setFieldValue(
                              "depositAmount",
                              `${!selectedAmount[5000] ? 5000 : ""}`
                            );
                            toggleAmount(5000);
                          }}
                        >
                          <Typography
                            fontFamily="Baloo"
                            fontSize={14}
                            fontWeight={600}
                            color={selectedAmount[5000] ? "#FFFFFF" : "#999999"}
                            textAlign="center"
                          >
                            5,000
                          </Typography>
                        </Button>
                      </Grid>
                      {/* 10,000 PESOS */}
                      <Grid item xs={4}>
                        <Button
                          fullWidth
                          sx={{
                            borderRadius: "10px",
                            py: 1,
                            backgroundColor: selectedAmount[10000]
                              ? "#00A24A"
                              : "#FFFFFF",
                            border: selectedAmount[10000]
                              ? 0
                              : "1px solid #BEBEBE",
                            "&:hover": {
                              backgroundColor: selectedAmount[10000]
                                ? "#00A24A"
                                : "#FFFFFF",
                            },
                          }}
                          onClick={() => {
                            setFieldValue(
                              "depositAmount",
                              `${!selectedAmount[10000] ? 10000 : ""}`
                            );
                            toggleAmount(10000);
                          }}
                        >
                          <Typography
                            fontFamily="Baloo"
                            fontSize={14}
                            fontWeight={600}
                            color={
                              selectedAmount[10000] ? "#FFFFFF" : "#999999"
                            }
                            textAlign="center"
                          >
                            10,000
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid mt={1}>
                    <FormControl variant="standard" fullWidth>
                      <TextField
                        fullWidth
                        placeholder="Enter Amount: 100-100,000"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">₱</InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        size="small"
                        name="depositAmount"
                        value={values.depositAmount || ""}
                        onChange={(e) => {
                          handleChange(e);
                          setSelectedAmount({});
                        }}
                        onBlur={handleBlur}
                        error={Boolean(
                          errors.depositAmount && touched.depositAmount
                        )}
                        helperText={`${errors?.depositAmount || ""}`}
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
                                  <IconButton
                                    disabled={params.disabled}
                                    onClick={() => onAddCard()}
                                    sx={{
                                      padding: 0,

                                      mx: "8px",
                                      position: "absolute",
                                      right: 0,
                                      color: params.disabled
                                        ? "grey.500"
                                        : "inherit",
                                    }}
                                  >
                                    <Box
                                      component="img"
                                      src={additionalIcon}
                                      sx={{
                                        width: "20px",
                                        opacity: params.disabled ? 0.5 : 1,
                                      }}
                                    />
                                  </IconButton>
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid mt={3}>
                    <Typography
                      fontFamily="Baloo"
                      fontSize={10}
                      fontWeight={400}
                    >
                      You will receive your deposit amount in 1-3 minutes. For
                      issues, please contact our customer service and provide
                      your deposit receipt.
                    </Typography>
                  </Grid>
                </Grid>
              )}
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
                      Deposit
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
