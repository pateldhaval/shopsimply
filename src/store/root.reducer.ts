import { combineReducers } from '@reduxjs/toolkit';

import { cartReducer } from './cart/cart.reducer';
import { categoriesReducer } from './categories/categories.reducer';
import { userReducer } from './user/user.slice';

export const rootReducer = combineReducers({
	cart: cartReducer,
	categories: categoriesReducer,
	user: userReducer
});
