import { createSelector } from 'reselect';

import { Category } from '@/app/types';

import { RootState } from '../redux.types';

// Initial data access from state
const selectCategoriesState = (state: RootState) => state.categories;

export const selectCategoriesLoading = createSelector([selectCategoriesState], (categories) => categories.loading);

// Memoize (Cache) categoriesData from state
export const selectCategoriesData = createSelector([selectCategoriesState], (categories) => categories.categoriesData);

// Memoize (Cache) categoriesMap from categoriesData
export const selectCategoriesMap = createSelector([selectCategoriesData], (categoriesDataSlice) =>
	categoriesDataSlice.reduce(
		(acc: any, category: Category) => {
			const { title, imageUrl, products } = category;
			acc[title.toLowerCase()] = { title, imageUrl, products };
			return acc;
		},
		[{}]
	)
);
