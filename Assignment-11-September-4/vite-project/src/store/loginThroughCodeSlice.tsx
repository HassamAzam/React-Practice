import emailjs from "@emailjs/browser";
import axios, { AxiosResponse } from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { templateID, serviceID, emailToken } from "src/settings";
import Status from "src/Utilities/Enums";
import { LoginInterface } from "src/Utilities/interfaces";

const checkUserExists = async (email: string): Promise<LoginInterface> => {
  try {
    const response: AxiosResponse = await axios.get(
      `users?email=${email}`
    );
    return response.data[0] || null;
  } catch (error) {
    throw new Error("Failed to check user existence");
  }
};

export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const user = await checkUserExists(email);

      if (!user) {
        return rejectWithValue("User does not exist");
      }

      const emailParams = {
        to_name: email,
        from_name: "SurveyCopsTeam",
        message: `Your user details: ${JSON.stringify(user)}`,
      };

      await emailjs.send(serviceID, templateID, emailParams, emailToken);

      return { message: "Verification email sent successfully" };
    } catch (error) {
      return rejectWithValue("Failed to send verification email");
    }
  }
);

const codeSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendVerificationEmail.fulfilled, (state) => {
        state.status = Status.Success;
      })
      .addCase(sendVerificationEmail.rejected, (state) => {
        state.status = Status.Failed;
      })
      .addCase(sendVerificationEmail.pending, (state) => {
        state.status = Status.Loading;
      });
  },
});

export default codeSlice.reducer;
