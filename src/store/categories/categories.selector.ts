import { useSelector } from 'react-redux';

import { RootState } from '../store';

export const useSelectorCategories = () =>
	useSelector((state: RootState) => state.categories);
