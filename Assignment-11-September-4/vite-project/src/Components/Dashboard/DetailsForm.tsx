import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import { TextField, Button, Box, Typography } from "@mui/material";

import { signupInterface } from "../../Utilities/interfaces";
import { updateUser } from "../../store/updateSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function DetailsForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value);

  const { handleSubmit, control } = useForm({
    defaultValues: user,
  });

  const onSubmit = async (data: signupInterface) => {
    await dispatch(updateUser(data));
    toast.success("Data Update Successfully");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" sx={{ color: "black" }}>
        Update Details
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          border: "1px solid black",
          flexDirection: "column",
          gap: 2,
          width: 200,
          margin: "auto",
        }}
      >
        <br /> <br />
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={user.firstName}
              label="First Name"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={user.lastName}
              label="Last Name"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              placeholder={user.email}
              variant="outlined"
              disabled
              fullWidth
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              placeholder={user.password}
              type="password"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="maritalStatus"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={user.maritalStatus}
              label="Marital Status"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </>
  );
}
