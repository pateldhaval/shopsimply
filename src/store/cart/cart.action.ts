import { CartProduct, Product } from '@/app/types';
import { actionCreator } from '@/utils/redux/redux.utils';

import { CartActionTypes } from './cart.types';

// Add the cart functionality
export const addToCart = (cartItems: CartProduct[], product: Product) => {
	// Find if cartItems contains a product
	const existingCartItem = cartItems.find(
		(item: CartProduct) => item.id === product.id
	);

	let newCartItems = [];
	if (existingCartItem) {
		// If found, create new array with incremented qty
		newCartItems = cartItems.map((item: CartProduct) =>
			item.id === product.id ? { ...item, qty: item.qty + 1 } : item
		);
	} else {
		// Else create new array with a new item
		newCartItems = [...cartItems, { ...product, qty: 1 }];
	}

	return actionCreator(CartActionTypes.SetCartUpdate, newCartItems);
};

// Remove from the cart functionality
export const removeFromCart = (cartItems: CartProduct[], product: Product) => {
	// Find if cartItems contains a product
	const existingCartItem = cartItems.find(
		(item: CartProduct) => item.id === product.id
	);

	let newCartItems = [];
	if (existingCartItem?.qty === 1) {
		// If only 1 qty, create new array with a removed item
		newCartItems = cartItems.filter(
			(item: CartProduct) => item.id !== product.id
		);
	} else {
		// Else, create new array with decremented qty
		newCartItems = cartItems.map((item: CartProduct) =>
			item.id === product.id ? { ...item, qty: item.qty - 1 } : item
		);
	}

	return actionCreator(CartActionTypes.SetCartUpdate, newCartItems);
};

export const deleteFromCart = (cartItems: CartProduct[], product: Product) => {
	// New array with deleted item
	const newCartItems = cartItems.filter(
		(item: CartProduct) => item.id !== product.id
	);

	return actionCreator(CartActionTypes.SetCartUpdate, newCartItems);
};

export const toggleCartOpen = (isCartOpen: boolean) =>
	actionCreator(CartActionTypes.SetIsCartOpen, isCartOpen);
