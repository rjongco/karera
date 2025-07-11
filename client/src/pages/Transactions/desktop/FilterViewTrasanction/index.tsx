import { Autocomplete, Grid, TextField, FormControl,IconButton, styled, Button, Typography } from "@mui/material";
import { TRANSACTION_FILTER_BY, USER_FILTER_BY } from "../../../../constants";
import { useState } from "react";
import { FilterTypeOptionData } from "../../../../types";
import ClearIcon from '@mui/icons-material/Clear';
import { Formik } from "formik";
import { FieldFilterTransaction } from "./FieldFilterTransaction";

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


export const FilterViewTrasanction = (props:any) => {
    const { innerRef, validateRef, setTouchedRef, values, handleSubmit, onCloseFilter } = props
    const [filterBy, setFilterBy] = useState<FilterTypeOptionData[]>([])
    const [inputValue, setInputValue] = useState<string>(''); // State to hold input value
  

    const handleChange = (_:any, val:any) => {
        // Check if the selected option is already in filterBy array
        if (!filterBy.some(option => option.id === val.id)) {
          setFilterBy([...filterBy, val]);
        }
    };

    const handleInputChange = (_:any, val:any) => {
        setInputValue(val);
      };
    

    const handleClear = () => {
        setInputValue(''); // Clear the input value
    };

    const sortedFilterBy = [...filterBy].sort((a, b) => a.id - b.id);

    return (
        <Grid item>
            <Grid container direction="column">
                <Grid item>
                    <Typography sx={{  fontSize:20, fontWeight: 600 }}>
                       Filter Fields
                    </Typography>
                </Grid>
                <Grid item>
                    <FormControl variant="standard" fullWidth>
                        <StyledAutocomplete
                            onInputChange={handleInputChange}
                            options={TRANSACTION_FILTER_BY}
                            value={null}
                            inputValue={inputValue}
                            onChange={handleChange}
                            //  @ts-ignore
                            getOptionLabel={(option) => option?.label}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                label="Filter By"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                      <>
                                        {filterBy.length > 0 && (
                                          <IconButton onClick={handleClear} size="small"  sx={{
                                            padding: 0,
                                            mx: "8px",
                                            position: "absolute",
                                            right: 0,
                                          }}>
                                            <ClearIcon />
                                          </IconButton>
                                        )}
                                      </>
                                    ),
                                  }}
                            />
                        )}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                <Formik
                    enableReinitialize
                    innerRef={innerRef}
                    initialValues={{
                        ...values,
                    }}
                    onSubmit={(values, actions) => {
                        handleSubmit(values);
                    }}
                >
                {({
                    setTouched,
                    validateForm,
                    handleSubmit,
                    handleChange,
                    values,
                }) => {
                if (validateRef) validateRef.current = validateForm;
                if (setTouchedRef) setTouchedRef.current = setTouched;
               
                return (
                    <Grid container direction="column">
                        <Grid item>
                            {sortedFilterBy.map((option, i) => (
                                    <Grid key={i} container direction="row"  mt={1}  alignItems="flex-end">
                                        <Grid item sx={{ p:0,margin:0}}/>
                                        <Grid item xs>
                                            <FieldFilterTransaction
                                                name={option.name}
                                                value={values[option.name] || ''}
                                                onChange={handleChange}
                                                fullWidth
                                                placeholder={option.label}
                                                variant="outlined"
                                                size="small" 
                                            />
                                        </Grid>
                                        <Grid item>
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    // Remove the option from filterBy array
                                                    const updatedFilterBy = filterBy.filter(item => item.id !== option.id);
                                                    setFilterBy(updatedFilterBy);
                                                    handleChange({
                                                        target: {
                                                            name: option.name,
                                                            value: '', // Clear the value
                                                        }
                                                    });
                                                    handleSubmit(values)
                                                }}
                                                sx={{
                                                    padding: 0,
                                                    mx: 1,
                                                    mb:"7px"
                                                }}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                   
                            ))}
                        </Grid>
                        <Grid item mt={4}>
                            {/* <Button
                                variant="contained"
                                sx={{
                                    borderRadius: "10px",
                                    py: 1,
                                    px:4,
                                    backgroundColor: "#00A24A",
                                        "&:hover": {
                                            backgroundColor: "#00A24A"
                                        }
                                    }}
                                onClick={() => handleSubmit(values)}
                            >
                                <Typography
                                    fontFamily="Baloo"
                                    fontSize={14}
                                    fontWeight={600}
                                    color="#FFFFFF"
                                    textAlign="left"
                                >
                                    Filter
                                </Typography>
                            </Button> */}
                            <Grid container direction="row" gap={1} justifyItems="space-between">
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            borderRadius: "10px",
                                            py: 1,
                                            px:4,
                                            backgroundColor: "#00A24A",
                                                "&:hover": {
                                                    backgroundColor: "#00A24A"
                                                }
                                            }}
                                        onClick={() => handleSubmit(values)}
                                    >
                                        <Typography
                                            fontFamily="Baloo"
                                            fontSize={14}
                                            fontWeight={600}
                                            color="#FFFFFF"
                                            textAlign="left"
                                        >
                                            Filter
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            borderRadius: "10px",
                                            py: 1,
                                            px:4,
                                            backgroundColor: "#FFFFFF",
                                                "&:hover": {
                                                    backgroundColor: "#FFFFFF"
                                                }
                                            }}
                                        onClick={() => onCloseFilter()}
                                    >
                                        <Typography
                                            fontFamily="Baloo"
                                            fontSize={14}
                                            fontWeight={600}
                                            color="#000000"
                                            textAlign="left"
                                        >
                                            Close
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    )

                }}
                </Formik>
                </Grid>
            </Grid>
        </Grid>
     
    )
}