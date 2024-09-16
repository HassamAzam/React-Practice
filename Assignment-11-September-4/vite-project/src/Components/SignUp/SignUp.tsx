import { useEffect } from "react";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import middleware from "src/settings";
import setDocumentTitle from "src/Utilities/title";
import Status from "src/Utilities/Enums";
import { SignUpInterface } from "src/Utilities/interfaces";
import { resetState, signUp } from "src/store/signUpSlice";
import { useAppDispatch, useAppSelector } from "src/store/store";
import { signUpRequest } from "src/sagaStore/sagas/signUpSagaSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SignUpInterface>();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.signUp);

  const genderOptions = ["Male", "Female", "Other"];

  useEffect(() => {
    if (status === Status.Success) {
      toast.success("Signed Up!");
      navigate("/login");
    } else if (status === Status.Failed) {
      toast.error("Something went wrong");
    }

    return () => {
      dispatch(resetState());
    };
  }, [status]);

  useEffect(() => {
    setDocumentTitle("Sign Up");
  }, []);

  const onSubmit: SubmitHandler<SignUpInterface> = async (data) => {
    if (middleware == "thunk") {
      await dispatch(signUp(data)).unwrap();
    } else {
      dispatch(signUpRequest(data));
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: 2,
        padding: 9,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h6" sx={{ color: "black" }}>
        Sign Up
      </Typography>
      <br />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField
            label="First Name"
            {...register("firstName")}
            type="string"
          />
        </FormControl>
        <br />
        <br />
        <FormControl>
          <TextField
            label="Last Name"
            {...register("lastName")}
            type="string"
          />
        </FormControl>
        <br />
        <br />
        <FormControl>
          <TextField label="Email" type="email" {...register("email")} />
        </FormControl>
        <br />
        <br />
        <FormControl>
          <TextField
            label="Password"
            type="password"
            {...register("password")}
          />
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel id="marital-status-label">Marital Status</InputLabel>
          <Select
            labelId="marital-status-label"
            label="Marital Status"
            defaultValue=""
            {...register("maritalStatus", {
              required: "Marital Status is required",
            })}
          >
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Engaged">Engaged</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />

        <FormControl fullWidth>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            label="Gender"
            defaultValue=""
            {...register("gender", { required: "Gender is required" })}
          >
            {genderOptions.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
