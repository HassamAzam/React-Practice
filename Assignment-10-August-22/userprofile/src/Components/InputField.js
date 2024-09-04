import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const InputField = ({ label, placeholder, type = "text", ...props }) => (
  <TextField
    label={label}
    placeholder={placeholder}
    type={type}
    fullWidth
    variant="outlined"
    {...props}
    margin="normal"
  />
);

InputField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
