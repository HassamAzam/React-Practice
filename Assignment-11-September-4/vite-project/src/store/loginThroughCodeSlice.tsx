import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { BASE_URL } from "../Utilities/baseURL";
import { AxiosResponse } from "axios";

const checkUserExists = async (email: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/users?email=${email}`
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

const codeSlice = createSlice({
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

export default codeSlice.reducer;
