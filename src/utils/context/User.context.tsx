import { User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { UserState } from '@/app/types';
import {
	createProfileFromAuth,
	onAuthStateChangedListener
} from '@/utils/firebase/firebase.util';

const UserContext = createContext<any>({});

// Initial state
const initialState: UserState = {
	user: null
};

// Action types
const enum UserActionTypes {
	SetUser = 'SetUser'
}

// Reducer
const userReducer = (state: UserState, action: any) => {
	switch (action.type) {
		case UserActionTypes.SetUser:
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
		type: UserActionTypes.SetUser,
		payload: user
	};
};

// Context Provider
interface PropsProvider {
	children: React.ReactNode;
}

export const UserProvider: React.FC<PropsProvider> = (props) => {
	const [state, dispatch] = useReducer(userReducer, initialState);
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
		<UserContext.Provider value={values}>{props.children}</UserContext.Provider>
	);
};

// Custom hook to directly access UserContext
export const useUserContext = () => {
	return useContext(UserContext);
};
