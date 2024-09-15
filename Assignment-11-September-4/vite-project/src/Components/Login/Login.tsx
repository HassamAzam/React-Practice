import { useEffect } from "react";

import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { authenticateUser } from "src/store/authSlice";
import { loginRequest } from "src/sagaStore/sagas/authSagaSlice";
import middleware from "src/settings";
import { sessionSetter } from "src/store/userSlice";
import setDocumentTitle from "src/Utilities/title";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Status from "src/Utilities/Enums";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector((state) => state.auth);
  const { register, handleSubmit } = useForm<FormValues>();
  useEffect(() => {
    if (status === Status.Success) {
      toast.success("Logged In");
      dispatch(sessionSetter(user));
      navigate("/dashboard");
    } else if (status === Status.Failed) {
      toast.error("Email or Password is wrong");
    }
  }, [status, user]);

  useEffect(() => {
    setDocumentTitle("Login");
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (middleware == "thunk") {
      dispatch(authenticateUser(data));
    } else {
      dispatch(loginRequest(data));
    }
  };
  const handleForgetPasswordClick = () => {
    navigate("/forgetPassword");
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
        Login
      </Typography>
      <br />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField label="Email" {...register("email")} type="email" />
        </FormControl>
        <br></br>
        <br></br>
        <FormControl>
          <TextField
            label="Password"
            {...register("password")}
            type="password"
          />
          <br></br>
          <Button type="submit" variant="contained" color="success">
            Login
          </Button>
          <br></br>
        </FormControl>
        <br></br>
        <Button
          color="primary"
          variant="contained"
          onClick={handleForgetPasswordClick}
        >
          Forget Password
        </Button>
      </Box>
      <br />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/signup")}
      >
        SignUp
      </Button>
    </Box>
  );
};
export default Login;
