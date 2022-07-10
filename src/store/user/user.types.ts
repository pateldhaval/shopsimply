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
	SetSignInSuccess = 'user/SetSignInSuccess',
	SetSignInFailed = 'user/SetSignInFailed',
	// Start via Google
	SetGoogleSignInStart = 'user/SetGoogleSignInStart',
	// Start via Email
	SetEmailSignInStart = 'user/SetEmailSignInStart',
	// SignOut
	SetSignOutStart = 'user/SetSignOutStart',
	SetSignOutSuccess = 'user/SetSignOutSuccess',
	SetSignOutFailed = 'user/SetSignOutFailed'
}
