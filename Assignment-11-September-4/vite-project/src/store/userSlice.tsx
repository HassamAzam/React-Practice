import { createSlice } from "@reduxjs/toolkit";

const loadUserFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem("userEmail");
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (e) {
    return null;
  }
};
const initialState = {
  value: loadUserFromSessionStorage(),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    sessionSetter: (state, action) => {
      state.value = action.payload;
    },
    sessionRemover: (state) => {
      state.value = {};
    },
  },
});
export default userSlice.reducer;
export const { sessionSetter, sessionRemover } = userSlice.actions;
