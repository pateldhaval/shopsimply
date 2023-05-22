import { createSlice } from '@reduxjs/toolkit';

import { CategoriesState } from './categories.types';

const initialState: CategoriesState = {
	loading: false,
	categoriesData: [],
	error: null
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: initialState,
	reducers: {
		fetchCategoriesStart: (state: CategoriesState) => {
			state.loading = true;
		},
		fetchCategoriesSuccess: (state: CategoriesState, action: any) => {
			state.categoriesData = action.payload;
			state.loading = false;
		},
		fetchCategoriesFailed: (state: CategoriesState, action: any) => {
			state.error = action.payload;
			state.loading = false;
		}
	}
});

export const {
	fetchCategoriesStart,
	fetchCategoriesSuccess,
	fetchCategoriesFailed
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
