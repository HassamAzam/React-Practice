import { useForm, SubmitHandler } from "react-hook-form";
import {
  FormControl,
  Button,
  Box,
  TextField,
  Input,
  InputLabel,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import loginThroughCode from "../Utilities/getUser";

type FormValues = {
  email: string;
  message: string;
};

const ForgetPassword: React.FC = () => {
  const [showCodeBox, setCodeBox] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();
  const [code, setCode] = useState(0);
  const [email,setEmail]=useState('')
  const [receivedCode, setReceivedCode] = useState<string>();
  const codeVerifier = () => {
    console.log(code);
    console.log(receivedCode);
    if (code.toString() == receivedCode) {
      toast.success("code Verified");
      loginThroughCode(email)
      
    } else {
      toast.error("Wrong Code");
    }
  };
  useEffect(() => {
    setCode(Math.floor(1000 + Math.random() * 9000));
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setEmail(data.email);
    if (data.email) {
      const emailParams = {
        to_name: data.email,
        from_name: "SurveyCopsTeam",
        message: `Your verification code is: ${code}`,
      };

      emailjs
        .send(
          "service_hy6uao9",
          "template_310losc",
          emailParams,
          "IZwPmNZdJoi2j0ttx"
        )
        .then(() => {
          toast.success("Email Sent");
          setCodeBox(true);
        })
        .catch((error) => {
          toast.error("Some error occurred");
          console.log(error);
        });
    }
  };

  return (
    <>
      {!showCodeBox && (
        <Box>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <TextField label="Email" {...register("email")} type="email" />
            </FormControl>
            <br></br>
            <br></br>
            <Button type="submit" variant="contained">
              Send Code
            </Button>
            <br></br>
          </Box>
          <ToastContainer />
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
          <ToastContainer/>
        </Box>
      )}
    </>
  );
};

export default ForgetPassword;
