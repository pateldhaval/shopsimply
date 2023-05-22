import { createSelector } from 'reselect';

import { RootState } from '../redux.types';
import { UserState } from './user.types';

export const selectUserState = (state: RootState) => state.user;

// Memoize (Cache) user profile from state
export const selectProfile = createSelector([selectUserState], (user: any) => user.profile);
export const selectAuthError = createSelector([selectUserState], (user: UserState) => user.error);
export const selectAuthLoading = createSelector([selectUserState], (user: UserState) => user.loading);
