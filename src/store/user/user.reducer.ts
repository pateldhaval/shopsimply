import { UserActionTypes, UserState } from './user.types';

const initialState: UserState = {
	loading: false,
	profile: null,
	error: null
};

export const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case UserActionTypes.SetSignInSuccess:
			return {
				...state,
				profile: action.payload
			};
		case UserActionTypes.SetSignInFailed:
		case UserActionTypes.SetSignUpFailed:
		case UserActionTypes.SetSignOutFailed:
			return {
				...state,
				error: action.payload
			};
		case UserActionTypes.SetSignOutSuccess:
			return {
				...state,
				profile: null
			};
		default:
			return state;
	}
};
