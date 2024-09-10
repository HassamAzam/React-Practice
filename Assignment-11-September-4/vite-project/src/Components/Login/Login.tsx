import { useForm, SubmitHandler } from "react-hook-form";
import { sessionSetter } from "../../store/userSlice";
import { FormControl, Button, Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { loginRequest } from "../../sagaStore/sagas/authSagaSlice";
import { authenticateUser } from "../../store/authSlice";
type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector((state) => state.auth);
  const { register, handleSubmit } = useForm<FormValues>();
  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Logged In");
      dispatch(sessionSetter(user));
      navigate("/dashboard");
    } else if (status === "failed") {
      toast.error("Email or Password is wrong");
    }
  }, [status, user]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (import.meta.env.VITE_MIDDLEWARE == "thunk") {
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
}
