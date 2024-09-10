import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import {
  FormControl,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../store/store";
import { signUp, resetState } from "../../store/signUpSlice";
import { useAppSelector } from "../../store/store";
import { signupInterface } from "../../Utilities/interfaces";

export default function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<signupInterface>();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.signUp);

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Signed Up!");
      navigate("/login");
    } else if (status === "failed") {
      toast.error("Something went wrong");
    }

    return () => {
      dispatch(resetState());
    };
  }, [status]);

  const onSubmit: SubmitHandler<signupInterface> = async (data) => {
    try {
      await dispatch(signUp(data)).unwrap(); // Unwrap to handle potential errors
    } catch (error) {
      console.error("Error during sign-up:", error);
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
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
