import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoginInterface, SignUpInterface } from 'src/Utilities/interfaces';
import Status from 'src/Utilities/Enums';

interface AuthState {
  user: SignUpInterface | null;
  status: Status;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: Status.Idle,
  error: null,
};

export const authenticateUser = createAsyncThunk(
  'auth',
  async (credentials: LoginInterface, thunkAPI) => {
    try {
      const response = await axios.get(`users?email=${credentials.email}`);
      if (response.data.length) {
        if (response.data[0].password === credentials.password) {
          sessionStorage.setItem('userEmail', JSON.stringify(response.data[0]));
          return response.data[0];
        }
      }
      return thunkAPI.rejectWithValue('Invalid credentials');
    } catch (error) {
      return thunkAPI.rejectWithValue('An error occurred');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      sessionStorage.removeItem('userEmail');
      state.status = Status.Idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
