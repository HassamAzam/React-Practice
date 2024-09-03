import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { logoutThunk } from "../../store/authSlice";
import { updateInArray, selectLoggedInUser } from "../../store/userArraySlice";
import { selectUserArray } from "../../store/userArraySlice";

import ButtonComponent from "../../Components/ButtonComponent";
import InputField from "../../Components/InputField";
import setDocumentTitle from "./util/titleSetter";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = useSelector(selectLoggedInUser);
  const userArray = useSelector(selectUserArray);

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setDocumentTitle("Dashboard");
  }, []);

  const initialValues = {
    firstName: loggedInUser?.firstName || "",
    lastName: loggedInUser?.lastName || "",
    country: loggedInUser?.country || "",
    email: loggedInUser?.email || "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    country: Yup.string().required("Country is required"),
    email: Yup.string().email("Please enter a valid email").required(),
  });

  const handleLogout = async () => {
    await dispatch(logoutThunk()).unwrap();
    navigate("/login");
  };

  const checkExistence = (userArray, email) =>
    userArray.some((user) => user.email === email);

  const handleUpdate = (values) => {
    if (loggedInUser) {
      if (
        values.email !== loggedInUser.email &&
        checkExistence(userArray, values.email)
      ) {
        toast.error("Email already in use");
        setEditing(false);
        return;
      }
      dispatch(
        updateInArray({
          email: loggedInUser.email,
          updatedData: {
            firstName: values.firstName,
            lastName: values.lastName,
            country: values.country,
            email: values.email,
          },
        })
      );
      setEditing(false);
    }
  };

  if (!loggedInUser?.email) {
    navigate("/login");
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <ToastContainer />
      <Card sx={{ maxWidth: 500, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Welcome, {loggedInUser?.firstName} {loggedInUser?.lastName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Email: {loggedInUser?.email}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Country: {loggedInUser?.country}
          </Typography>

          {editing ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Form>
                  <InputField
                    label="First Name"
                    name="firstName"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={values.firstName}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={values.lastName}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Email"
                    name="email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Country"
                    name="country"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={values.country}
                    onChange={handleChange}
                  />
                  <ButtonComponent
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                    label="Save"
                  />
                  <ButtonComponent
                    variant="outlined"
                    onClick={() => setEditing(false)}
                    fullWidth
                    label="Cancel"
                  />
                </Form>
              )}
            </Formik>
          ) : (
            <Box>
              <ButtonComponent
                variant="contained"
                color="primary"
                onClick={() => setEditing(true)}
                fullWidth
                label="Edit"
              />
            </Box>
          )}
        </CardContent>
        <ButtonComponent
          variant="contained"
          color="primary"
          onClick={handleLogout}
          fullWidth
          label="Logout"
        />
      </Card>
    </Box>
  );
}
