import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Utilities/baseURL";
import { signupInterface } from "../Utilities/interfaces";

interface UpdateState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UpdateState = {
  status: 'idle',
  error: null,
};

export const updateUser = createAsyncThunk(
  'updateUser',
  async (user: signupInterface, thunkAPI) => {
    try {
      const fetchResponse = await axios.get(`${BASE_URL}/users?email=${user.email}`);
      if (!fetchResponse.data.length) {
        return thunkAPI.rejectWithValue('User does not exist');
      }
      const fetchedUser = fetchResponse.data[0];
      await axios.put(`${BASE_URL}/users/${fetchedUser.id}`, user);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue('An error occurred during update');
    }
  }
);

const updateSlice = createSlice({
  name: 'updateSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
        
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default updateSlice.reducer;
