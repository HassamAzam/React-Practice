import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import signUpSlice from "./signUpSlice"
import updateSlice from "./updateSlice"
import authSlice from "./authSlice"
import { useSelector,useDispatch } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";
const combineReducer= combineReducers({
  user: userSlice,
  signUp: signUpSlice, 
  update:updateSlice,
  auth:authSlice
})
export const store = configureStore({
  
  reducer:combineReducer,
  

});
export default store;
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
