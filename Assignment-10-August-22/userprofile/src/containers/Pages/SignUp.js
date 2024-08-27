import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {Modal,FormGroup,FormControl,} from "@mui/material";

import SelectCountry from "../../Components/SelectCountry";
import InputField from "../../Components/InputField";
import ButtonComponent from "../../Components/ButtonComponent";

import { addInArray } from "../../Store/userArraySlice";

function SignUp() {
  const formFields = useRef({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    country: "America",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userArray = useSelector((state) => state.userArray.value);

  const handleClose = () => {
    navigate("/login");
  };

  const checkIfUserExists = (email) => {
    return userArray.some((user) => user.email === email);
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, password, country } = formFields;
    if (!firstName || !lastName || !email || !password || !country) {
      toast.error("Please fill in all fields");
      return;
    }
    if (checkIfUserExists(email)) {
      toast.error("User Already Exists");
    } else {
      const newUser = { firstName, lastName, email, password, country };
      dispatch(addInArray(newUser));
      navigate("/login");
    }
  };
  
  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="registration-form"
        aria-describedby="registration-form-description"
      >
        <div className="formContainer">
          <div className="form">
            <FormGroup className="formFields">
              <FormControl>
                <InputField
                  label="First Name"
                  type="text"
                  onChange={(e) => (formFields.firstName = e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputField
                  label="Last Name"
                  onChange={(e) => (formFields.lastName = e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputField
                  label="Email"
                  onChange={(e) => (formFields.email = e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputField
                  type="password"
                  label="Password"
                  onChange={(e) => (formFields.password = e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>

                <SelectCountry
                  label="Country"
                  onChange={(e) => (formFields.country = e.target.value)}
                />
              </FormControl>
              <FormControl>
                <ButtonComponent
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                  label="Submit"
                />
                 
              </FormControl>
              <FormControl>
                <ButtonComponent
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                  label="Close"
                />
                  
              </FormControl>
            </FormGroup>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
