import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import { useSelector, useDispatch } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";
import authSagaSlice from "./authSagaSlice";
import userSlice from "../../store/userSlice";
import signUpSagaSlice from "./signUpSagaSlice";
import codeSagaSlice from "./codeSagaSlice";
import { rootSaga } from "./rootSaga";
const sagaMiddleware = createSagaMiddleware();
const combineReducer = combineReducers({
  auth: authSagaSlice,
  user: userSlice,
  signUp: signUpSagaSlice,
  code: codeSagaSlice,
});
export const sagaStore = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  reducer: combineReducer,
});
sagaMiddleware.run(rootSaga);
export default sagaStore;
type RootState = ReturnType<typeof sagaStore.getState>;
type AppDispatch = typeof sagaStore.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
