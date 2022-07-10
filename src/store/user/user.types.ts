import { Profile } from '@/app/types';

export interface UserState {
	loading: boolean;
	profile: Profile | null;
	error: string | null;
}

// Action types
export const enum UserActionTypes {
	// Check user
	CheckAuthUser = 'user/CheckAuthUser',
	// SignIn
	SetGoogleSignInStart = 'user/SetGoogleSignInStart',
	SetEmailSignInStart = 'user/SetEmailSignInStart',
	SetSignInSuccess = 'user/SetSignInSuccess',
	SetSignInFailed = 'user/SetSignInFailed',
	// SignUp
	SetSignUpStart = 'user/SetSignUpStart',
	SetSignUpSuccess = 'user/SetSignUpSuccess',
	SetSignUpFailed = 'user/SetSignUpFailed',
	// SignOut
	SetSignOutStart = 'user/SetSignOutStart',
	SetSignOutSuccess = 'user/SetSignOutSuccess',
	SetSignOutFailed = 'user/SetSignOutFailed'
}
