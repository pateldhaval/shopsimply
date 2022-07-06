import { createSelector } from 'reselect';

import { RootState } from '../redux.types';

const selectUserState = (state: RootState) => state.user;

// Memoize (Cache) authUser from state
export const selectAuthUser = createSelector(
	[selectUserState],
	(user: any) => user.authUser
);
