import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { sendVerificationEmail } from "../../store/loginThroughCodeSlice";

import { FormControl, Button, Box, TextField, Typography } from "@mui/material";

type FormValues = {
  email: string;
};

const ForgetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();
  const { status } = useAppSelector((state) => state.code);

  useEffect(() => {
    if (status === "success") {
      toast.success("Details have been sent to your email");
      navigate("/login");
    } else if (status === "failed") {
      toast.error("Failed to send details to your email");
    }
  }, [status, navigate]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await dispatch(sendVerificationEmail(data.email));
  };

  return (
    <>
      <Typography variant="h6" sx={{ color: "black" }}>
        Forget Password
      </Typography>
      <Box
        sx={{
          border: "1px solid black",
          borderRadius: 2,
          padding: 9,
          backgroundColor: "white",
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              {...register("email")}
              type="email"
              required
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Send Details
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
