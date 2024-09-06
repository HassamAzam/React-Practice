import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { signupInterface } from "../../Utilities/interfaces";
import updateUtility from "./updateUtility";

interface stateInterface {
    user: {
      value:signupInterface
  };
}

export default function DetailsForm() {
  const user = useSelector((state: stateInterface) => state.user.value);
  console.log("user in details form is: ", user);
  const { handleSubmit, control } = useForm({
    defaultValues: user,
  });
  const onSubmit = (data: signupInterface) => {
      updateUtility(data);
  };
    if (!user)
    {
        return
    }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
      }}
    >
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
            <TextField {...field} label="Email"
        placeholder={user.email}

                variant="outlined" fullWidth />
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
  );
}
