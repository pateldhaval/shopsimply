import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SignupState } from './signup.type';

const initialState: SignupState = {
	loading: false,
	error: null
};

const signupSlice = createSlice({
	name: 'signup',
	initialState,
	reducers: {
		setSignupStart(state: SignupState, action: PayloadAction<any>) {
			state.loading = true;
			state.error = null;
		},
		setSignupFailed(state: SignupState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		setSignUpSuccess(state: SignupState) {
			state.loading = false;
		}
	}
});

export const { setSignupStart, setSignUpSuccess, setSignupFailed } = signupSlice.actions;

export const signupReducer = signupSlice.reducer;
