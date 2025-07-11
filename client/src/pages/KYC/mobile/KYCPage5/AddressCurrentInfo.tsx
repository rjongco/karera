import {
  Grid,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useUserProfileContext } from "../../../../context/UserProfileContext";

export const KYCPage5AddressCurrentInfo = (props: any) => {
  // @ts-ignore
  const { userProfileState } = props;

  // @ts-ignore
  const {
    touched,
    errors,
    values,
    handleBlur,
    setFieldValue,
  }: {
    values: any;
    setFieldValue: any;
    touched: any;
    handleBlur: any;
    errors: any;
  } = useFormikContext();

  const {
    //  @ts-ignore
    provinceOptions,

    //  @ts-ignore
    citiesOptionsCurrent,
    //  @ts-ignore
    barangaysOptionsCurrent,
    //  @ts-ignore
    onSearchProvinceCurrent,
    //  @ts-ignore
    onSearchCitiesCurrent,
    //  @ts-ignore
  } = useUserProfileContext();

  const sleep = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };

  const [isDisabledAddressCurrentCities, setIsDisabledAddressCurrentCities] =
    useState(false);
  const [
    isDisabledAddressCurrentBarangays,
    setIsDisabledAddressCurrentBarangays,
  ] = useState(false);

  /* Province Initial Loading Data */
  const [openProvinceCurrent, setOpenProvinceCurrent] = useState(false);
  const [optionsProvinceCurrent, setOptionsProvinceCurrent] = useState([]);

  const loadingProvinceCurrent =
    openProvinceCurrent && optionsProvinceCurrent.length === 0;

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
  const [openCitiesCurrent, setOpenCitiesCurrent] = useState(false);
  const [optionsCitiesCurrent, setOptionsCitiesCurrent] = useState([]);

  const loadingCitiesCurrent =
    openCitiesCurrent && optionsCitiesCurrent.length === 0;

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
  const [openBarangaysCurrent, setOpenBarangaysCurrent] = useState(false);
  const [optionsBarangaysCurrent, setOptionsBarangaysCurrent] = useState([]);

  const loadingBarangaysCurrent =
    openBarangaysCurrent && optionsBarangaysCurrent.length === 0;

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

  return (
    <Grid container direction="column">
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

      <Grid item sx={{ mt: 3 }}>
        <Grid container direction="column" alignItems="flex-start">
          <Grid item>
            <Typography
              fontSize={15}
              fontWeight={600}
              textAlign="center"
              color={"#5B5B5B"}
            >
              Current Address
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={{ mt: 1 }}>
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
          onBlur={() => {
            handleBlur("currentAddresses.provinceId");
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
              error={
                errors?.currentAddresses?.provinceId &&
                touched?.currentAddresses?.provinceId
              }
              helperText={
                errors?.currentAddresses?.provinceId &&
                touched?.currentAddresses?.provinceId
                  ? errors?.currentAddresses?.provinceId
                  : userProfileState.errorMessage
                  ? userProfileState.errorMessage["currentAddresses.provinceId"]
                  : ""
              }
            />
          )}
        />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
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
            onSearchCitiesCurrent(city, values.currentAddresses.provinceId);
          }}
          onBlur={() => {
            handleBlur("currentAddresses.cityId");
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
              error={
                errors?.currentAddresses?.cityId &&
                touched?.currentAddresses?.cityId
              }
              helperText={
                errors?.currentAddresses?.cityId &&
                touched?.currentAddresses?.cityId
                  ? errors?.currentAddresses?.cityId
                  : userProfileState.errorMessage
                  ? userProfileState.errorMessage["currentAddresses.cityId"]
                  : ""
              }
            />
          )}
        />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
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
          onBlur={() => {
            handleBlur("currentAddresses.barangayId");
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
              error={
                errors?.currentAddresses?.barangayId &&
                touched?.currentAddresses?.barangayId
              }
              helperText={
                errors?.currentAddresses?.barangayId &&
                touched?.currentAddresses?.barangayId
                  ? errors?.currentAddresses?.barangayId
                  : userProfileState.errorMessage
                  ? userProfileState.errorMessage["currentAddresses.barangayId"]
                  : ""
              }
            />
          )}
        />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
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
            const uppercaseValue = e.target.value.toUpperCase(); // Convert to uppercase
            setFieldValue("currentAddresses.street", uppercaseValue);
          }}
          onBlur={() => {
            handleBlur("currentAddresses.street");
          }}
          error={ 
            errors?.currentAddresses?.street &&
            touched?.currentAddresses?.street
          }
          helperText={
            errors?.currentAddresses?.street &&
            touched?.currentAddresses?.street
              ? errors?.currentAddresses?.street
              : userProfileState?.errorMessage
              ? userProfileState?.errorMessage["currentAddresses.street"]
              : ""
          }
        />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
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
            setFieldValue("currentAddresses.zipCode", e.target.value);
          }}
          onBlur={() => {
            handleBlur("currentAddresses.zipCode");
          }}
          error={
            errors?.currentAddresses?.zipCode &&
            touched?.currentAddresses?.zipCode
          }
          helperText={
            errors?.currentAddresses?.zipCode &&
            touched?.currentAddresses?.zipCode
              ? errors?.currentAddresses?.zipCode
              : userProfileState?.errorMessage
              ? userProfileState?.errorMessage["currentAddresses.zipCode"]
              : ""
          }
        />
      </Grid>
    </Grid>
  );
};
