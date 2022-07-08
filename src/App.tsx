import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppRouter from '@/routes/app.router';
import { fetchCategoriesStart } from '@/store/categories/categories.action';
import {
	createProfileFromAuth,
	getAuthUser
} from '@/utils/firebase/firebase.util';

import { setUserState } from './store/user/user.action';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		getAuthUser().then((authUser: any) => {
			if (authUser) {
				// Separate entry to profile doc/table when new user is authenticated
				createProfileFromAuth(authUser);
			}
			dispatch(setUserState(authUser));
		});
	}, []);

	// Get categories data
	useEffect(() => {
		dispatch(fetchCategoriesStart());
	}, []);

	return <AppRouter />;
};

export default App;
