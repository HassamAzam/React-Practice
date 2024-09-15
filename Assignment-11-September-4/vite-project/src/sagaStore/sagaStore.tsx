import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import { useDispatch, useSelector } from "react-redux";

import authSagaSlice from "src/sagaStore/sagas/authSagaSlice";
import codeSagaSlice from "src/sagaStore/sagas/codeSagaSlice";
import signUpSagaSlice from "src/sagaStore/sagas/signUpSagaSlice";
import userSlice from "src/store/userSlice";
import { rootSaga } from "src/sagaStore/sagas/rootSaga";

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
