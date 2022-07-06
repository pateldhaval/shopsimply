import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppRouter from '@/routes/app.router';
import { fetchCategoriesAsync } from '@/store/categories/categories.action';
import { useTypedDispatch } from '@/store/redux.types';
import { setUserState } from '@/store/user/user.action';
import {
	createProfileFromAuth,
	onAuthStateChangedListener
} from '@/utils/firebase/firebase.util';

const App = () => {
	const dispatch = useTypedDispatch();

	useEffect(() => {
		// Listener for Authentication change (SignIn/SignUp or SignOut)
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				// Separate entry to profile doc/table when new user is authenticated
				createProfileFromAuth(user);
			}
			dispatch(setUserState(user!));
		});

		return unsubscribe;
	}, []);

	// Get categories data
	useEffect(() => {
		dispatch(fetchCategoriesAsync());
	}, []);

	return <AppRouter />;
};

export default App;
