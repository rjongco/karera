import { TextField, Select, MenuItem } from "@mui/material";
import { useField, useFormikContext  } from "formik";
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from "../../../../constants";


export const FieldFilterTransaction = (props:any) => {
    const { ...rest } = props
    
    const [field] = useField(rest);
    if(rest.name === "type"){
        return (
            <Select
                {...field}
                {...rest}
                fullWidth
                variant="outlined"
                displayEmpty
            >
                <MenuItem value="" disabled>Select Transaction Type</MenuItem>
                {TRANSACTION_TYPE.map((role) => (
                    <MenuItem key={role.name} value={role.name}>{role.label}</MenuItem>
                ))}
            </Select>
        );
    }else if (rest.name === "status"){
        return (
            <Select
                {...field}
                {...rest}
                fullWidth
                variant="outlined"
                displayEmpty
            >
                <MenuItem value="" disabled>Select Transaction Status</MenuItem>
                {TRANSACTION_STATUS.map((gender) => (
                    <MenuItem key={gender.name} value={gender.name}>{gender.label}</MenuItem>
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