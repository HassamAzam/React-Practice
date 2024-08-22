import { FormGroup,FormControl,InputLabel,Input,Button } from '@mui/material'
import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate=useNavigate();
    
  return (
    <div className='LoginFormContainer '>
    <h1>Login</h1>
      <FormGroup className="formFields">
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input />
              </FormControl>
              <FormControl>
                <InputLabel>Password</InputLabel>
                <Input type="password" />
              </FormControl>
              <FormControl>
                <Button  variant="contained">Login</Button>
              </FormControl>
              <FormControl>
              <Link to={"/signup"}>  <Button  variant="contained" onClick={() => navigate("signup")}>SignUp</Button></Link>
              </FormControl>
            </FormGroup>
    </div>
  )
}
