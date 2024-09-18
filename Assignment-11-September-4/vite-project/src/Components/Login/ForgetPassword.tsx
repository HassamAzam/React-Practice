import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, FormControl, TextField, Typography } from '@mui/material';

import { isMiddleware } from 'src/settings';
import Status from 'src/Utilities/Enums';
import { sendVerificationEmail } from 'src/store/loginThroughCodeSlice';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import useDocumentTitle from 'src/Hooks/useDocumentTitle';
import { sendVerificationEmailRequest } from 'src/sagaStore/sagas/codeSagaSlice';

type FormValues = {
  email: string;
};

const ForgetPassword = () => {
  useDocumentTitle('Forget Password');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [requestSendFlag, setRequestSendFlag] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();
  const { status } = useAppSelector((state) => state.code);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (status === Status.Success) {
      toast.success('Details have been sent to your email');
      setRequestSendFlag(true);
      navigate('/login');
    } else if (status === Status.Failed) {
      toast.error('Failed to send details to your email');
    }
  }, [status]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (isMiddleware) {
      dispatch(sendVerificationEmail(data.email));
    } else {
      dispatch(sendVerificationEmailRequest({ email: data.email }));
    }
    // Disable the button and hide it after one click
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      setRequestSendFlag(true);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ color: 'black' }}>
        Forget Password
      </Typography>
      <Box
        sx={{
          border: '1px solid black',
          borderRadius: 2,
          padding: 9,
          backgroundColor: 'white',
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              {...register('email')}
              type="email"
              required
            />
          </FormControl>
          {!requestSendFlag && (
            <Button
              ref={buttonRef}
              type="submit"
              variant="contained"
              color="primary"
            >
              Send Details
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
