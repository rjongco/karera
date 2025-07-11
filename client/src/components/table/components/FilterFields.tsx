import {
  IconButton,
  Select,
  TextField,
  FormControl,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { DateRangeComponent } from "./DateRange";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { FilterTypeData } from "../../../types";
import { useState } from "react";
import { DATE, SELECT } from "../../../constants";

export const FilterFields = (props: any) => {
  const {
    headCell,
    values,
    handleInputChange,
    handleInputSubmit,
    clearFieldValue,
    handleCloseRangeDate,
    handleChangeRangeDate,
    rangeDate,
    handleChangeStartTime,
    handleChangeEndTime,
    startTime,
    endTime,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSelect = () => {
    setIsOpen(!isOpen);
  };

  if (headCell?.filterType === DATE) {
    return (
      <DateRangeComponent
        clearFieldValue={clearFieldValue}
        headCell={headCell}
        handleCloseRangeDate={handleCloseRangeDate}
        handleChangeRangeDate={handleChangeRangeDate}
        rangeDate={rangeDate}
        handleChangeStartTime={handleChangeStartTime}
        handleChangeEndTime={handleChangeEndTime}
        startTime={startTime}
        endTime={endTime}
      />
    );
  } else if (headCell?.filterType === SELECT) {
    return (
      <FormControl fullWidth>
        <Select
          displayEmpty
          name={headCell?.id}
          value={values[headCell?.id]}
          fullWidth
          variant="standard"
          size="small"
          IconComponent={() => null} // Disable the default arrow icon
          onChange={handleInputChange}
          open={isOpen}
          onOpen={handleToggleSelect}
          onClose={handleToggleSelect}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return (
                <span style={{ color: "#D3D3D3" }}>{headCell?.label}</span>
              );
            }
            const selectedOption = headCell?.filterTypeData?.find(
              (option: any) => option.name === selected
            );
            return selectedOption ? selectedOption.label : selected;
          }}
          endAdornment={
            <InputAdornment position="end" style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: "-12px", right: "-5px" }}
              >
                <IconButton
                  sx={{ mr: "2px", p: 0 }}
                  onClick={() => {
                    const newValues = values;
                    handleInputSubmit(newValues);
                  }}
                >
                  <SearchIcon sx={{ fontSize: "16px" }} />
                </IconButton>
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => clearFieldValue(headCell.id)}
                >
                  <CloseIcon sx={{ fontSize: "16px" }} />
                </IconButton>
              </div>
            </InputAdornment>
          }
        >
          {headCell?.filterTypeData?.map((o: FilterTypeData) => {
            return <MenuItem value={o.name}>{o.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  }
  return (
    <TextField
      // @ts-ignore
      name={headCell?.id}
      variant="outlined"
      size="small"
      fullWidth
      // @ts-ignore
      value={values[headCell?.id]}
      placeholder={headCell.label}
      onChange={handleInputChange}
      InputProps={{
        endAdornment: (
          <>
            <IconButton
              aria-label="save"
              onClick={() => {
                const newValues = values;
                handleInputSubmit(newValues);
              }}
              sx={{ ml: -5, p: 0 }}
            >
              <SearchIcon sx={{ fontSize: "16px" }} />
            </IconButton>
            <IconButton
              aria-label="close"
              onClick={() => clearFieldValue(headCell.id)}
              sx={{ m: 0, p: 0 }}
            >
              <CloseIcon sx={{ fontSize: "16px", mr: -2 }} />
            </IconButton>
          </>
        ),
      }}
    />
  );
};
