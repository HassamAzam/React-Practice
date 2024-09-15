import emailjs from "@emailjs/browser";
import axios, { AxiosResponse } from "axios";

import { call, put, takeLatest } from "redux-saga/effects";

import { BASE_URL, serviceID, templateID, emailToken } from "src/settings";
import {
  sendVerificationEmailFailure,
  sendVerificationEmailRequest,
  sendVerificationEmailSuccess,
} from "./codeSagaSlice";

const checkUserExists = async (email: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/users?email=${email}`
    );
    return response.data[0] || null;
  } catch (error) {
    throw new Error("Failed to check user existence");
  }
};

const sendEmail = async (email: string, user: any): Promise<void> => {
  const emailParams = {
    to_name: email,
    from_name: "SurveyCopsTeam",
    message: `Your user details: ${JSON.stringify(user)}`,
  };

  await emailjs.send(serviceID, templateID, emailParams, emailToken);
};

function* sendVerificationEmailSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    const user: any = yield call(checkUserExists, action.payload);
    if (!user) {
      yield put(sendVerificationEmailFailure("User does not exist"));
      return;
    }
    yield call(sendEmail, action.payload, user);
    yield put(sendVerificationEmailSuccess());
  } catch (error: any) {
    yield put(
      sendVerificationEmailFailure(
        error.message || "Failed to send verification email"
      )
    );
  }
}
export default function* watchSendVerificationEmail() {
  yield takeLatest(
    sendVerificationEmailRequest.type,
    sendVerificationEmailSaga
  );
}
