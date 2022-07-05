import { CategoriesActionTypes, CategoriesState } from './categories.types';

const initialState: CategoriesState = {
	categoriesMap: []
};

export const categoriesReducer = (state = initialState, action: any) => {
	// console.log(action);

	switch (action.type) {
		case CategoriesActionTypes.SetCategoriesMap:
			return {
				...state,
				categoriesMap: action.payload
			};
		default:
			return state;
	}
};
