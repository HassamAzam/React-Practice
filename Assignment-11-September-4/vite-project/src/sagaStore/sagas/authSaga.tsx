import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { loginSuccess, loginFailure, loginRequest } from "./authSagaSlice";
import { loginInterface } from "../../Utilities/interfaces";
import { BASE_URL } from "../../Utilities/baseURL";

const authenticate = async (
  credentials: loginInterface
): Promise<AxiosResponse> => {
  return await axios.get(`${BASE_URL}/users?email=${credentials.email}`);
};

function* loginSaga(action: { type: string; payload: loginInterface }) {
  try {
    const response: AxiosResponse = yield call(authenticate, action.payload);
    const user = response.data[0];

    if (user.password === action.payload.password) {
      yield put(loginSuccess(user));
    } else {
      yield put(loginFailure());
    }
  } catch (error: any) {
    yield put(loginFailure());
  }
}

export default function* watchLoginSaga() {
  yield takeLatest(loginRequest.type, loginSaga);//listening to login Request
}
