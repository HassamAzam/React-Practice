import { createSlice } from "@reduxjs/toolkit";

export const userArraySlice = createSlice({
  name: "userArray",
  initialState: {
    value: [],
  },
  reducers: {
    addInArray: (state, action) => {
      state.value.push(action.payload);
    },
    updateInArray: (state, action) => {
      const { email, updatedData } = action.payload;
      const index = state.value.findIndex((user) => user.email === email);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...updatedData };
      }
    },
  },
});

export const { addInArray, updateInArray } = userArraySlice.actions;
export default userArraySlice.reducer;
