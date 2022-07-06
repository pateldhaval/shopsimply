import { createSelector } from 'reselect';

import { CartProduct } from '@/app/types';

import { RootState } from '../store';
import { CartState } from './cart.types';

// Initial data access from state
const selectCartState = (state: RootState) => state.cart;

// Memoize (Cache) isCartOpen from state
export const selectIsCartOpen = createSelector(
	[selectCartState],
	(cart: CartState) => cart.isCartOpen
);

// Memoize (Cache) cartItems from state
export const selectCartItems = createSelector(
	[selectCartState],
	(cart: CartState) => cart.cartItems
);

// Memoize (Cache) totalQty derived from state
// depends on cartItems and runs only if cartItems changes
export const selectCartQty = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((sum: number, item: CartProduct) => sum + item.qty, 0)
);

// select totalAmount derived from cartItems
// depends on cartItems and runs only if cartItems changes
export const selectCartAmount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce(
		(sum: number, item: CartProduct) => sum + item.price * item.qty,
		0
	)
);
