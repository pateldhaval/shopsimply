import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppRouter from '@/routes/app.router';
import { setUserState } from '@/store/user/user.action';
import {
	createProfileFromAuth,
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

	return <AppRouter />;
};

export default App;
