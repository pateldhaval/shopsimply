import AppRouter from '@/routes/app.router';

import { useGetUserProfileQuery } from './store/auth/auth.api';
import { useCategoriesQuery } from './store/categories/categories.api';

const App = () => {
	// [Check authenticated user]
	useGetUserProfileQuery();

	// [Get categories data]
	useCategoriesQuery();

	return <AppRouter />;
};

export default App;
