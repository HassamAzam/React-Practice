
import { all } from "redux-saga/effects";
import watchLoginSaga from "./authSaga";
import watchSignUpSaga from "./signUpSaga";
import  watchSendVerificationEmail  from "./codeSaga";

export function* rootSaga() {
    yield all([watchLoginSaga(),watchSignUpSaga(),watchSendVerificationEmail()]);
}
