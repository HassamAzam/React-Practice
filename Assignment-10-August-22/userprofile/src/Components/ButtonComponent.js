import React from "react";
import PropTypes from 'prop-types';
import { Button } from "@mui/material";

const ButtonComponent = ({
  label,
  onClick,
  color = "primary",
  variant = "contained",
  ...props
}) => (
  <Button onClick={onClick} color={color} variant={variant} {...props}>
    {label}
  </Button>
);


Button.propTypes = {
  label: PropTypes.string.isRequired,  
   
};
Button.defaultProps = {
  label:"Button Name"                      
};
export default ButtonComponent;
