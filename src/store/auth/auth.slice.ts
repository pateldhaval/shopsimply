import { Profile } from '@/types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from './auth.type';

const initialState: AuthState = {
	loading: false,
	loadingGoogle: false,
	profile: null,
	error: null
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		checkAuthUser() {},
		setGoogleSigninStart(state: AuthState) {
			state.loadingGoogle = true;
			state.error = null;
		},
		setSigninStart(state: AuthState, action: PayloadAction<any>) {
			state.loading = true;
			state.error = null;
		},
		setSigninFailed(state: AuthState, action: PayloadAction<string>) {
			state.loading = state.loadingGoogle = false;
			state.error = action.payload;
		},
		setSigninSuccess(state: AuthState, action: PayloadAction<Profile>) {
			state.loading = state.loadingGoogle = false;
			state.profile = action.payload;
			state.error = null;
		},
		setSignOutStart(state: AuthState) {
			state.loading = state.loadingGoogle = false;
			state.error = null;
		},
		setSignOutSuccess(state: AuthState) {
			state.loading = false;
			state.profile = null;
		}
	}
});

export const {
	checkAuthUser,
	setGoogleSigninStart,
	setSigninStart,
	setSigninFailed,
	setSigninSuccess,
	setSignOutStart,
	setSignOutSuccess
} = authSlice.actions;

export const authReducer = authSlice.reducer;
