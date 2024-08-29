import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { FormGroup, FormControl } from "@mui/material";

import { login } from "../../Store/authSlice";

import ButtonComponent from "../../Components/ButtonComponent";
import InputField from "../../Components/InputField";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Login() {
  const userArray = useSelector((state) => state.userArray.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = (values) => {
    const user = userArray.find((user) => user.email === values.email);

    if (user) {
      if (user.password === values.password) {
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form className="formFields">
            <FormGroup>
              <FormControl>
                <Field
                  name="email"
                  as={InputField}
                  label="Email"
                  type="email"
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <br/>
              </FormControl>
              <FormControl>
                <Field
                  name="password"
                  as={InputField}
                  label="Password"
                  type="password"
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                <br/>
              </FormControl>
              <FormControl>
                <ButtonComponent
                  label="Login"
                  type="submit"
                  color="primary"
                  variant="contained"
                />
                <br/>
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
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}
