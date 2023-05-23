import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './auth/auth.slice';
import { cartReducer } from './cart/cart.slice';
import { categoriesReducer } from './categories/categories.slice';
import { signupReducer } from './signup/signup.slice';

export const rootReducer = combineReducers({
	cart: cartReducer,
	categories: categoriesReducer,
	auth: authReducer,
	signup: signupReducer
});
