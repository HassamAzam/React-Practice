import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  userEmail: null, 
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userEmail = action.payload; 
    },
    logout: (state) => {
      state.userEmail = null; 
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
