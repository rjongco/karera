import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ZODIAC_LABELS } from "../../../../common/gameutils";
import React from "react";

export function SideBet() {
  const [dual1, setDual1] = React.useState("-1");
  const [dual2, setDual2] = React.useState("-1");

  function handleChange() {}

  const onDual1 = (event: SelectChangeEvent) => {
    const index = parseInt(event.target.value);
    setDual1(index);
  };

  const onDual2 = (event: SelectChangeEvent) => {
    const index = parseInt(event.target.value);
    setDual2(index);
  };

  return (
    <Box id="side-bet">
      <Box className="side-dropdowns">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Exacta</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dual1}
              label="Choose"
              onChange={onDual1}
            >
              <MenuItem value="-1" key="-1">
                None
              </MenuItem>
              {[...Array(12)].map((_, index) => (
                <MenuItem value={index} key={index}>
                  {ZODIAC_LABELS[index]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dual2}
              label="Choose"
              onChange={onDual2}
            >
              <MenuItem value="-1" key="-1">
                None
              </MenuItem>
              {[...Array(12)].map((_, index) => (
                <MenuItem value={index} key={index}>
                  {ZODIAC_LABELS[index]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box className="side-dropdowns">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Trifecta</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={11}
              label="Trifecta"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={11}
              label="Exacta"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={11}
              label="Exacta"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box className="side-dropdowns">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quintenella</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={11}
              label="Exacta"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={11}
              label="Exacta"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={11}
              label="Exacta"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={11}
              label="Exacta"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
