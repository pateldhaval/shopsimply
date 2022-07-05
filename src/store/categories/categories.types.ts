import { Category } from '@/app/types';

export interface CategoriesState {
	categoriesMap: Category[] | [{}];
}

// Action types
export const enum CategoriesActionTypes {
	SetCategoriesMap = 'SetCategoriesMap'
}
