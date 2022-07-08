import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/categories.saga';

export function* rootSaga() {
	yield all([
		// All features side-effects combined and init from root
		call(categoriesSaga)
	]);
}
