import { all, call, put, takeLatest } from 'redux-saga/effects';

import { FireUser } from '@/app/types';
import {
	createAuthUserWithEmailAndPassword,
	createProfileFromAuth,
	getAuthUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutAuthUser
} from '@/utils/firebase/firebase.util';

import {
	setSignInFailed,
	setSignInSuccess,
	setSignOutFailed,
	setSignOutSuccess,
	setSignUpFailed,
	setSignUpSuccess
} from './user.action';
import { UserActionTypes } from './user.types';

export function* getUserProfile(user: FireUser, additionalInfo = {}): any {
	try {
		const profileSnapshot = yield call(
			createProfileFromAuth,
			user,
			additionalInfo
		);
		yield put(
			setSignInSuccess({ id: profileSnapshot.id, ...profileSnapshot.data() })
		);
	} catch (error) {
		yield put(setSignInFailed(error));
	}
}

export function* signUp(action: any): any {
	try {
		const { email, password, displayName } = action.payload;
		const { user } = yield call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);

		yield put(setSignUpSuccess(user, { displayName }));
	} catch (error) {
		yield put(setSignUpFailed(error));
	}
}

export function* signInAfterSignUp(action: any): any {
	try {
		const { user, additionalInfo } = action.payload;
		yield call(getUserProfile, user, additionalInfo);
	} catch (error) {
		yield put(setSignUpFailed(error));
	}
}

export function* signInWithEmail(action: any): any {
	const { email, password } = action.payload;
	try {
		const { user } = yield call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);
		yield call(getUserProfile, user);
	} catch (error) {
		yield put(setSignInFailed(error));
	}
}

export function* signInWithGoogle(): any {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getUserProfile, user);
	} catch (error) {
		yield put(setSignInFailed(error));
	}
}

export function* checkUserAuthenticated(): any {
	try {
		const user = yield call(getAuthUser);
		if (!user) return;
		yield call(getUserProfile, user);
	} catch (error) {
		yield put(setSignInFailed(error));
	}
}

export function* signOut(): any {
	try {
		yield call(signOutAuthUser);
		yield put(setSignOutSuccess());
	} catch (error) {
		yield put(setSignOutFailed(error));
	}
}

export function* onSignUpStart() {
	yield takeLatest(UserActionTypes.SetSignUpStart, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(UserActionTypes.SetSignUpSuccess, signInAfterSignUp);
}

export function* onSignInWithEmail() {
	yield takeLatest(UserActionTypes.SetEmailSignInStart, signInWithEmail);
}

export function* onSignInWithGoogle() {
	yield takeLatest(UserActionTypes.SetGoogleSignInStart, signInWithGoogle);
}

export function* onCheckAuthUser() {
	yield takeLatest(UserActionTypes.CheckAuthUser, checkUserAuthenticated);
}

export function* onSignOut() {
	yield takeLatest(UserActionTypes.SetSignOutStart, signOut);
}

export function* userSaga() {
	yield all([
		call(onCheckAuthUser),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignInWithEmail),
		call(onSignInWithGoogle),
		call(onSignOut)
	]);
}
