import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SignUpInterface } from "src/Utilities/interfaces";
import Status from "src/Utilities/Enums";

interface SignUpState {
  status: Status;
  error: string | null;
}

const initialState: SignUpState = {
  status: Status.Idle,
  error: null,
};
export const signUp = createAsyncThunk(
  "user/signUp",
  async (user: SignUpInterface, thunkAPI) => {
    try {
      const response = await axios.get(`users?email=${user.email}`);
      if (response.data.length > 0) {
      }
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === Status.NotFound) {
          await axios.post(`/users`, user);
          return thunkAPI.fulfillWithValue("Success");
        } else {
          return thunkAPI.rejectWithValue("An error occurred during sign-up");
        }
      }

      return thunkAPI.rejectWithValue("An error occurred during sign-up");
    }
  },
);

const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState,
  reducers: {
    resetState: (state) => {
      (state.status = Status.Idle), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = Status.Loading;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = Status.Success;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.payload as string;
      });
  },
});
export const { resetState } = signUpSlice.actions;
export default signUpSlice.reducer;
