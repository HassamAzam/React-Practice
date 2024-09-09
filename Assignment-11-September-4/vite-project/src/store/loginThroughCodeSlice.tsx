import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { BASE_URL } from "../Utilities/baseURL";
import { AxiosResponse } from "axios";

const checkUserExists = async (email: string): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/users?email=${email}`
    );

    return response.data.exists;
  } catch (error) {
    throw new Error("Failed to check user existence");
  }
};

export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async (
    { email, code }: { email: string; code: number },
    { rejectWithValue }
  ) => {
    try {
      const userExists = await checkUserExists(email);

      if (!userExists) {
        return rejectWithValue("User does not exist");
      }

      const emailParams = {
        to_name: email,
        from_name: "SurveyCopsTeam",
        message: `Your verification code is: ${code}`,
      };

      await emailjs.send(
        "service_hy6uao9",
        "template_310losc",
        emailParams,
        "IZwPmNZdJoi2j0ttx"
      );

      return { message: "Verification email sent successfully" };
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to send verification email"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendVerificationEmail.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(sendVerificationEmail.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(sendVerificationEmail.pending, (state) => {
        state.status = "loading";
      });
  },
});

export default authSlice.reducer;
