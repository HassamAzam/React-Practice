import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { logout } from "../../store/authSlice";
import { updateInArray } from "../../store/userArraySlice";

import ButtonComponent from "../../Components/ButtonComponent";
import InputField from "../../Components/InputField";
import setDocumentTitle from "./Title";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get the most recent userEmail state to check if the user is logged in and which user is logged in
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userArray = useSelector((state) => state.userArray.value);

  const loggedInUser = userArray.find((user) => user.email === userEmail);

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setDocumentTitle("Dashboard");
  }, []);

  const initialValues = {
    firstName: loggedInUser?.firstName || "",
    lastName: loggedInUser?.lastName || "",
    country: loggedInUser?.country || "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    country: Yup.string().required("Country is required"),
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleUpdate = (values) => {
    if (loggedInUser) {
      dispatch(
        updateInArray({
          email: loggedInUser.email,
          updatedData: {
            firstName: values.firstName,
            lastName: values.lastName,
            country: values.country,
          },
        })
      );
      setEditing(false);
    }
  };

  if (!userEmail) {
    navigate("/login");
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
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
