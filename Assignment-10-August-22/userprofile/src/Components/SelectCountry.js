import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const countries = [
  "America",
  "Germany",
  "Canada",
  "Australia",
  "Brazil",
  "China",
  "France",
  "India",
  "Italy",
  "Japan",
  "Mexico",
  "Russia",
  "South Africa",
  "South Korea",
  "United Kingdom",
];

const SelectCountry = ({ value, onChange, label = "Country", ...props }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="select-country-label">{label}</InputLabel>
      <Select
        labelId="select-country-label"
        id="select-country"
        value={value}
        onChange={onChange}
        label={label}
        {...props}
      >
        {countries.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCountry;
