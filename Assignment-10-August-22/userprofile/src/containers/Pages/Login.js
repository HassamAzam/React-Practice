import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { FormGroup, FormControl } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { login } from "../../store/authSlice";
import ButtonComponent from "../../Components/ButtonComponent";
import InputField from "../../Components/InputField";
import setDocumentTitle from "./Title";
import { selectUserArray } from "../../store/userArraySlice";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const userArray = useSelector(selectUserArray);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setDocumentTitle("Login");
  }, []);

  const handleLogin = (values) => {
    const user = userArray.find((user) => user.email === values.email);

    if (user) {
      if (user?.password === values?.password) {
        dispatch(login(user.email));
        toast.success("Login Successful");

        navigate("/dashboard");
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
      <form onSubmit={handleSubmit(handleLogin)} className="formFields">
        <FormGroup>
          <FormControl>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <br />
          </FormControl>
          <FormControl>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <br />
          </FormControl>
          <FormControl>
            <ButtonComponent
              label="Login"
              type="submit"
              color="primary"
              variant="contained"
            />
            <br />
          </FormControl>
          <FormControl>
            <Link to={"/signup"}>
              <ButtonComponent
                variant="contained"
                label="Sign Up"
                type="button"
                color="primary"
              />
            </Link>
          </FormControl>
        </FormGroup>
      </form>
      <ToastContainer />
    </div>
  );
}
