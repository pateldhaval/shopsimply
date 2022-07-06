import { AuthUser } from '@/app/types';

export interface UserState {
	authUser: AuthUser | null;
}

// Action types
export const enum UserActionTypes {
	SetAuthUser = 'SetAuthUser'
}
