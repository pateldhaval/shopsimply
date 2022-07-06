import { Category } from '@/app/types';

export interface CategoriesState {
	categoriesData: Category[] | [{}];
}

// Action types
export const enum CategoriesActionTypes {
	SetCategoriesData = 'SetCategoriesData'
}
