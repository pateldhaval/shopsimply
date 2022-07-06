import { Category } from '@/app/types';
import { actionCreator } from '@/utils/redux/redux.utils';

import { CategoriesActionTypes } from './categories.types';

export const setCategoriesMap = (categoriesData: Category[] | {}[]) =>
	actionCreator(CategoriesActionTypes.SetCategoriesData, categoriesData);
