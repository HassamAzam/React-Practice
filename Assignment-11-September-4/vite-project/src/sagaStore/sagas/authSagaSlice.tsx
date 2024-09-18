import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Status from "src//Utilities/Enums";
import { LoginInterface } from "src/Utilities/interfaces";

interface AuthState {
  user: LoginInterface | null;
  status: Status;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: Status.Idle,
  error: null,
};

const authSagaSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      sessionStorage.removeItem("userEmail");
      state.status = Status.Idle;
    },
    loginSuccess(state, action: PayloadAction<LoginInterface>) {
      state.user = action.payload;
      state.status = Status.Success;
      sessionStorage.setItem("userEmail", action.payload.email); // Store user email
    },
    loginFailure(state) {
      state.status = Status.Failed;
      state.error = "Login failed";
    },
    loginRequest(state, _) {
      state.status = Status.Loading;
    },
  },
});

export const { logout, loginSuccess, loginFailure, loginRequest } =
  authSagaSlice.actions;
export default authSagaSlice.reducer;
