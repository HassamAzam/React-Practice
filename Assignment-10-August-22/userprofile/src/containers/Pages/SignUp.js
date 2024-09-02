import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Modal, FormGroup, FormControl } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import SelectCountry from "../../Components/SelectCountry";
import InputField from "../../Components/InputField";
import ButtonComponent from "../../Components/ButtonComponent";
import { addInArray } from "../../Store/userArraySlice";

const validationSchema = Yup.object({
  firstName: Yup.string("Enter a string").required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  country: Yup.string().required("Country is required"),
});

const SignUp =()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userArray = useSelector((state) => state.userArray.value);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: "",
    },
  });

  const handleClose = () => {
    navigate("/login");
  };

  const checkIfUserExists = (email) => {
    return userArray.some((user) => user.email === email);
  };

  const onSubmit = (values) => {
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
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <FormGroup className="formFields">
              <FormControl>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="First Name"
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="Last Name"
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="Email"
                      type="email"
                      helperText={errors.email?.message}
                    />
                  )}
                />
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
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <SelectCountry
                      {...field}
                      label="Country"
                      error={!!errors.country}
                      helperText={errors.country?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <ButtonComponent
                  variant="contained"
                  color="secondary"
                  type="submit"
                  label="Submit"
                  disabled={isSubmitting}
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
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
