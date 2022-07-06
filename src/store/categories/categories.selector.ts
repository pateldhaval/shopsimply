import { createSelector } from 'reselect';

import { Category } from '@/app/types';

import { RootState } from '../redux.types';

// Initial data access from state
const selectCategoriesState = (state: RootState) => state.categories;

// Memoize (Cache) categoriesData from state
const selectCategoriesData = createSelector(
	[selectCategoriesState],
	(categoriesSlice) => categoriesSlice.categoriesData
);

// Memoize (Cache) categoriesMap from categoriesData
export const selectCategoriesMap = createSelector(
	[selectCategoriesData],
	(categoriesDataSlice) =>
		categoriesDataSlice.reduce(
			(acc: any, category: Category) => {
				const { title, imageUrl, products } = category;
				acc[title.toLowerCase()] = { title, imageUrl, products };
				return acc;
			},
			[{}]
		)
);
