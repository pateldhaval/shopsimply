import { all, call, put, takeLatest } from 'redux-saga/effects';

import { createAuthUserWithEmailAndPassword } from '@/utils/firebase/firebase.util';

import { signInAfterSignUp } from '../auth/auth.saga';
import { setSignupFailed, setSignupStart, setSignUpSuccess } from './signup.slice';

export function* signUp(action: any): any {
	try {
		const { email, password, displayName } = action.payload;
		const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);

		const signUpData: any = { user, additionalInfo: { displayName } };
		yield put(setSignUpSuccess(signUpData));
	} catch (error: any) {
		yield put(setSignupFailed(error));
	}
}

export function* onSignUpStart() {
	yield takeLatest(setSignupStart, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(setSignUpSuccess, signInAfterSignUp);
}

export function* signupSaga() {
	yield all([call(onSignUpStart), call(onSignUpSuccess)]);
}
