import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Modal, FormGroup, FormControl } from "@mui/material";
import SelectCountry from "../../Components/SelectCountry";
import InputField from "../../Components/InputField";
import ButtonComponent from "../../Components/ButtonComponent";
import { addInArray } from "../../Store/userArraySlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object({
  firstName: Yup.string('Enter a string').required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  country: Yup.string().required("Country is required"),
});

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userArray = useSelector((state) => state.userArray.value);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "America",
  };

  const handleClose = () => {
    navigate("/login");
  };

  const checkIfUserExists = (email) => {
    return userArray.some((user) => user.email === email);
  };

  const handleSubmit = (values) => {
    if (checkIfUserExists(values.email)) {
      toast.error("User Already Exists");
    } else {
      dispatch(addInArray(values));
      navigate("/login");
    }
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="registration-form"
        aria-describedby="registration-form-description"
      >
        <div className="formContainer">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="form">
                <FormGroup className="formFields">
                  <FormControl>
                    <Field
                      name="firstName"
                      as={InputField}
                      label="First Name"
                      error={touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </FormControl>
                  <FormControl>
                    <Field
                      name="lastName"
                      as={InputField}
                      label="Last Name"
                      error={touched.lastName && !!errors.lastName}
                    />
                  </FormControl>
                  <FormControl>
                    <Field
                      name="email"
                      as={InputField}
                      label="Email"
                      type="email"
                      error={touched.email && !!errors.email}
                      helperText={touched.email  &&errors.email}
                    />
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
                  </FormControl>
                  <FormControl fullWidth>
                    <Field
                      name="country"
                      as={SelectCountry}
                      label="Country"
                      error={touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                    />
                  </FormControl>
                  <FormControl>
                    <ButtonComponent
                      variant="contained"
                      color="secondary"
                      type="submit"
                      label="Submit"
                    />
                  </FormControl>
                  <FormControl>
                    <ButtonComponent
                      variant="outlined"
                      color="secondary"
                      onClick={handleClose}
                      label="Close"
                    />
                  </FormControl>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
