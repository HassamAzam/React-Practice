import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { signUpFailure, signUpSuccess, signUpRequest } from "./signUpSagaSlice";
import { signupInterface } from "../../Utilities/interfaces";
import { BASE_URL } from "../../Utilities/baseURL";

const checkIfExist = async (user: signupInterface): Promise<AxiosResponse> => {
  return await axios.get(`${BASE_URL}/users?email=${user.email}`);
};

const signUp = async (user: signupInterface): Promise<AxiosResponse> => {
  return await axios.post(`${BASE_URL}/users`, user);
};
function* signUpSaga(action: { type: string; payload: signupInterface }) {
  try {
    const response: AxiosResponse = yield call(checkIfExist, action.payload);
    if (response.data.length > 0) {
      yield put(signUpFailure({ message: "fail" }));
    }
  } catch (error: any) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 404
    ) {
      const response: AxiosResponse = yield call(signUp, action.payload);

      if (axios.isAxiosError(error) && error.response) {
        if (response.data.length) {
          yield put(signUpSuccess());
        }
      }
    }
  }
}

export default function* watchSignUpSaga() {
  yield takeLatest(signUpRequest.type, signUpSaga);
}
