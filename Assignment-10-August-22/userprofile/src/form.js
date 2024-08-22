import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

function Form() {
  const [open, setOpen] = useState(true);

  //const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const navigate=useNavigate();

  return (
    <div>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="registration-form"
        aria-describedby="registration-form-description"
      >
        <div className="formContainer">
          <div className="form">
            <FormGroup className="formFields">
              <FormControl>
                <InputLabel>First Name</InputLabel>
                <Input />
              </FormControl>
              <FormControl>
                <InputLabel>Number</InputLabel>
                <Input />
              </FormControl>
              <FormControl>
                <InputLabel>Last Name</InputLabel>
                <Input />
              </FormControl>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input />
              </FormControl>
              <FormControl>
                <InputLabel>Password</InputLabel>
                <Input type="password"/>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Country"
                >
                  <MenuItem value={"American"}>America</MenuItem>
                  <MenuItem value={"Germany"}>Germany</MenuItem>
                  <MenuItem value={"Canada"}>Canada</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Submit
                </Button>
              </FormControl>
              <FormControl>
               <Link to={'/login'}> <Button
                  variant="outlined"
                  color="secondary"
                >
                
                  Close
                </Button>
                </Link>
              </FormControl>
            </FormGroup>
          </div>
        </div>
      </Modal>
      </div>
    </div>
  );
}

export default Form;
