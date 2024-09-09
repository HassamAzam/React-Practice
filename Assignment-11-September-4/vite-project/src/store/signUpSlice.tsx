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
  "signUp",
  async (user: signupInterface, thunkAPI) => {
    try {
      const returnObject = await axios.get(
        `${BASE_URL}/users?email=${user.email}`
      );
      if (returnObject.data.length) {
        return thunkAPI.rejectWithValue("User already exists");
      }

      await axios.post(`${BASE_URL}/users`, user);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue("An error occurred during sign-up");
    }
  }
);

const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState,
  reducers: {},
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

export default signUpSlice.reducer;
