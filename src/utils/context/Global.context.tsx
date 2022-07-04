import { User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { GlobalState } from '@/app/types';
import {
	createProfileFromAuth,
	onAuthStateChangedListener
} from '@/utils/firebase/firebase.util';

const GlobalContext = createContext<any>({
	userState: null,
	setUserState: () => null
});

// Initial state
const initialState: GlobalState = {
	user: null
};

// Action types
const enum GlobalActionTypes {
	SetUser = 'SetUser'
}

// Reducer
const globalReducer = (state: GlobalState, action: any) => {
	switch (action.type) {
		case GlobalActionTypes.SetUser:
			return {
				...state,
				user: action.payload
			};
		default:
			return state;
	}
};

// Action creators
const setUserState = (user: User) => {
	return {
		type: GlobalActionTypes.SetUser,
		payload: user
	};
};

// Context Provider
interface PropsProvider {
	children: React.ReactNode;
}

export const GlobalProvider: React.FC<PropsProvider> = (props) => {
	const [state, dispatch] = useReducer(globalReducer, initialState);
	const { user } = state;

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

	// Provider component
	const values = { user };
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
