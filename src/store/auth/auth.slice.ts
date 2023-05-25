import { Profile } from '@/types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from './auth.type';

const initialState: AuthState = {
	profile: null
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// setAuth(state: AuthState, action: PayloadAction<Profile>) {
		// 	state.profile = action.payload;
		// }
	}
});

export const {
	// setAuth
} = authSlice.actions;

export const authReducer = authSlice.reducer;
