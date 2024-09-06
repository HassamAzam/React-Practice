import { useForm, SubmitHandler } from "react-hook-form";
import {
  FormControl,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import signUpUtility from "../Utilities/signupUtility";

export type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  maritalStatus: string;
};
export default function SignUp() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const signUpResponse=await signUpUtility(data)
    if (signUpResponse)
    {
      toast.success("Signed Up!")
    }
    else {
      toast.error("User with this email already exist !")
    }
  };
  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField
            label="First Name"
            {...register("firstName")}
            type="string"
          />
        </FormControl>
        <br />
        <br/>
        <FormControl>
          <TextField
            label="Last Name"
            {...register("lastName")}
            type="string"
          />
        </FormControl>
        <br />
        <br/>
        <FormControl>
          <TextField label="Email" type="email" {...register("email")} />
        </FormControl>
        <br />
        <br/>
        <FormControl>
          <TextField
            label="Password"
            type="password"
            {...register("password")}
          />
        </FormControl>
        <br />
        <br/>
        <FormControl fullWidth>
        <InputLabel id="marital-status-label">Marital Status</InputLabel>
        <Select
          labelId="marital-status-label"
          label="Marital Status"
          defaultValue="" // You can set a default value here
          {...register("maritalStatus", { required: true })}
        >
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Engaged">Engaged</MenuItem>
        </Select>
      </FormControl>
        <br/><br/>
        <Button type="submit" variant="contained">SignUp</Button>
        
      </Box>
      <ToastContainer />
    </Box>
  );
}
