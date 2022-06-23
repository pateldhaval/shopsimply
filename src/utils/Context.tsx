import { User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

import {
	createProfileFromAuth,
	onAuthStateChangedListener
} from '@/utils/firebase/firebase.util';

const GlobalContext = createContext<any>({
	userState: null,
	setUserState: () => null
});

interface PropsProvider {
	children: React.ReactNode;
}

export const GlobalProvider: React.FC<PropsProvider> = (props) => {
	const [userState, setUserState] = useState<User | null>(null);
	const values = { userState, setUserState };

	useEffect(() => {
		// Listener for Authentication change (SignIn/SignUp or SignOut)
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				// Separate entry to profile doc/table when new user is authenticated
				createProfileFromAuth(user);
			}
			setUserState(user);
		});

		return unsubscribe;
	}, []);

	return (
		<GlobalContext.Provider value={values}>
			{props.children}
		</GlobalContext.Provider>
	);
};

// Custom hook to directly access GlobalContext
export const useGlobalContext = () => {
	return useContext(GlobalContext);
};
