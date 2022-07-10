import { createSelector } from 'reselect';

import { RootState } from '../redux.types';

export const selectUserState = (state: RootState) => state.user;

// Memoize (Cache) user profile from state
export const selectProfile = createSelector(
	[selectUserState],
	(user: any) => user.profile
);
