import { useForm, SubmitHandler } from "react-hook-form";
import { sessionSetter } from "../../store/userSlice";
import { FormControl, Button, Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../../store/store";
import { authenticateUser } from "../../store/authSlice";
import { Typography } from "@mui/material";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await dispatch(authenticateUser(data));
    if (response.type == "auth/fulfilled") {
      toast.success("Logged In");
      dispatch(sessionSetter(response.payload));
      navigate("/dashboard");
    } else {
      toast.error("Email or Password is wrong");
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
      <br/>
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
