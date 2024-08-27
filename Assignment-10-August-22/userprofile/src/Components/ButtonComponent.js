import React from "react";
import { Button } from "@mui/material";

const ButtonComponent = ({
  label,
  onClick,
  color = "primary",
  variant = "contained",
  ...props
}) => {
  return (
    <Button onClick={onClick} color={color} variant={variant} {...props}>
      {label}
    </Button>
  );
};

export default ButtonComponent;
