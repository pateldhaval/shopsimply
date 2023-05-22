import { Category } from '@/app/types';

export interface CategoriesState {
	loading: boolean;
	categoriesData: Category[] | [{}];
	error: string | null;
}
