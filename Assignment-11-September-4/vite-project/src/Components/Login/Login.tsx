import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch} from "react-redux";
import { sessionSetter } from "../../store/userSlice";
import { FormControl, Button, Box, TextField } from "@mui/material";
import authenticator from "./authenticator";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response= await authenticator(data)
    if (response) {
      toast.success("Logged In");
      dispatch(sessionSetter(response))
      navigate("/dashboard");
    } else {
      toast.error("Email or Password is wrong");
    }
  };
  const  handleForgetPasswordClick = () => {
    navigate('/forgetPassword')
  }

  return (
    <Box>
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
          <Button type="submit" variant="contained">
            Login
          </Button>
          <br></br>
        </FormControl>
        <br></br>
        <Button color="primary" variant="contained" onClick={handleForgetPasswordClick}>Forget Password</Button>
      </Box>
      <ToastContainer />
    </Box>
  );
}
