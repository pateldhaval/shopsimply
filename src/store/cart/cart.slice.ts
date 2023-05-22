import { CartProduct, Product } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartState } from './cart.types';

const initialState: CartState = {
	cartItems: [],
	isCartOpen: false
};

// =====================================
// [Utility functions]
// =====================================
// [Add the cart functionality]
const addToCart = (cartItems: CartProduct[], product: Product) => {
	// [Find if cartItems contains a product]
	const existingCartItem = cartItems.find((item: CartProduct) => item.id === product.id);

	let newCartItems = [];
	if (existingCartItem) {
		// [If found, create new array with incremented qty]
		newCartItems = cartItems.map((item: CartProduct) =>
			item.id === product.id ? { ...item, qty: item.qty + 1 } : item
		);
	} else {
		// [Else create new array with a new item]
		newCartItems = [...cartItems, { ...product, qty: 1 }];
	}

	return newCartItems;
};

// [Remove from the cart functionality]
const removeWithZeroQty = (cartItems: CartProduct[], product: Product) => {
	// [Find if cartItems contains a product]
	const existingCartItem = cartItems.find((item: CartProduct) => item.id === product.id);

	let newCartItems = [];
	if (existingCartItem?.qty === 1) {
		// [If only 1 qty, create new array with a removed item]
		newCartItems = cartItems.filter((item: CartProduct) => item.id !== product.id);
	} else {
		// [Else, create new array with decremented qty]
		newCartItems = cartItems.map((item: CartProduct) =>
			item.id === product.id ? { ...item, qty: item.qty - 1 } : item
		);
	}

	return newCartItems;
};

export const deleteFromCart = (cartItems: CartProduct[], product: Product) => {
	// [New array with deleted item]
	const newCartItems = cartItems.filter((item: CartProduct) => item.id !== product.id);

	return newCartItems;
};

// =====================================
// [Slice]
// =====================================
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart: (state: CartState, action: PayloadAction<CartProduct>) => {
			state.cartItems = addToCart(state.cartItems, action.payload);
		},
		removeItemWithZeroQty: (state: CartState, action: PayloadAction<CartProduct>) => {
			state.cartItems = removeWithZeroQty(state.cartItems, action.payload);
		},
		deleteItemFromCart: (state: CartState, action: PayloadAction<CartProduct>) => {
			state.cartItems = deleteFromCart(state.cartItems, action.payload);
		},
		toggleCartOpen: (state: CartState, action: PayloadAction<boolean>) => {
			state.isCartOpen = action.payload;
		}
	}
});

export const { addItemToCart, removeItemWithZeroQty, deleteItemFromCart, toggleCartOpen } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
