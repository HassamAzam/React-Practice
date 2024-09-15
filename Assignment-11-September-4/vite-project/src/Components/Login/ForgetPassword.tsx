import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import middleware from "src/settings";
import setDocumentTitle from "src/Utilities/title";
import Status from "src/Utilities/Enums";
import { sendVerificationEmail } from "src/store/loginThroughCodeSlice";
import { useAppDispatch, useAppSelector } from "src/store/store";
import { sendVerificationEmailRequest } from "src/sagaStore/sagas/codeSagaSlice";

type FormValues = {
  email: string;
};

const ForgetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();
  const { status } = useAppSelector((state) => state.code);

  useEffect(() => {
    if (status === Status.Success) {
      toast.success("Details have been sent to your email");
      navigate("/login");
    } else if (status === "failed") {
      toast.error("Failed to send details to your email");
    }
  }, [status]);
  useEffect(() => {
    setDocumentTitle("Forget Password");
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (middleware === "thunk") {
      dispatch(sendVerificationEmail(data.email));
    } else {
      dispatch(sendVerificationEmailRequest({ email: data.email }));
    }
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
