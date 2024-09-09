import { useForm, SubmitHandler } from "react-hook-form";
import { FormControl, Button, Box, TextField, Input, InputLabel, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch} from "../../store/store"; 
import { sessionSetter } from "../../store/userSlice";
import { sendVerificationEmail } from "../../store/loginThroughCodeSlice";

type FormValues = {
  email: string;
  message: string;
};

const ForgetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [showCodeBox, setCodeBox] = useState(false);
  const [code, setCode] = useState(0); 
  const [email, setEmail] = useState("");
  const [receivedCode, setReceivedCode] = useState<string>("");
  
  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    setCode(Math.floor(1000 + Math.random() * 9000)); 
  }, []);

  const codeVerifier = () => {
    if (code.toString() === receivedCode) {
      toast.success("Code Verified");
      dispatch(sessionSetter({ email }));
      navigate("/dashboard");
    } else {
      toast.error("Wrong Code");
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setEmail(data.email);
    
    const response = await dispatch(sendVerificationEmail({ email: data.email, code }));
    
    if (response.type === "auth/sendVerificationEmail/fulfilled") {
      toast.success("Verification code sent");
      setCodeBox(true); 
    } else {
      toast.error("Failed to send verification code");
    }
  };

  return (
    <>
    <Typography variant="h6"  sx={{ color: 'black' }}>
      Forget Password
    </Typography>
    <Box
  sx={{
    border: '1px solid black', 
    borderRadius: 2,            
    padding: 9,   
    backgroundColor: 'white'             
  }}>
      {!showCodeBox && (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <TextField label="Email" {...register("email")} type="email" />
          </FormControl>
          <br/>
          <br/>
          <Button type="submit" variant="contained">
            Send Code
          </Button>
        </Box>
      )}
      {showCodeBox && (
        <Box>
          <InputLabel>Enter Code here</InputLabel>
          <Input
            onChange={(e) => {
              setReceivedCode(e.target.value);
            }}
          />
          <Button onClick={codeVerifier}>Verify Code</Button>
        </Box>
      )}
    </Box>
    </>
  );
};

export default ForgetPassword;
