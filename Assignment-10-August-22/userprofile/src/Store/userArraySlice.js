import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { selectUserEmail } from "./authSlice";

const loadUsersFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("userArray");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    return [];
  }
};

const saveUsersToLocalStorage = (users) => {
  try {
    const serializedState = JSON.stringify(users);
    localStorage.setItem("userArray", serializedState);
  } catch (e) {
    return null
  }
};

export const userArraySlice = createSlice({
  name: "userArray",
  initialState: {
    value: loadUsersFromLocalStorage(),
  },
  reducers: {
    addInArray: (state, action) => {
      state.value.push(action.payload);
      saveUsersToLocalStorage(state.value);
    },
    updateInArray: (state, action) => {
      const { email, updatedData } = action.payload;
      const index = state.value.findIndex((user) => user.email === email);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...updatedData };
        saveUsersToLocalStorage(state.value);
      }
    },
  },
});

export const selectUserArray = (state) => state.userArray.value;

export const selectLoggedInUser = createSelector(
  [selectUserArray, selectUserEmail],
  (userArray, userEmail) => userArray.find((user) => user.email === userEmail)
);

export const { addInArray, updateInArray } = userArraySlice.actions;

export default userArraySlice.reducer;
