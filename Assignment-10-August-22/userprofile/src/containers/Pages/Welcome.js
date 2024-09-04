import React from "react";
import { useNavigate } from "react-router-dom";

import ButtonComponent from "../../Components/ButtonComponent";

export default function Welcome() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <>
      <ButtonComponent label="LoginPage" onClick={handleClick} />
    </>
  );
}
