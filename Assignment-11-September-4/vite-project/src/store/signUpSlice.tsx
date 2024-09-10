import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Utilities/baseURL";
import { signupInterface } from "../Utilities/interfaces";

interface SignUpState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SignUpState = {
  status: "idle",
  error: null,
};
export const signUp = createAsyncThunk(
  "user/signUp",
  async (user: signupInterface, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/users?email=${user.email}`);
      if (response.data.length > 0) {
      }

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          await axios.post(`${BASE_URL}/users`, user);
          return thunkAPI.fulfillWithValue("Success");
        } else {
          return thunkAPI.rejectWithValue("An error occurred during sign-up");
        }
      }

      return thunkAPI.rejectWithValue("An error occurred during sign-up");
    }
  }
);

const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState,
  reducers: {
    resetState: (state) => {
      (state.status = "idle"), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export const { resetState } = signUpSlice.actions;
export default signUpSlice.reducer;
