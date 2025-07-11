import { useEffect, useState } from "react";
import { useUserManagementContext } from "../../../../context/UserManagementContext";
import { Autocomplete, CircularProgress, Grid, TextField, FormControlLabel, Checkbox, Typography, FormControl, RadioGroup, Radio } from "@mui/material";

export const FilterAddressField = (props:any) => {
    const { onChange, value, values, setIsCurrent, setAddress } = props

    const {
        provinceOptions,
        setProvinceId,
        cityOptions,
        setCityId,
        barangayOptions
    } = useUserManagementContext();

    const [formDataAddress, setFormAddress] = useState({
      province:"",
      city:"",
      barangay:""
    });

    /* Province */
    const [openProvince, setOpenProvince] = useState(false);
    const [optionsProvince, setOptionsProvince] = useState([]);

    const loadingProvince =
    openProvince && optionsProvince.length === 0;

    /* Cities */
    const [openCities, setOpenCities] = useState(false);
    const [optionsCities, setOptionsCities] = useState([]);

    const loadingCities =
    openCities && optionsCities.length === 0;

    /* Barangay */
    const [openBarangays, setOpenBarangays] = useState(false);
    const [optionsBarangays, setOptionsBarangays] = useState(
      []
    );
    const loadingBarangays =
    openBarangays && optionsBarangays.length === 0;



    const sleep = (delay = 0) => {
        return new Promise((resolve) => {
          setTimeout(resolve, delay);
        });
    };
    
    /* Province */
    useEffect(() => {
        let activeProvince = true;
        if (!loadingProvince) {
          return undefined;
        }
        (async () => {
          await sleep(1000);
          if (activeProvince) {
            // @ts-ignore
            setOptionsProvince([...provinceOptions]);
          }
        })();
        return () => {
          activeProvince = false;
        };
    }, [loadingProvince]);

    /* Cities */
    useEffect(() => {
      let activeCities = true;
      if (!loadingCities) {
        return undefined;
      }
      (async () => {
        await sleep(1000);
        if (activeCities) {
          // @ts-ignore
          setOptionsCities([...cityOptions]);
        }
      })();
      return () => {
        activeCities = false;
      };
    }, [loadingCities]);

    useEffect(() => {
      if (!openCities) {
        setOptionsCities([]);
      }
    }, [openCities]);

    /* Barangay */
    useEffect(() => {
      let activeBarangays = true;
      if (!loadingBarangays) {
        return undefined;
      }
      (async () => {
        await sleep(1000);
        if (activeBarangays) {
          // @ts-ignore
          setOptionsBarangays([...barangayOptions]);
        }
      })();
      return () => {
        activeBarangays = false;
      };
    }, [loadingBarangays]);
  
    useEffect(() => {
      if (!openBarangays) {
        setOptionsBarangays([]);
      }
    }, [openBarangays]);


    const handleProvinceChange = (e:any, val:any, reason:any) => {
     const prov = {
      ...values?.address,
      province:val
     }
      setAddress(prov)
      setProvinceId(val?.id)
    }

    const handleCityChange = (e:any, val:any, reason:any) => {
      const prov = {
        ...values?.address,
       city:val
      }
       setAddress(prov)
       setCityId(val.id)
     }

     const handleBarangayChange = (e:any, val:any, reason:any) => {
      const prov = {
        ...values?.address,
       barangay:val
      }
       setAddress(prov)
     }

    return (
      <Grid container direction="column">
        <Grid item>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={0}
              value={values?.usePresentAddress}
              onChange={setIsCurrent}
              row  
            >
              <FormControlLabel value={0}  control={<Radio />} label="Permanent Address" />
              <FormControlLabel value={1} control={<Radio />} label="Present Address" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <Autocomplete
              open={openProvince}
              onOpen={() => {
                setOpenProvince(true);
              }}
              onClose={() => {
                setOpenProvince(false);
              }}
              value={values?.address?.province || null}
              options={optionsProvince}
              fullWidth
              onChange={handleProvinceChange}
              getOptionLabel={(option:any) => option?.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Province"
                  size="small"
                  sx={{mt:"5px"}}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingProvince ? (
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

        <Grid item mt={1}>
          <Autocomplete
            disabled={Boolean(!values?.address?.province)}
              id="permanentAddressesCitiesId"
              open={openCities}
              onOpen={() => {
                setOpenCities(true);
              }}
              onClose={() => {
                setOpenCities(false);
              }}
              value={values?.address?.city || null}
              options={optionsCities}
              fullWidth
              onChange={handleCityChange}
              //  @ts-ignore
              getOptionLabel={(option) => option?.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="City"
                  size="small"
                  sx={{mt:"5px"}}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingCities ? (
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

        <Grid item mt={1}>
        <Autocomplete
          disabled={
            Boolean(!values?.address?.city)}
          id="permanentAddressesBarangaysId"
          open={openBarangays}
          onOpen={() => {
            setOpenBarangays(true);
          }}
          onClose={() => {
            setOpenBarangays(false);
          }}
          value={values?.address?.barangay || null}
          options={optionsBarangays}
          fullWidth
          onChange={handleBarangayChange}
          //  @ts-ignore
          getOptionLabel={(option) => option?.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Barangay"
              size="small"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingBarangays ? (
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
    
    )
}