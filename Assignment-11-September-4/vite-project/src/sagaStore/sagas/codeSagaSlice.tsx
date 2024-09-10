import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CodeState {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState: CodeState = {
  status: "idle",
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
      state.status = "loading";
      state.error = null;
    },
    sendVerificationEmailSuccess: (state) => {
      state.status = "success";
      state.error = null;
    },
    sendVerificationEmailFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
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
