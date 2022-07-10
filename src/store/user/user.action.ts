import { Profile, SignInFormFields } from '@/app/types';
import { actionCreator } from '@/utils/redux/redux.utils';

import { UserActionTypes } from './user.types';

export const checkAuthUser = () => actionCreator(UserActionTypes.CheckAuthUser);

export const setGoogleSignInStart = () =>
	actionCreator(UserActionTypes.SetGoogleSignInStart);

export const setEmailSignInStart = (formFields: SignInFormFields) =>
	actionCreator(UserActionTypes.SetEmailSignInStart, formFields);

export const setSignInSuccess = (profile: Profile) =>
	actionCreator(UserActionTypes.SetSignInSuccess, profile);

export const setSignInFailed = (error: any) =>
	actionCreator(UserActionTypes.SetSignInFailed, error);

export const setSignOutStart = () =>
	actionCreator(UserActionTypes.SetSignOutStart);

export const setSignOutSuccess = () =>
	actionCreator(UserActionTypes.SetSignOutSuccess);

export const setSignOutFailed = (error: any) =>
	actionCreator(UserActionTypes.SetSignOutFailed, error);
