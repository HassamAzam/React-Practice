import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SignUpState = {
  status: "idle",
  error: null,
};

const signUpSagaSlice = createSlice({
  name: "signUpSaga",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = "idle";
      state.error = null;
    },
    signUpSuccess: (state) => {
      state.status = "succeeded";
      state.error = null;
    },
    signUpFailure: (state, action: PayloadAction<{ message: string }>) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    signUpRequest: (state) => {
      state.status = "loading";
    },
  },
});

export const { resetState, signUpSuccess, signUpFailure, signUpRequest } =
  signUpSagaSlice.actions;
export default signUpSagaSlice.reducer;
