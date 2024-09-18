import axios, { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { SignUpInterface } from "src/Utilities/interfaces";
import { signUpFailure, signUpRequest, signUpSuccess } from "./signUpSagaSlice";

const checkIfExist = async (
  user: SignUpInterface,
): Promise<AxiosResponse | null> => {
  try {
    return await axios.get(`?email=${user.email}`);
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return null;
  }
};

const signUp = async (user: SignUpInterface): Promise<AxiosResponse | null> => {
  try {
    return await axios.post(`/users`, user);
  } catch (error) {
    console.error("Error signing up user:", error);
    return null;
  }
};

function* signUpSaga(action: { type: string; payload: SignUpInterface }) {
  try {
    const response: AxiosResponse | null = yield call(
      checkIfExist,
      action.payload,
    );

    if (response && response.data.length > 0) {
      yield put(signUpFailure({ message: "User already exists" }));
    } else {
      const signUpResponse: AxiosResponse | null = yield call(
        signUp,
        action.payload,
      );
      if (signUpResponse && signUpResponse.data) {
        yield put(signUpSuccess());
      } else {
        yield put(signUpFailure({ message: "Sign-up failed" }));
      }
    }
  } catch (error) {
    console.error("Error in signUpSaga:", error);
    yield put(signUpFailure({ message: "An error occurred during sign up" }));
  }
}

export default function* watchSignUpSaga() {
  yield takeLatest(signUpRequest.type, signUpSaga);
}
