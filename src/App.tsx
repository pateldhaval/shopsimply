import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppRouter from '@/routes/app.router';
import { fetchCategoriesStart } from '@/store/categories/categories.slice';

import { checkAuthUser } from './store/auth/auth.slice';
import { useCategoriesQuery } from './store/categories/categories.api';

const App = () => {
	const dispatch = useDispatch();

	// [Check authenticated user]
	useEffect(() => {
		dispatch(checkAuthUser());
	}, []);

	// =============================================
	// [Get categories data]

	// [Using RTK Query]
	useCategoriesQuery();

	// [Using Saga]
	// useEffect(() => {
	// 	dispatch(fetchCategoriesStart());
	// }, []);
	// =============================================

	return <AppRouter />;
};

export default App;
