import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useUserProfileContext } from "../../../context/UserProfileContext";

export const UserProfileAddresses = (props: any) => {
  const { userProfileState } = props;
  //  @ts-ignore
  const {
    //  @ts-ignore
    provinceOptions,

    //  @ts-ignore
    citiesOptionsPermanent,
    //  @ts-ignore
    citiesOptionsCurrent,
    //  @ts-ignore
    barangaysOptionsPermanent,
    //  @ts-ignore
    barangaysOptionsCurrent,

    //  @ts-ignore
    onSearchProvincePermanent,
    //  @ts-ignore
    onSearchProvinceCurrent,
    //  @ts-ignore
    onSearchCitiesPermanent,
    //  @ts-ignore
    onSearchCitiesCurrent,
    //  @ts-ignore
  } = useUserProfileContext();

  const sleep = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };

  const [
    isDisabledAddressPermanentCities,
    setIsDisabledAddressPermanentCities,
  ] = useState(false);
  const [
    isDisabledAddressPermanentBarangays,
    setIsDisabledAddressPermanentBarangays,
  ] = useState(false);

  const [isDisabledAddressCurrentCities, setIsDisabledAddressCurrentCities] =
    useState(false);
  const [
    isDisabledAddressCurrentBarangays,
    setIsDisabledAddressCurrentBarangays,
  ] = useState(false);

  /* Province Initial Loading Data */
  const [openProvincePermanent, setOpenProvincePermanent] = useState(false);
  const [optionsProvincePermanent, setOptionsProvincePermanent] = useState([]);
  const [openProvinceCurrent, setOpenProvinceCurrent] = useState(false);
  const [optionsProvinceCurrent, setOptionsProvinceCurrent] = useState([]);

  const loadingProvincePermanent =
    openProvincePermanent && optionsProvincePermanent.length === 0;
  const loadingProvinceCurrent =
    openProvinceCurrent && optionsProvinceCurrent.length === 0;
  /* Permanent */
  useEffect(() => {
    let activeProvincePermanent = true;
    if (!loadingProvincePermanent) {
      return undefined;
    }
    (async () => {
      await sleep(1000);
      if (activeProvincePermanent) {
        // @ts-ignore
        setOptionsProvincePermanent([...provinceOptions]);
      }
    })();
    return () => {
      activeProvincePermanent = false;
    };
  }, [loadingProvincePermanent]);

  useEffect(() => {
    if (!openProvincePermanent) {
      setOptionsProvincePermanent([]);
    }
  }, [openProvincePermanent]);

  /* Current */
  useEffect(() => {
    let activeProvinceCurrent = true;
    if (!loadingProvinceCurrent) {
      return undefined;
    }
    (async () => {
      await sleep(1000);
      if (activeProvinceCurrent) {
        // @ts-ignore
        setOptionsProvinceCurrent([...provinceOptions]);
      }
    })();
    return () => {
      activeProvinceCurrent = false;
    };
  }, [loadingProvinceCurrent]);

  useEffect(() => {
    if (!openProvinceCurrent) {
      setOptionsProvinceCurrent([]);
    }
  }, [openProvinceCurrent]);
  /* End Province Initial Loading Data */

  /* Cities Initial Loading Data */
  const [openCitiesPermanent, setOpenCitiesPermanent] = useState(false);
  const [optionsCitiesPermanent, setOptionsCitiesPermanent] = useState([]);
  const [openCitiesCurrent, setOpenCitiesCurrent] = useState(false);
  const [optionsCitiesCurrent, setOptionsCitiesCurrent] = useState([]);

  const loadingCitiesPermanent =
    openCitiesPermanent && optionsCitiesPermanent.length === 0;
  const loadingCitiesCurrent =
    openCitiesCurrent && optionsCitiesCurrent.length === 0;

  /* Permanent */
  useEffect(() => {
    let activeCitiesPermanent = true;
    if (!loadingCitiesPermanent) {
      return undefined;
    }
    (async () => {
      await sleep(1000);
      if (activeCitiesPermanent) {
        // @ts-ignore
        setOptionsCitiesPermanent([...citiesOptionsPermanent]);
      }
    })();
    return () => {
      activeCitiesPermanent = false;
    };
  }, [loadingCitiesPermanent]);

  useEffect(() => {
    if (!openCitiesPermanent) {
      setOptionsCitiesPermanent([]);
    }
  }, [openCitiesPermanent]);

  /* Current */
  useEffect(() => {
    let activeCitiesCurrent = true;
    if (!loadingCitiesCurrent) {
      return undefined;
    }
    (async () => {
      await sleep(1000);
      if (activeCitiesCurrent) {
        // @ts-ignore
        setOptionsCitiesCurrent([...citiesOptionsCurrent]);
      }
    })();
    return () => {
      activeCitiesCurrent = false;
    };
  }, [loadingCitiesCurrent]);

  useEffect(() => {
    if (!openCitiesCurrent) {
      setOptionsCitiesCurrent([]);
    }
  }, [openCitiesCurrent]);
  /* End Cities Initial Loading Data */

  /* Barangay Initial Loading Data */
  const [openBarangaysPermanent, setOpenBarangaysPermanent] = useState(false);
  const [optionsBarangaysPermanent, setOptionsBarangaysPermanent] = useState(
    []
  );
  const [openBarangaysCurrent, setOpenBarangaysCurrent] = useState(false);
  const [optionsBarangaysCurrent, setOptionsBarangaysCurrent] = useState([]);

  const loadingBarangaysPermanent =
    openBarangaysPermanent && optionsBarangaysPermanent.length === 0;
  const loadingBarangaysCurrent =
    openBarangaysCurrent && optionsBarangaysCurrent.length === 0;
  /* Permanent */
  useEffect(() => {
    let activeBarangaysPermanent = true;
    if (!loadingBarangaysPermanent) {
      return undefined;
    }
    (async () => {
      await sleep(1000);
      if (activeBarangaysPermanent) {
        // @ts-ignore
        setOptionsBarangaysPermanent([...barangaysOptionsPermanent]);
      }
    })();
    return () => {
      activeBarangaysPermanent = false;
    };
  }, [loadingBarangaysPermanent]);

  useEffect(() => {
    if (!openBarangaysPermanent) {
      setOptionsBarangaysPermanent([]);
    }
  }, [openBarangaysPermanent]);

  /* Current */
  useEffect(() => {
    let activeBarangaysCurrent = true;
    if (!loadingBarangaysCurrent) {
      return undefined;
    }
    (async () => {
      await sleep(1000);
      if (activeBarangaysCurrent) {
        // @ts-ignore
        setOptionsBarangaysCurrent([...barangaysOptionsCurrent]);
      }
    })();
    return () => {
      activeBarangaysCurrent = false;
    };
  }, [loadingBarangaysCurrent]);

  useEffect(() => {
    if (!openBarangaysCurrent) {
      setOptionsBarangaysCurrent([]);
    }
  }, [openBarangaysCurrent]);
  /* End Barangays Initial Loading Data */

  const {
    values,
    setFieldValue,
    errors,
  }: {
    values: any;
    setFieldValue: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
  } = useFormikContext();

  const emptyPermanent =
    values.permanentAddresses.street === "" &&
    values.permanentAddresses.zipCode === "" &&
    values.permanentAddresses.provinceId === "" &&
    values.permanentAddresses.cityId === "" &&
    values.permanentAddresses.barangayId === "";

  const handleChangeUseMyPermanentAddress = (e: any) => {
    setFieldValue("usePresentAddress", e.target.checked);
    if (e.target.checked) {
      setFieldValue(
        "currentAddresses.street",
        values.permanentAddresses.street
      );
      setFieldValue(
        "currentAddresses.zipCode",
        values.permanentAddresses.zipCode
      );
      onSearchProvinceCurrent(values.permanentAddresses.provinceId);

      setFieldValue(
        "currentAddresses.provinceId",
        values.permanentAddresses.provinceId
      );
      setFieldValue(
        "currentAddresses.cityId",
        values.permanentAddresses.cityId
      );
      setFieldValue(
        "currentAddresses.barangayId",
        values.permanentAddresses.barangayId
      );
    } else {
      setFieldValue("currentAddresses.street", "");
      setFieldValue("currentAddresses.zipCode", "");
      setFieldValue("currentAddresses.provinceId", "");
      setFieldValue("currentAddresses.cityId", "");
      setFieldValue("currentAddresses.barangayId", "");
      onSearchProvinceCurrent(null);
    }
  };

  const handleChangeUsePresentAddress = () => {};

  return (
    <>
      <Grid item xs={12} sm={12} md={12} sx={{ mt: 1, px: 3 }}>
        <Grid container direction="column">
          <Grid item>
            <Typography
              variant="h6"
              sx={{ fontSize: "14px", fontWeight: 600, mb: 1 }}
            >
              Permanent Address
            </Typography>
            {/* Permanent FIELDS */}
            <Grid container direction="column">
              {/* Street Field Permanent and Zip Code Permanent */}

              <Grid item sx={{ mt: 1 }}>
                <Grid container direction="row" spacing={{ sm: 3, md: 3 }}>
                  {/* Province Permanent Field */}
                  <Grid item xs={12} sm={4} md={4}>
                    {/*  @ts-ignore */}
                    <Autocomplete
                      id="permanentAddressesProvinceId"
                      open={openProvincePermanent}
                      onOpen={() => {
                        setOpenProvincePermanent(true);
                      }}
                      onClose={() => {
                        setOpenProvincePermanent(false);
                      }}
                      value={values.permanentAddresses.provinceId || null}
                      options={optionsProvincePermanent}
                      fullWidth
                      onChange={(e, val, reason) => {
                        if (reason === "clear") {
                          setFieldValue("permanentAddresses.provinceId", "");
                          onSearchProvincePermanent("");
                          setFieldValue("permanentAddresses.cityId", "");
                          setIsDisabledAddressPermanentCities(true);
                          return;
                        }
                        setIsDisabledAddressPermanentCities(false);
                        setFieldValue("permanentAddresses.provinceId", val);
                        onSearchProvincePermanent(val);
                      }}
                      //  @ts-ignore
                      getOptionLabel={(option) => option?.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Province"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {loadingProvincePermanent ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                  {/* Cities Permanent Field */}
                  <Grid item xs={12} sm={4} md={4}>
                    <Autocomplete
                      disabled={
                        Boolean(!values.permanentAddresses.provinceId) ||
                        isDisabledAddressPermanentCities
                      }
                      id="permanentAddressesCitiesId"
                      open={openCitiesPermanent}
                      onOpen={() => {
                        setOpenCitiesPermanent(true);
                      }}
                      onClose={() => {
                        setOpenCitiesPermanent(false);
                      }}
                      value={values.permanentAddresses.cityId || null}
                      options={optionsCitiesPermanent}
                      fullWidth
                      onChange={(e, city, reason) => {
                        if (reason === "clear") {
                          setFieldValue("permanentAddresses.cityId", "");
                          onSearchCitiesPermanent("");
                          setFieldValue("permanentAddresses.barangayId", "");
                          setIsDisabledAddressPermanentBarangays(true);
                          return;
                        }
                        setIsDisabledAddressPermanentBarangays(false);
                        setFieldValue("permanentAddresses.cityId", city);
                        onSearchCitiesPermanent(
                          city,
                          values.permanentAddresses.provinceId
                        );
                      }}
                      //  @ts-ignore
                      getOptionLabel={(option) => option?.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Cities"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {loadingCitiesPermanent ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                  {/* Barangay Permanent Field */}
                  <Grid item xs={12} sm={4} md={4}>
                    <Autocomplete
                      disabled={
                        Boolean(!values.permanentAddresses.cityId) ||
                        isDisabledAddressPermanentBarangays
                      }
                      id="permanentAddressesBarangaysId"
                      open={openBarangaysPermanent}
                      onOpen={() => {
                        setOpenBarangaysPermanent(true);
                      }}
                      onClose={() => {
                        setOpenBarangaysPermanent(false);
                      }}
                      value={values.permanentAddresses.barangayId || null}
                      options={optionsBarangaysPermanent}
                      fullWidth
                      onChange={(e, val) => {
                        setFieldValue("permanentAddresses.barangayId", val);
                      }}
                      //  @ts-ignore
                      getOptionLabel={(option) => option?.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Barangays"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {loadingBarangaysPermanent ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mt: 1 }}>
                <Grid container direction="row" spacing={{ sm: 3, md: 3 }}>
                  <Grid item xs={12} sm={8} md={8}>
                    <TextField
                      type="text"
                      id="permanentAddressesStreet"
                      name="permanentAddressesStreet"
                      label="Street"
                      autoFocus
                      value={values.permanentAddresses.street}
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        setFieldValue(
                          "permanentAddresses.street",
                          e.target.value
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <TextField
                      type="text"
                      id="permanentAddressesZipCode"
                      name="permanentAddressesZipCode"
                      label="Zip Code"
                      autoFocus
                      value={values.permanentAddresses.zipCode}
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        setFieldValue(
                          "permanentAddresses.zipCode",
                          e.target.value
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {/* Checkbox USE MY Permanent */}
            <Grid sx={{ mt: 3 }}>
              <FormControlLabel
                disabled={emptyPermanent}
                control={
                  <Checkbox
                    checked={values.usePresentAddress || false}
                    size="small"
                  />
                }
                onChange={handleChangeUseMyPermanentAddress}
                label={
                  <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                    Use my Permanent address
                  </Typography>
                }
              />
            </Grid>
            <Typography
              variant="h6"
              sx={{ fontSize: "14px", fontWeight: 600, mt: 0, mb: 0 }}
            >
              Current Address
            </Typography>
            {/* CURRENT FIELDS */}
            <Grid container direction="column">
              <Grid item sx={{ mt: 1 }}>
                <Grid
                  container
                  direction="row"
                  sx={{ mt: 2 }}
                  spacing={{ sm: 3, md: 3 }}
                >
                  {/* Province Current Field */}
                  <Grid item xs={12} sm={4} md={4}>
                    {/*  @ts-ignore */}
                    <Autocomplete
                      id="currentAddressesProvinceId"
                      disabled={values.usePresentAddress}
                      open={openProvinceCurrent}
                      onOpen={() => {
                        setOpenProvinceCurrent(true);
                      }}
                      onClose={() => {
                        setOpenProvinceCurrent(false);
                      }}
                      value={values.currentAddresses.provinceId || null}
                      options={optionsProvinceCurrent}
                      fullWidth
                      onChange={(e, val, reason) => {
                        if (reason === "clear") {
                          setFieldValue("currentAddresses.provinceId", "");
                          setFieldValue("currentAddresses.cityId", "");
                          onSearchProvinceCurrent("");
                          setIsDisabledAddressCurrentCities(true);
                          return;
                        }
                        setIsDisabledAddressCurrentCities(false);
                        setFieldValue("currentAddresses.provinceId", val);
                        onSearchProvinceCurrent(val);
                      }}
                      //  @ts-ignore
                      getOptionLabel={(option) => option?.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Province"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {loadingProvinceCurrent ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                  {/* Cities Current Field */}
                  <Grid item xs={12} sm={4} md={4}>
                    <Autocomplete
                      disabled={
                        values.usePresentAddress ||
                        Boolean(
                          !values.currentAddresses.provinceId ||
                            isDisabledAddressCurrentCities
                        )
                      }
                      id="currentAddressesCitiesId"
                      open={openCitiesCurrent}
                      onOpen={() => {
                        setOpenCitiesCurrent(true);
                      }}
                      onClose={() => {
                        setOpenCitiesCurrent(false);
                      }}
                      value={values.currentAddresses.cityId || null}
                      options={optionsCitiesCurrent}
                      fullWidth
                      onChange={(e, city, reason) => {
                        if (reason === "clear") {
                          setFieldValue("currentAddresses.cityId", "");
                          setFieldValue("currentAddresses.barangayId", "");
                          onSearchCitiesCurrent("");
                          setIsDisabledAddressCurrentBarangays(true);
                          return;
                        }
                        setIsDisabledAddressCurrentBarangays(false);
                        setFieldValue("currentAddresses.cityId", city);
                        onSearchCitiesCurrent(
                          city,
                          values.currentAddresses.provinceId
                        );
                      }}
                      //  @ts-ignore
                      getOptionLabel={(option) => option?.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Cities"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {loadingCitiesCurrent ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                  {/* Barangay Current Field */}
                  <Grid item xs={12} sm={4} md={4}>
                    <Autocomplete
                      disabled={
                        values.usePresentAddress ||
                        Boolean(
                          !values.currentAddresses.cityId ||
                            isDisabledAddressCurrentBarangays
                        )
                      }
                      id="currentAddressesBarangaysId"
                      open={openBarangaysCurrent}
                      onOpen={() => {
                        setOpenBarangaysCurrent(true);
                      }}
                      onClose={() => {
                        setOpenBarangaysCurrent(false);
                      }}
                      value={values.currentAddresses.barangayId || null}
                      options={optionsBarangaysCurrent}
                      fullWidth
                      onChange={(e, val) => {
                        setFieldValue("currentAddresses.barangayId", val);
                      }}
                      //  @ts-ignore
                      getOptionLabel={(option) => option?.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Barangays"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {loadingBarangaysCurrent ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Street Field Current and Zip Code Current */}
              <Grid item sx={{ mt: 1 }}>
                <Grid container direction="row" spacing={{ sm: 3, md: 3 }}>
                  <Grid item xs={12} sm={8} md={8}>
                    <TextField
                      disabled={values.usePresentAddress}
                      type="text"
                      id="currentAddressesStreet"
                      name="currentAddressesStreet"
                      label="Street"
                      autoFocus
                      value={values.currentAddresses.street}
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        setFieldValue(
                          "currentAddresses.street",
                          e.target.value
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <TextField
                      disabled={values.usePresentAddress}
                      type="text"
                      id="currentAddressesZipCode"
                      name="currentAddressesZipCode"
                      label="Zip Code"
                      autoFocus
                      value={values.currentAddresses.zipCode}
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        setFieldValue(
                          "currentAddresses.zipCode",
                          e.target.value
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
