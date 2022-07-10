import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/categories.saga';
import { userSaga } from './user/user.saga';

export function* rootSaga() {
	yield all([
		// All features side-effects combined and init from root
		call(userSaga),
		call(categoriesSaga)
	]);
}
