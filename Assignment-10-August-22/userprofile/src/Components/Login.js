import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";

import { login } from '../Store/authSlice';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userArray = useSelector((state) => state.userArray.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = userArray.find(user => user.email === email);
    
    if (user) {
      if (user.password === password) {
        dispatch(login(user.email));
        toast.success("Login Successful");
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        toast.error("Incorrect Password");
      }
    } else {
      toast.error("User Not Found!");
    }
  };

  return (
    <div className='LoginFormContainer'>
      <h1>Login</h1>
      <FormGroup className="formFields">
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </FormControl>
        <FormControl>
          <Button 
            variant="contained" 
            onClick={handleLogin}
          >
            Login
          </Button>
        </FormControl>
        <FormControl>
          <Link to={"/signup"}>  
            <Button 
              variant="contained" 
              onClick={() => navigate("signup")}
            >
              SignUp
            </Button>
          </Link>
        </FormControl>
      </FormGroup>
      <ToastContainer/>
    </div>
  );
}
