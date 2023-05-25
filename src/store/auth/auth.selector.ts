import { createSelector } from 'reselect';

import { RootState } from '../redux.type';
import { AuthState } from './auth.type';

export const selectSigninState = (state: RootState) => state.auth;

// Memoize (Cache) user profile from state
export const selectProfile = createSelector([selectSigninState], (auth: AuthState) => auth.profile);
