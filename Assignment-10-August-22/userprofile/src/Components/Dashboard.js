import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { logout } from '../Store/authSlice';
import { updateInArray } from '../Store/userArraySlice';


export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userArray = useSelector((state) => state.userArray.value);

  const loggedInUser = userArray.find(user => user.email === userEmail);

  useEffect(() => {
    console.log('User Arrayon load:', userArray);
  }, [userArray]);
  

  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(loggedInUser?.firstName || '');
  const [lastName, setLastName] = useState(loggedInUser?.lastName || '');
  const [country, setCountry] = useState(loggedInUser?.country || '');

  const handleLogout = () => {
    console.log("User logged out")
    dispatch(logout());
    console.log("User logged out")
    navigate('/login');
  };

  const handleUpdate = () => {
    if (loggedInUser) {
      dispatch(updateInArray({
        email: loggedInUser.email,
        updatedData: {
          firstName,
          lastName,
          country
        }
      }));
      setEditing(false);
    }
  };

  if (!userEmail) {
    navigate('/login');
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 500, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Welcome, {loggedInUser.firstName} {loggedInUser.lastName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Email: {loggedInUser.email}
          </Typography>
          {editing ? (
            <Box>
              <TextField
                label="First Name"
                variant="outlined"
                margin="normal"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                margin="normal"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                label="Country"
                variant="outlined"
                margin="normal"
                fullWidth
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleUpdate} fullWidth>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditing(false)} fullWidth>
                Cancel
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="body1" color="text.secondary">
                Country: {loggedInUser?.country}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setEditing(true)} fullWidth>
                Edit
              </Button>
            </Box>
          )}
        </CardContent>
        <Button variant="contained" color="primary" onClick={handleLogout} fullWidth>
          Logout
        </Button>
      </Card>
    </Box>
  );
}
