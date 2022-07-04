import { createContext, useContext, useEffect, useReducer } from 'react';

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
	SetCartItems = 'SetCartItems',
	SetCartQty = 'SetCartQty',
	SetCartAmount = 'SetCartAmount',
	SetIsCartOpen = 'SetIsCartOpen'
}

// Reducer
const cartReducer = (state: CartState, action: any) => {
	switch (action.type) {
		case CartActionTypes.SetCartItems:
			return {
				...state,
				cartItems: action.payload
			};
		case CartActionTypes.SetCartQty:
			return {
				...state,
				cartQty: action.payload
			};
		case CartActionTypes.SetCartAmount:
			return {
				...state,
				cartAmount: action.payload
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
const setCartItems = (cartItems: CartProduct[]) => {
	return {
		type: CartActionTypes.SetCartItems,
		payload: cartItems
	};
};
const setCartQty = (cartQty: number) => {
	return {
		type: CartActionTypes.SetCartQty,
		payload: cartQty
	};
};
const setCartAmount = (cartAmount: number) => {
	return {
		type: CartActionTypes.SetCartAmount,
		payload: cartAmount
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

	// Cart accumulated qty
	useEffect(() => {
		const totalQty = cartItems.reduce(
			(sum: number, item: CartProduct) => sum + item.qty,
			0
		);
		dispatch(setCartQty(totalQty));
	}, [cartItems]);

	// Cart accumulated amount
	useEffect(() => {
		const totalAmount = cartItems.reduce(
			(sum: number, item: CartProduct) => sum + item.price * item.qty,
			0
		);
		dispatch(setCartAmount(totalAmount));
	}, [cartItems]);

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

		// Set state with new array
		dispatch(setCartItems(newCartItems));
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

		// Set state with new array
		dispatch(setCartItems(newCartItems));
	};

	const deleteFromCart = (product: Product) => {
		// New array with deleted item
		const newCartItems = cartItems.filter(
			(item: CartProduct) => item.id !== product.id
		);
		// Set state with new array
		dispatch(setCartItems(newCartItems));
	};

	const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen));
	const closeCart = () => dispatch(setIsCartOpen(false));

	const values = {
		isCartOpen,
		toggleCart,
		closeCart,
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
