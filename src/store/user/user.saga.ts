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
	checkAuthUser,
	setAuthFailed,
	setGoogleSignInStart,
	setSignInStart,
	setSignInSuccess,
	setSignOutStart,
	setSignOutSuccess,
	setSignUpStart,
	setSignUpSuccess
} from './user.slice';

export function* getUserProfile(user: FireUser, additionalInfo = {}): any {
	try {
		const profileSnapshot = yield call(createProfileFromAuth, user, additionalInfo);
		yield put(setSignInSuccess({ id: profileSnapshot.id, ...profileSnapshot.data() }));
	} catch (error: any) {
		yield put(setAuthFailed(error));
	}
}

export function* signUp(action: any): any {
	try {
		const { email, password, displayName } = action.payload;
		const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);

		const signUpData: any = { user, additionalInfo: { displayName } };
		yield put(setSignUpSuccess(signUpData));
	} catch (error: any) {
		yield put(setAuthFailed(error));
	}
}

export function* signInAfterSignUp(action: any): any {
	try {
		const { user, additionalInfo } = action.payload;
		yield call(getUserProfile, user, additionalInfo);
	} catch (error: any) {
		yield put(setAuthFailed(error));
	}
}

export function* signInWithEmail(action: any): any {
	const { email, password } = action.payload;
	try {
		const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
		yield call(getUserProfile, user);
	} catch (error: any) {
		yield put(setAuthFailed(error));
	}
}

export function* signInWithGoogle(): any {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getUserProfile, user);
	} catch (error: any) {
		yield put(setAuthFailed(error));
	}
}

export function* checkUserAuthenticated(): any {
	try {
		const user = yield call(getAuthUser);
		if (!user) return;
		yield call(getUserProfile, user);
	} catch (error: any) {
		yield put(setAuthFailed(error));
	}
}

export function* signOut(): any {
	try {
		yield call(signOutAuthUser);
		yield put(setSignOutSuccess());
	} catch (error: any) {
		yield put(setAuthFailed(error));
	}
}

export function* onSignUpStart() {
	yield takeLatest(setSignUpStart, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(setSignUpSuccess, signInAfterSignUp);
}

export function* onSignInWithEmail() {
	yield takeLatest(setSignInStart, signInWithEmail);
}

export function* onSignInWithGoogle() {
	yield takeLatest(setGoogleSignInStart, signInWithGoogle);
}

export function* onCheckAuthUser() {
	yield takeLatest(checkAuthUser, checkUserAuthenticated);
}

export function* onSignOut() {
	yield takeLatest(setSignOutStart, signOut);
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
