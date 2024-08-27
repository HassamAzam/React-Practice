import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  const firstNameRef = useRef(loggedInUser?.firstName || "");
  const lastNameRef = useRef(loggedInUser?.lastName || "");
  const countryRef = useRef(loggedInUser?.country || "");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleUpdate = () => {
    if (loggedInUser) {
      dispatch(
        updateInArray({
          email: loggedInUser.email,
          updatedData: {
            firstName: firstNameRef.current,
            lastName: lastNameRef.current,
            country: countryRef.current,
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
          <>
            <Typography variant="h5" component="div" gutterBottom>
              Welcome, {loggedInUser?.firstName} {loggedInUser?.lastName}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {loggedInUser?.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Country: {loggedInUser?.country}
            </Typography>
          </>

          {editing ? (
            <Box>
              <InputField
                label="First Name"
                variant="outlined"
                margin="normal"
                fullWidth
                defaultValue={firstNameRef.current}
                onChange={(e) => (firstNameRef.current = e.target.value)}
              />
              <InputField
                label="Last Name"
                variant="outlined"
                margin="normal"
                fullWidth
                defaultValue={lastNameRef.current}
                onChange={(e) => (lastNameRef.current = e.target.value)}
              />
              <InputField
                label="Country"
                variant="outlined"
                margin="normal"
                fullWidth
                defaultValue={countryRef.current}
                onChange={(e) => (countryRef.current = e.target.value)}
              />
              <ButtonComponent
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                fullWidth
                label="Save"
              />

              <ButtonComponent
                variant="outlined"
                onClick={() => setEditing(false)}
                fullWidth
                label="Cancel"
              />
            </Box>
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
