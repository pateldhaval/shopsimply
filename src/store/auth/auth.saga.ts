import { all, call, put, takeLatest } from 'redux-saga/effects';

import { FireUser } from '@/app/types';
import {
	createProfileFromAuth,
	getAuthUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutAuthUser
} from '@/utils/firebase/firebase.util';

import {
	checkAuthUser,
	setGoogleSigninStart,
	setSigninFailed,
	setSigninStart,
	setSigninSuccess,
	setSignOutStart,
	setSignOutSuccess
} from './auth.slice';

export function* getUserProfile(user: FireUser, additionalInfo = {}): any {
	try {
		const profileSnapshot = yield call(createProfileFromAuth, user, additionalInfo);
		// console.log(profileSnapshot.data());
		const profile = { id: profileSnapshot.id, ...profileSnapshot.data() };
		yield put(setSigninSuccess(profile));
	} catch (error: any) {
		yield put(setSigninFailed(error));
	}
}

export function* signInAfterSignUp(action: any): any {
	try {
		const { user, additionalInfo } = action.payload;
		yield call(getUserProfile, user, additionalInfo);
	} catch (error: any) {
		yield put(setSigninFailed(error));
	}
}

export function* signInWithEmail(action: any): any {
	const { email, password } = action.payload;
	try {
		const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
		yield call(getUserProfile, user);
	} catch (error: any) {
		yield put(setSigninFailed(error));
	}
}

export function* signInWithGoogle(): any {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getUserProfile, user);
	} catch (error: any) {
		yield put(setSigninFailed(error));
	}
}

export function* checkUserAuthenticated(): any {
	try {
		const user = yield call(getAuthUser);
		if (!user) return;
		yield call(getUserProfile, user);
	} catch (error: any) {
		yield put(setSigninFailed(error));
	}
}

export function* signOut(): any {
	try {
		yield call(signOutAuthUser);
		yield put(setSignOutSuccess());
	} catch (error: any) {
		yield put(setSigninFailed(error));
	}
}

export function* onSigninWithEmail() {
	yield takeLatest(setSigninStart, signInWithEmail);
}

export function* onSigninWithGoogle() {
	yield takeLatest(setGoogleSigninStart, signInWithGoogle);
}

export function* onCheckAuthUser() {
	yield takeLatest(checkAuthUser, checkUserAuthenticated);
}

export function* onSignOut() {
	yield takeLatest(setSignOutStart, signOut);
}

export function* authSaga() {
	yield all([call(onCheckAuthUser), call(onSigninWithEmail), call(onSigninWithGoogle), call(onSignOut)]);
}
