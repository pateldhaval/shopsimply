import { all, call } from 'redux-saga/effects';

import { authSaga } from './auth/auth.saga';
import { categoriesSaga } from './categories/categories.saga';
import { signupSaga } from './signup/signup.saga';

export function* rootSaga() {
	yield all([
		// All features side-effects combined and init from root
		call(authSaga),
		call(signupSaga),
		call(categoriesSaga)
	]);
}
