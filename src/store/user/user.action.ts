import { AuthUser } from '@/app/types';
import { actionCreator } from '@/utils/redux/redux.utils';

import { UserActionTypes } from './user.types';

export const setUserState = (user: AuthUser) =>
	actionCreator(UserActionTypes.SetAuthUser, user);
