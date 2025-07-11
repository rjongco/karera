import {
  Grid,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useUserProfileContext } from "../../../../context/UserProfileContext";

export const KYCPage5AddressPermanentInfo = (props: any) => {
  // @ts-ignore
  const { userProfileState, loadingProvinceCurrent } = props;

  // @ts-ignore
  const {
    values,
    setFieldValue,
  }: {
    values: any;
    setFieldValue: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
  } = useFormikContext();

  const {
    //  @ts-ignore
    provinceOptions,
    //  @ts-ignore
    citiesOptionsPermanent,
    //  @ts-ignore
    barangaysOptionsPermanent,

    //  @ts-ignore
    onSearchProvincePermanent,
    //  @ts-ignore
    onSearchCitiesPermanent,
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

  /* Province Initial Loading Data */
  const [openProvincePermanent, setOpenProvincePermanent] = useState(false);
  const [optionsProvincePermanent, setOptionsProvincePermanent] = useState([]);

  const loadingProvincePermanent =
    openProvincePermanent && optionsProvincePermanent.length === 0;

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

  /* Cities Initial Loading Data */
  const [openCitiesPermanent, setOpenCitiesPermanent] = useState(false);
  const [optionsCitiesPermanent, setOptionsCitiesPermanent] = useState([]);

  const loadingCitiesPermanent =
    openCitiesPermanent && optionsCitiesPermanent.length === 0;

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

  /* Barangay Initial Loading Data */
  const [openBarangaysPermanent, setOpenBarangaysPermanent] = useState(false);
  const [optionsBarangaysPermanent, setOptionsBarangaysPermanent] = useState(
    []
  );

  const loadingBarangaysPermanent =
    openBarangaysPermanent && optionsBarangaysPermanent.length === 0;

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

  return (
    <Grid container direction="column">
      <Grid item sx={{ mt: 3 }}>
        <Typography
          fontSize={15}
          fontWeight={600}
          textAlign="center"
          color={"#5B5B5B"}
        >
          Address Information
        </Typography>
      </Grid>

      <Grid item sx={{ mt: 2 }}>
        <Grid container direction="column" alignItems="flex-start">
          <Grid item>
            <Typography
              fontSize={15}
              fontWeight={600}
              textAlign="center"
              color={"#5B5B5B"}
            >
              Permanent Address
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={{ mt: 1 }}>
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
      <Grid item sx={{ mt: 2 }}>
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
            onSearchCitiesPermanent(city, values.permanentAddresses.provinceId);
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
      <Grid item sx={{ mt: 2 }}>
        {" "}
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
  );
};
