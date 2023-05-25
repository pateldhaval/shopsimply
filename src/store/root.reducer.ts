import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from './auth/auth.api';
import { authReducer } from './auth/auth.slice';
import { cartReducer } from './cart/cart.slice';
import { categoriesApi } from './categories/categories.api';

export const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[categoriesApi.reducerPath]: categoriesApi.reducer,
	cart: cartReducer,
	auth: authReducer
});
