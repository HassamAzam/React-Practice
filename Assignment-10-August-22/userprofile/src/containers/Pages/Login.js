import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { FormGroup, FormControl } from "@mui/material";

import { login } from "../../Store/authSlice";

import ButtonComponent from "../../Components/ButtonComponent";
import InputField from "../../Components/InputField";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userArray = useSelector((state) => state.userArray.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = userArray.find((user) => user.email === email);

    if (user) {
      if (user.password === password) {
        dispatch(login(user.email));
        toast.success("Login Successful");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Incorrect Password");
      }
    } else {
      toast.error("User Not Found!");
    }
  };

  return (
    <div className="LoginFormContainer">
      <h1>Login</h1>
      <FormGroup className="formFields">
        <FormControl>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <ButtonComponent
            label="Login"
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleLogin}
          />
        </FormControl>
        <FormControl>
          <Link to={"/signup"}>
            <ButtonComponent
              variant="contained"
              label="SignUp"
              type="submit"
              color="primary"
              onClick={() => navigate("signup")}
            />
          </Link>
        </FormControl>
      </FormGroup>
      <ToastContainer />
    </div>
  );
}
