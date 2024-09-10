import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const authSagaSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      sessionStorage.removeItem("userEmail");
      state.status = "idle";
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.status = "succeeded";
      sessionStorage.setItem("userEmail", action.payload.email); // Store user email
    },
    loginFailure(state) {
      state.status = "failed";
      state.error = "Login failed";
    },
    loginRequest(state, _) {
      state.status = "loading";
    },
  },
});

export const { logout, loginSuccess, loginFailure, loginRequest } =
  authSagaSlice.actions;
export default authSagaSlice.reducer;
