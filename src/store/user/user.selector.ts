import { useSelector } from 'react-redux';

import { RootState } from '../store';

export const useSelectorUser = () =>
	useSelector((state: RootState) => state.user);
