import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppRouter from '@/routes/app.router';
import { fetchCategoriesStart } from '@/store/categories/categories.slice';
import { checkAuthUser } from '@/store/user/user.slice';

const App = () => {
	const dispatch = useDispatch();

	// [Check authenticated user]
	useEffect(() => {
		dispatch(checkAuthUser());
	}, []);

	// [Get categories data]
	useEffect(() => {
		dispatch(fetchCategoriesStart());
	}, []);

	return <AppRouter />;
};

export default App;
