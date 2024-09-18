import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { SignUpInterface } from 'src/Utilities/interfaces';
import Status from 'src/Utilities/Enums';

interface UpdateState {
  status: Status;
  error: string | null;
}

const initialState: UpdateState = {
  status: Status.Idle,
  error: null,
};

export const updateUser = createAsyncThunk(
  'updateUser',
  async (user: SignUpInterface, thunkAPI) => {
    try {
      const fetchResponse = await axios.get(`/users?email=${user.email}`);
      if (!fetchResponse.data.length) {
        return thunkAPI.rejectWithValue('User does not exist');
      }
      const fetchedUser = fetchResponse.data[0];
      await axios.put(`/users/${fetchedUser.id}`, user);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue('An error occurred during update');
    }
  },
);

const updateSlice = createSlice({
  name: 'updateSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = Status.Loading;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = Status.Success;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.payload as string;
      });
  },
});

export default updateSlice.reducer;
