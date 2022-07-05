import { createContext, useContext, useReducer } from 'react';

import { CartProduct, CartState, Product } from '@/app/types';

const CartContext = createContext<any>({});

// Initial state
const initialState: CartState = {
	cartItems: [],
	cartQty: 0,
	cartAmount: 0,
	isCartOpen: false
};

// Action types
const enum CartActionTypes {
	SetCartUpdate = 'SetCartUpdate',
	SetIsCartOpen = 'SetIsCartOpen'
}

// Reducer
const cartReducer = (state: CartState, action: any) => {
	switch (action.type) {
		case CartActionTypes.SetCartUpdate:
			return {
				...state,
				...action.payload
			};
		case CartActionTypes.SetIsCartOpen:
			return {
				...state,
				isCartOpen: action.payload
			};
		default:
			return state;
	}
};

// Action creators
const setCartUpdate = (cartProps: any) => {
	return {
		type: CartActionTypes.SetCartUpdate,
		payload: cartProps
	};
};
const setIsCartOpen = (isCartOpen: boolean) => {
	return {
		type: CartActionTypes.SetIsCartOpen,
		payload: isCartOpen
	};
};

// Context Provider
interface PropsProvider {
	children: React.ReactNode;
}

export const CartProvider: React.FC<PropsProvider> = (props) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);
	const { cartItems, cartQty, cartAmount, isCartOpen } = state;

	const updateCart = (newCartItems: CartProduct[]) => {
		// Cart accumulated qty
		const totalQty = newCartItems.reduce(
			(sum: number, item: CartProduct) => sum + item.qty,
			0
		);

		// Cart accumulated amount
		const totalAmount = newCartItems.reduce(
			(sum: number, item: CartProduct) => sum + item.price * item.qty,
			0
		);

		dispatch(
			setCartUpdate({
				cartItems: newCartItems,
				cartQty: totalQty,
				cartAmount: totalAmount
			})
		);
	};

	// Add the cart functionality
	const addToCart = (product: Product) => {
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

		updateCart(newCartItems);
	};

	// Remove from the cart functionality
	const removeFromCart = (product: Product) => {
		// Find if cartItems contains a product
		const existingCartItem = cartItems.find(
			(item: CartProduct) => item.id === product.id
		);

		let newCartItems = [];
		if (existingCartItem.qty === 1) {
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

		updateCart(newCartItems);
	};

	const deleteFromCart = (product: Product) => {
		// New array with deleted item
		const newCartItems = cartItems.filter(
			(item: CartProduct) => item.id !== product.id
		);

		updateCart(newCartItems);
	};

	const toggleCartOpen = (isOpen: boolean) => dispatch(setIsCartOpen(isOpen));

	const values = {
		isCartOpen,
		toggleCartOpen,
		cartItems,
		cartQty,
		cartAmount,
		addToCart,
		removeFromCart,
		deleteFromCart
	};
	return (
		<CartContext.Provider value={values}>{props.children}</CartContext.Provider>
	);
};

export const useCartContext = () => {
	return useContext(CartContext);
};
