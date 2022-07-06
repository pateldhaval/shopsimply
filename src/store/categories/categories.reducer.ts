import { CategoriesActionTypes, CategoriesState } from './categories.types';

const initialState: CategoriesState = {
	loading: false,
	categoriesData: [],
	error: null
};

export const categoriesReducer = (state = initialState, action: any) => {
	console.log(action);

	switch (action.type) {
		case CategoriesActionTypes.FetchStart:
			return {
				...state,
				loading: true
			};
		case CategoriesActionTypes.FetchSuccess:
			return {
				...state,
				categoriesData: action.payload,
				loading: false
			};
		case CategoriesActionTypes.FetchFailed:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
};
