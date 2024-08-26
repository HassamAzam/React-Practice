import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { addInArray } from "../Store/userArraySlice"; 

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userArray = useSelector((state) => state.userArray.value);
  console.log(userArray)

  const handleClose = () => {
    navigate("/login");
  };

  const checkIfUserExists = (email) => {
    return userArray.some(user => user.email === email);
  };

  const handleSubmit = () => {
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
                <InputLabel>First Name</InputLabel>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputLabel>Last Name</InputLabel>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <MenuItem value={"America"}>America</MenuItem>
                  <MenuItem value={"Germany"}>Germany</MenuItem>
                  <MenuItem value={"Canada"}>Canada</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </FormControl>
              <FormControl>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </FormControl>
            </FormGroup>
          </div>
        </div>
      </Modal>
      <ToastContainer/>
    </div>
  );
}

export default SignUp;
