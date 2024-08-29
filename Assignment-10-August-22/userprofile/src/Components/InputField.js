import React from "react";
import { TextField } from "@mui/material";
const InputField = ({ label, placeholder, type = "text", ...props }) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type={type}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};

export default InputField;
