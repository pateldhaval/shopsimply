import { Category } from '@/app/types';
import { actionCreator } from '@/utils/redux/redux.utils';

// import { TypedDispatch } from '../redux.types';
import { CategoriesActionTypes } from './categories.types';

// Actions
export const fetchCategoriesStart = () =>
	actionCreator(CategoriesActionTypes.FetchStart);

export const fetchCategoriesSuccess = (categoriesData: Category[] | {}[]) =>
	actionCreator(CategoriesActionTypes.FetchSuccess, categoriesData);

export const fetchCategoriesFailed = (error: any) =>
	actionCreator(CategoriesActionTypes.FetchFailed, error);

// Thunk Actions
// export const fetchCategoriesAsync = () => async (dispatch: TypedDispatch) => {
// 	dispatch(fetchCategoriesStart());
// 	try {
// 		const categoriesData = await getCollectionAndDocuments('categories');
// 		dispatch(fetchCategoriesSuccess(categoriesData));
// 	} catch (error) {
// 		dispatch(fetchCategoriesFailed(error));
// 	}
// };
