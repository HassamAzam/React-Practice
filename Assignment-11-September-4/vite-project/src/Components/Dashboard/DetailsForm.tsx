import { TextField, Box, Button, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import { SignUpInterface } from "src/Utilities/interfaces";
import { updateUser } from "src/store/updateSlice";
import { useAppDispatch, useAppSelector } from "src/store/store";

const DetailsForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value);

  const { handleSubmit, control } = useForm({
    defaultValues: user,
  });

  const onSubmit = async (data: SignUpInterface) => {
    await dispatch(updateUser(data));
    toast.success("Data Updated Successfully");
  };

  if (!user) {
    return <></>;
  }

  const fields = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email", disabled: true },
    { name: "password", label: "Password", type: "password" },
    { name: "maritalStatus", label: "Marital Status" },
    { name: "gender" , label: "Gender"}
  ];

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
        {fields.map(({ name, label, type, disabled }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={user[name]}
                label={label}
                variant="outlined"
                fullWidth
                type={type || "text"}
                disabled={disabled || false}
              />
            )}
          />
        ))}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default DetailsForm;
