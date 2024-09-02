import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { logout } from "../../Store/authSlice";
import { updateInArray } from "../../Store/userArraySlice";

import ButtonComponent from "../../Components/ButtonComponent";
import InputField from "../../Components/InputField";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmail = useSelector((state) => state.auth.userEmail);
  const userArray = useSelector((state) => state.userArray.value);

  const loggedInUser = userArray.find((user) => user.email === userEmail);

  const [editing, setEditing] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    country: Yup.string().required("Country is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: loggedInUser?.firstName || "",
      lastName: loggedInUser?.lastName || "",
      country: loggedInUser?.country || "",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleUpdate = (data) => {
    if (loggedInUser) {
      dispatch(
        updateInArray({
          email: loggedInUser.email,
          updatedData: {
            firstName: data.firstName,
            lastName: data.lastName,
            country: data.country,
          },
        })
      );
      setEditing(false);
    }
  };

  if (!userEmail) {
    navigate("/login");
    return null;
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
            <form onSubmit={handleSubmit(handleUpdate)}>
              <InputField
                label="First Name"
                name="firstName"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <InputField
                label="Last Name"
                name="lastName"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
              <InputField
                label="Country"
                name="country"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("country")}
                error={!!errors.country}
                helperText={errors.country?.message}
              />
              <ButtonComponent
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                label="Save"
              />
              <ButtonComponent
                variant="outlined"
                onClick={() => setEditing(false)}
                fullWidth
                label="Cancel"
              />
            </form>
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
