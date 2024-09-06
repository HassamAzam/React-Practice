import { useForm, SubmitHandler } from "react-hook-form";
import { FormControl, Button, Box, TextField } from "@mui/material";
import authenticator from "../Utilities/authenticator";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (await authenticator(data))
        {
            toast.success("Logged In")
            
        }
        else {
            toast.error("Email or Password is wrong")
        }
    
  };
    
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
          <Button type="submit" variant="contained">Login</Button>
          <br></br>
        </FormControl>
        <br></br>
        <Button color="secondary">Forget Password</Button>
          </Box>
          <ToastContainer/>
      </Box>
  );
}
