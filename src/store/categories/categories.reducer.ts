import { CategoriesActionTypes, CategoriesState } from './categories.types';

const initialState: CategoriesState = {
	categoriesData: []
};

export const categoriesReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case CategoriesActionTypes.SetCategoriesData:
			return {
				...state,
				categoriesData: action.payload
			};
		default:
			return state;
	}
};
