import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";

import authSlice from "./authSlice";
import codeSlice from "./loginThroughCodeSlice";
import signUpSlice from "./signUpSlice";
import updateSlice from "./updateSlice";
import userSlice from "./userSlice";

const combineReducer = combineReducers({
  user: userSlice,
  signUp: signUpSlice,
  update: updateSlice,
  auth: authSlice,
  code: codeSlice,
});
export const store = configureStore({
  reducer: combineReducer,
});
export default store;
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
