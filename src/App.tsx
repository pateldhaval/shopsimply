import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppRouter from '@/routes/app.router';
import { setCategoriesMap } from '@/store/categories/categories.action';
import { setUserState } from '@/store/user/user.action';
import {
	createProfileFromAuth,
	getCollectionAndDocuments,
	onAuthStateChangedListener
} from '@/utils/firebase/firebase.util';

const App = () => {
	const dispatch = useDispatch();

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

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesMap = await getCollectionAndDocuments('categories');
			dispatch(setCategoriesMap(categoriesMap));
		};

		getCategoriesMap();
	}, []);

	return <AppRouter />;
};

export default App;
