import { call, put, takeEvery } from 'redux-saga/effects';

import {
  sendVerificationEmailFailure,
  sendVerificationEmailRequest,
  sendVerificationEmailSuccess,
} from 'src/sagaStore/sagas/codeSagaSlice';
import { checkUserExists, sendEmail } from 'src/sagaStore/codeSagaUtility';
import { SignUpInterface } from 'src/Utilities/interfaces';

function* sendVerificationEmailSaga(action: { type: string; payload: string }) {
  try {
    const user: SignUpInterface = yield call(checkUserExists, action.payload);

    if (!user) {
      yield put(sendVerificationEmailFailure('User does not exist'));
      return;
    }

    yield call(sendEmail, action.payload, user);
    yield put(sendVerificationEmailSuccess());
  } catch (error: unknown) {
    yield put(
      sendVerificationEmailFailure('Failed to send verification email'),
    );
  }
}

export default function* watchSendVerificationEmail() {
  yield takeEvery(sendVerificationEmailRequest.type, sendVerificationEmailSaga);
}
