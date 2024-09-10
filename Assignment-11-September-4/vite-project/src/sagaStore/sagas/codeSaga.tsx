import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import emailjs from "@emailjs/browser";
import {
  sendVerificationEmailRequest,
  sendVerificationEmailSuccess,
  sendVerificationEmailFailure,
} from "./codeSagaSlice";
import { BASE_URL } from "../../Utilities/baseURL";
import axios from "axios";

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

  await emailjs.send(
    "service_hy6uao9",
    "template_310losc",
    emailParams,
    "IZwPmNZdJoi2j0ttx"
  );
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
