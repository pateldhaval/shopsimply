import { createSelector } from 'reselect';

import { Category } from '@/app/types';

import { RootState } from '../store';

// Initial data access from state
const selectCategoriesState = (state: RootState) => {
	console.log('Categories Selector 1');
	return state.categories;
};

// Memoize (Cache) categoriesData from state
const selectCategoriesData = createSelector(
	[selectCategoriesState],
	(categoriesSlice) => {
		console.log('Categories Selector 2');
		return categoriesSlice.categoriesData;
	}
);

// Memoize (Cache) categoriesMap from categoriesData
export const selectCategoriesMap = createSelector(
	[selectCategoriesData],
	(categoriesDataSlice) => {
		console.log('Categories Selector 3');
		return categoriesDataSlice.reduce(
			(acc: any, category: Category) => {
				const { title, imageUrl, products } = category;
				acc[title.toLowerCase()] = { title, imageUrl, products };
				return acc;
			},
			[{}]
		);
	}
);
