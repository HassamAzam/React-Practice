import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Status from "src/Utilities/Enums";

interface SignUpState {
  status: Status;
  error: string | null;
}

const initialState: SignUpState = {
  status: Status.Idle,
  error: null,
};

const signUpSagaSlice = createSlice({
  name: "signUpSaga",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = Status.Idle;
      state.error = null;
    },
    signUpSuccess: (state) => {
      state.status = Status.Success;
      state.error = null;
    },
    signUpFailure: (state, action: PayloadAction<{ message: string }>) => {
      state.status = Status.Failed;
      state.error = action.payload.message;
    },
    signUpRequest: (state, _) => {
      state.status = Status.Loading;
    },
  },
});

export const { resetState, signUpSuccess, signUpFailure, signUpRequest } =
  signUpSagaSlice.actions;
export default signUpSagaSlice.reducer;
