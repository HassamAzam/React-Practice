import emailjs from "@emailjs/browser";

import { call, put, takeEvery } from "redux-saga/effects";

import { serviceID, templateID, emailToken } from "src/settings";
import {
  sendVerificationEmailFailure,
  sendVerificationEmailRequest,
  sendVerificationEmailSuccess,
} from "./codeSagaSlice";
import { checkUserExists } from "./ codeSagaUtility";
import { SignUpInterface } from "src/Utilities/interfaces";

const sendEmail = async (
  email: string,
  user: SignUpInterface
): Promise<void> => {
  const emailParams = {
    to_name: email,
    from_name: "SurveyCopsTeam",
    message: `Your user details: ${JSON.stringify(user)}`,
  };

  try {
    await emailjs.send(serviceID, templateID, emailParams, emailToken);
  } catch (error) {
    console.error(error);
  }
};

function* sendVerificationEmailSaga(action: { type: string; payload: string }) {
  try {
    const user: SignUpInterface = yield call(checkUserExists, action.payload);

    if (!user) {
      yield put(sendVerificationEmailFailure("User does not exist"));
      return;
    }

    yield call(sendEmail, action.payload, user);
    yield put(sendVerificationEmailSuccess());
  } catch (error: unknown) {
    yield put(
      sendVerificationEmailFailure("Failed to send verification email")
    );
  }
}
export default function* watchSendVerificationEmail() {
  yield takeEvery(sendVerificationEmailRequest.type, sendVerificationEmailSaga);
}
