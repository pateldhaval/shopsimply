import { createSelector } from 'reselect';

import { RootState } from '../redux.types';
import { SignupState } from './signup.types';

export const selectSignupState = (state: RootState) => state.signup;

// Memoize (Cache) from state
export const selectError = createSelector([selectSignupState], (signup: SignupState) => signup.error);
export const selectLoading = createSelector([selectSignupState], (signup: SignupState) => signup.loading);
