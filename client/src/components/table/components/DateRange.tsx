import { Box, styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { DateRange } from "react-date-range";
import RefreshIcon from "@mui/icons-material/Refresh";
import TimePicker from "react-time-picker";
import { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const DateRangeStyled = styled(DateRange)`
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
  width: 330px;
  border: 1px solid #d3d3d3;
  z-index: 1000; /* Set a higher z-index value to ensure it appears in front */
  background-color: white;
`;

const TimePickerStartStyled = styled(TimePicker)`
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 150px;
  border: 1px solid #d3d3d3;
  z-index: 1000; /* Set a higher z-index value to ensure it appears in front */
  background-color: white;
  border: 1px solid #d3d3d3;
  padding: 0 35px;
  margin: 0 10px;
  .react-time-picker__wrapper {
    border: 0;
  }
  .react-time-picker__inputGroup {
    font-weight: 400;
    font-size: 13px;
    color: #7d888d;
  }
`;

const TimePickerEndStyled = styled(TimePicker)`
  position: absolute;
  bottom: -50px;
  left: 160px;
  width: 150px;
  border: 1px solid #d3d3d3;
  z-index: 1000; /* Set a higher z-index value to ensure it appears in front */
  background-color: white;
  border: 1px solid #d3d3d3;
  padding: 0 35px;
  margin: 0 10px;
  .react-time-picker__wrapper {
    border: 0;
  }
  .react-time-picker__inputGroup {
    font-weight: 400;
    font-size: 13px;
    color: #7d888d;
  }
`;

export const DateRangeComponent = (props: any) => {
  const {
    clearFieldValue,
    handleCloseRangeDate,
    handleChangeRangeDate,
    handleChangeStartTime,
    handleChangeEndTime,
    startTime,
    endTime,
    headCell,
    rangeDate,
  } = props;

  return (
    <div style={{ position: "relative" }}>
      <Box
        onClick={() => clearFieldValue(headCell.id)}
        sx={{
          position: "absolute",
          right: "0",
          top: "10px",
          border: "1px solid #D3D3D3",
          backgroundColor: "#FFFFFF",
          pt: "10px",
          px: "10px",
          "&:hover": {
            backgroundColor: "#FFFFFF",
          },
          cursor: "pointer",
        }}
      >
        <RefreshIcon sx={{ fontSize: "16px" }} />
      </Box>
      <Box
        onClick={() => handleCloseRangeDate(headCell.id)}
        sx={{
          position: "absolute",
          right: "0",
          top: "-25px",
          border: "1px solid #D3D3D3",
          backgroundColor: "#FFFFFF",
          pt: "10px",
          px: "10px",
          "&:hover": {
            backgroundColor: "#FFFFFF",
          },
          cursor: "pointer",
        }}
      >
        <CloseIcon sx={{ fontSize: "16px" }} />
      </Box>
      <DateRangeStyled
        maxDate={new Date()}
        editableDateInputs={true}
        onChange={(e) => handleChangeRangeDate(e, headCell?.id)}
        moveRangeOnFirstSelection={false}
        ranges={rangeDate}
      />
      <TimePickerStartStyled
        onChange={handleChangeStartTime}
        clockIcon={false}
        maxTime={endTime}
        value={startTime}
        clearIcon={null}
      />
      <TimePickerEndStyled
        onChange={handleChangeEndTime}
        minTime={startTime}
        clockIcon={false}
        value={endTime}
        disabled={startTime === ""}
        clearIcon={null}
      />
    </div>
  );
};
