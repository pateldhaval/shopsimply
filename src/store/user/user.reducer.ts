import { UserActionTypes, UserState } from './user.types';

const initialState: UserState = {
	authUser: null
};

export const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case UserActionTypes.SetAuthUser:
			return {
				...state,
				authUser: action.payload
			};
		default:
			return state;
	}
};
