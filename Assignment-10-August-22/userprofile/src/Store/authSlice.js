import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const loadUserFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem("userEmail");
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (e) {
    return null;
  }
};

const saveUserToSessionStorage = (userEmail) => {
  try {
    const serializedState = JSON.stringify(userEmail);
    sessionStorage.setItem("userEmail", serializedState);
  } catch (e) {
    return null;
  }
};

const clearSessionStorage = () => {
  try {
    sessionStorage.removeItem("userEmail");
  } catch (e) {
    return null;
  }
};

const initialState = {
  userEmail: loadUserFromSessionStorage(),
};

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    clearSessionStorage();
    dispatch(logout());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userEmail = action.payload;
      saveUserToSessionStorage(state.userEmail);
    },
    logout: (state) => {
      state.userEmail = null;
      clearSessionStorage();
    },
  },
});

export const selectUserEmail = (state) => state.auth.userEmail;
export const authStatus = loadUserFromSessionStorage;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
