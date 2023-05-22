import { Profile } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from './user.types';

const initialState: UserState = {
	loading: false,
	profile: null,
	error: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		checkAuthUser() {},
		setGoogleSignInStart(state: UserState) {
			state.loading = true;
			state.error = null;
		},
		setSignInStart(state: UserState, action: PayloadAction<any>) {
			state.loading = true;
			state.error = null;
		},
		setAuthFailed(state: UserState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		setSignInSuccess(state: UserState, action: PayloadAction<Profile>) {
			state.loading = false;
			state.profile = action.payload;
			state.error = null;
		},
		setSignUpStart(state: UserState, action: PayloadAction<any>) {
			state.loading = true;
			state.error = null;
		},
		setSignUpSuccess(state: UserState) {
			state.loading = false;
		},
		setSignOutStart(state: UserState) {
			state.loading = true;
			state.error = null;
		},
		setSignOutSuccess(state: UserState) {
			state.loading = false;
			state.profile = null;
		}
	}
});

export const {
	checkAuthUser,
	setGoogleSignInStart,
	setSignInStart,
	setAuthFailed,
	setSignInSuccess,
	setSignUpStart,
	setSignUpSuccess,
	setSignOutStart,
	setSignOutSuccess
} = userSlice.actions;

export const userReducer = userSlice.reducer;
