import { useForm, SubmitHandler } from "react-hook-form";
import {
  FormControl,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Typography
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { signUp } from "../../store/signUpSlice";

export type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  maritalStatus: string;
};

export default function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const signUpResponse = await dispatch(signUp(data));
    console.log(signUpResponse)
    if (signUpResponse.type=='user/signUp/fulfilled') {
      toast.success("Signed Up!");
      navigate("/login");
    } else {
     
      toast.error("Something Went wrong");
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
      <br/>
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
            {...register("maritalStatus", { required: "Marital Status is required" })}
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
