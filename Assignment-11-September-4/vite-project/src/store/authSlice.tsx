import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginInterface } from "../Utilities/interfaces";
import { BASE_URL } from "../Utilities/baseURL";

interface AuthState {
  user: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const authenticateUser = createAsyncThunk(
  "auth",
  async (credentials: loginInterface, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users?email=${credentials.email}`
      );
      if (response.data.length) {
        if (response.data[0].password === credentials.password) {
          sessionStorage.setItem("userEmail", JSON.stringify(response.data[0]));
          return response.data[0];
        }
      }
      return thunkAPI.rejectWithValue("Invalid credentials");
    } catch (error) {
      return thunkAPI.rejectWithValue("An error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      sessionStorage.removeItem("userEmail");
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
