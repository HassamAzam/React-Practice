import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Status from "src/Utilities/Enums";

interface CodeState {
  status: Status;
  error: string | null;
}

const initialState: CodeState = {
  status: Status.Idle,
  error: null,
};

const codeSagaSlice = createSlice({
  name: "codeSagaSlice",
  initialState,
  reducers: {
    sendVerificationEmailRequest: (
      state,
      _: PayloadAction<{ email: string }>
    ) => {
      state.status = Status.Loading;
      state.error = null;
    },
    sendVerificationEmailSuccess: (state) => {
      state.status = Status.Loading;
      state.error = null;
    },
    sendVerificationEmailFailure: (state, action: PayloadAction<string>) => {
      state.status = Status.Failed;
      state.error = action.payload;
    },
  },
});

export const {
  sendVerificationEmailRequest,
  sendVerificationEmailSuccess,
  sendVerificationEmailFailure,
} = codeSagaSlice.actions;

export default codeSagaSlice.reducer;
