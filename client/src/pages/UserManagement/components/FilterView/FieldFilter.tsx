import { TextField, Select, MenuItem, FormControl } from "@mui/material";
import { useField, useFormikContext  } from "formik";
import { GENDER_SELECT_OPTIONS, NATIONALITIES, ROLES_SELECT_OPTIONS, STATUS_SELECT_OPTIONS } from "../../../../constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { FilterAddressField } from "./FilterAddressField";

export const FieldFilter = (props:any) => {
    const { ...rest } = props

    const { setFieldValue, values } = useFormikContext();
    
    const [field] = useField(rest);
    if(rest.name === "role"){
        return (
            <Select
                {...field}
                {...rest}
                fullWidth
                variant="outlined"
                displayEmpty
            >
                <MenuItem value="" disabled>Select Role</MenuItem>
                {ROLES_SELECT_OPTIONS.map((role) => (
                    <MenuItem key={role.name} value={role.name}>{role.label}</MenuItem>
                ))}
            </Select>
        );
    }else if (rest.name === "gender"){
        return (
            <Select
                {...field}
                {...rest}
                fullWidth
                variant="outlined"
                displayEmpty
            >
                <MenuItem value="" disabled>Select Gender</MenuItem>
                {GENDER_SELECT_OPTIONS.map((gender) => (
                    <MenuItem key={gender.name} value={gender.name}>{gender.label}</MenuItem>
                ))}
            </Select>
        );
    }else if (rest.name === "nationalities"){
        return (
            <Select
                {...field}
                {...rest}
                fullWidth
                variant="outlined"
                displayEmpty
            >
                <MenuItem value="" disabled>Select Nationality</MenuItem>
                {NATIONALITIES.map((nationality) => (
                    <MenuItem key={nationality} value={nationality}>{nationality}</MenuItem>
                ))}
            </Select>
        );
    }else if (rest.name === "birthdate"){
        return (
            <>
            <FormControl fullWidth>
                <DatePicker
                    value={dayjs(new Date(field.value))}
                    format="YYYY-MM-DD"
                    onChange={(date) => {
                        setFieldValue(
                        "birthdate",
                        dayjs(date).format("YYYY-MM-DD")
                        );
                    }}
                    // @ts-ignore
                    inputProps={{ type: "date" }}
                    slotProps={{
                        textField: {
                            variant: "outlined",
                            size: "small",
                            error:false,
                        },
                    }}
                />
            </FormControl>
            </>
        );
    }else if (rest.name === "mobile"){
        return (
            <MuiPhoneNumber
                {...field}
                {...rest}
                onChange={(val: string) => {
                    setFieldValue("mobile", val);
                }}
                defaultCountry={"ph"}
                regions={["asia"]}
                size="small"
                fullWidth
                autoComplete="off"
                sx={{ width: "100%" }}
                variant="outlined"
                disableDropdown
                autoFormat={false}
                onlyCountries={["ph"]}
                countryCodeEditable={false}
             
            />
        )
    }else if (rest.name === "address"){
        return (
            <FilterAddressField {...field}  
                value={field.value}
                values={values}
                setIsCurrent={(e:any) => {
                    setFieldValue("usePresentAddress", e.target.value);
                }}
                setAddress={(values:any)=>{
                    setFieldValue("address", values);
                }}
            />
        )
    }else if (rest.name === "status"){
        return (
            <Select
                {...field}
                {...rest}
                fullWidth
                variant="outlined"
                displayEmpty
            >
                <MenuItem value="" disabled>Select Status</MenuItem>
                {STATUS_SELECT_OPTIONS.map((status) => (
                    <MenuItem key={status.name} value={status.name}>{status.label}</MenuItem>
                ))}
            </Select>
        );
    }

    return (
        <TextField
            {...field}
            {...props}
        />
    )
}