import {
	FireUser,
	Profile,
	SignInFormFields,
	SignUpFormFields
} from '@/app/types';
import { actionCreator } from '@/utils/redux/redux.utils';

import { UserActionTypes } from './user.types';

// Check user
export const checkAuthUser = () => actionCreator(UserActionTypes.CheckAuthUser);

// SignIn
export const setGoogleSignInStart = () =>
	actionCreator(UserActionTypes.SetGoogleSignInStart);

export const setEmailSignInStart = (formFields: SignInFormFields) =>
	actionCreator(UserActionTypes.SetEmailSignInStart, formFields);

export const setSignInSuccess = (profile: Profile) =>
	actionCreator(UserActionTypes.SetSignInSuccess, profile);

export const setSignInFailed = (error: any) =>
	actionCreator(UserActionTypes.SetSignInFailed, error);

// SignUp
export const setSignUpStart = (formFields: SignUpFormFields) =>
	actionCreator(UserActionTypes.SetSignUpStart, formFields);

export const setSignUpSuccess = (user: FireUser, additionalInfo: any) =>
	actionCreator(UserActionTypes.SetSignUpSuccess, { user, additionalInfo });

export const setSignUpFailed = (error: any) =>
	actionCreator(UserActionTypes.SetSignUpFailed, error);

// SignOut
export const setSignOutStart = () =>
	actionCreator(UserActionTypes.SetSignOutStart);

export const setSignOutSuccess = () =>
	actionCreator(UserActionTypes.SetSignOutSuccess);

export const setSignOutFailed = (error: any) =>
	actionCreator(UserActionTypes.SetSignOutFailed, error);
