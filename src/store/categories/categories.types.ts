import { Category } from '@/app/types';

export interface CategoriesState {
	loading: boolean;
	categoriesData: Category[] | [{}];
	error: string | null;
}

// export interface CategoriesAction {
// 	type: string;
// 	payload: Category[] | [{}] | string;
// }

// Action types
export const enum CategoriesActionTypes {
	FetchStart = 'categories/FetchStart',
	FetchSuccess = 'categories/FetchSuccess',
	FetchFailed = 'categories/FetchFailed'
}
