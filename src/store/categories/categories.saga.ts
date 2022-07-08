import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getCollectionAndDocuments } from '@/utils/firebase/firebase.util';

import {
	fetchCategoriesFailed,
	fetchCategoriesSuccess
} from './categories.action';
import { CategoriesActionTypes } from './categories.types';

export function* fetchCategoriesAsync(): any {
	try {
		// Inside generators, yield replaces await
		const categoriesData = yield call(getCollectionAndDocuments, 'categories');
		// Inside generators, put replaces dispatch
		yield put(fetchCategoriesSuccess(categoriesData));
	} catch (error) {
		yield put(fetchCategoriesFailed(error));
	}
}

// Event listener generator
export function* onFetchCategories() {
	// Inside generators, takeLatest listen & respond to the action just like reducer switch statement
	yield takeLatest(CategoriesActionTypes.FetchStart, fetchCategoriesAsync);
}

// categories level root saga (generator)
export function* categoriesSaga() {
	yield all([
		// All side-effects to init at feature level
		call(onFetchCategories)
	]);
}
