import axios, { AxiosResponse } from "axios";

import { call, put, takeLatest } from "redux-saga/effects";

import { LoginInterface } from "src/Utilities/interfaces";
import { loginFailure, loginRequest, loginSuccess } from "./authSagaSlice";

const authenticate = async (
  credentials: LoginInterface
): Promise<AxiosResponse> => {
  return await axios.get(`users?email=${credentials.email}`);
};

function* loginSaga({ payload }: { type: string; payload: LoginInterface }) {
  try {
    const response: AxiosResponse = yield call(authenticate, payload);
    const user = response.data[0];

    if (user.password === payload.password) {
      yield put(loginSuccess(user));
    } else {
      yield put(loginFailure());
    }
  }
  catch (error) {
    yield put(loginFailure());
  }
}

export default function* watchLoginSaga() {
  yield takeLatest(loginRequest.type, loginSaga); //listening to login Request
}
