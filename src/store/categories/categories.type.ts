import { Category } from '@/types/shop.type';

export interface CategoriesState {
	loading: boolean;
	categoriesData: Category[] | [{}];
	error: string | null;
}
