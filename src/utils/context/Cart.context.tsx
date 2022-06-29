import { createContext, useContext, useEffect, useState } from 'react';

import { Product } from '@/app/types';

const CartContext = createContext<any>({
	isCartOpen: false,
	setIsCartOpen: () => null,
	cartItems: [],
	addToCart: () => null,
	cartCount: 0,
	setCartQty: () => null,
	cartAmount: 0,
	setCartAmount: () => null
});

interface PropsProvider {
	children: React.ReactNode;
}

export const CartProvider: React.FC<PropsProvider> = (props) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState<any[]>([]);
	const [cartQty, setCartQty] = useState(0);
	const [cartAmount, setCartAmount] = useState(0);

	// Cart accumulated qty
	useEffect(() => {
		const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
		setCartQty(totalQty);
	}, [cartItems]);

	// Cart accumulated amount
	useEffect(() => {
		const totalAmount = cartItems.reduce(
			(sum, item) => sum + item.price * item.qty,
			0
		);
		setCartAmount(totalAmount);
	}, [cartItems]);

	// Add the cart functionality
	const addToCart = (product: Product) => {
		// Find if cartItems contains a product
		const existingCartItem = cartItems.find((item) => item.id === product.id);

		let newCartItems = [];

		if (existingCartItem) {
			// If found, create new array with incremented qty
			newCartItems = cartItems.map((item) =>
				item.id === product.id ? { ...item, qty: item.qty + 1 } : item
			);
		} else {
			// Else create new array with a new item
			newCartItems = [...cartItems, { ...product, qty: 1 }];
		}

		setCartItems(newCartItems);
	};

	const values = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		cartQty,
		cartAmount,
		addToCart
	};
	return (
		<CartContext.Provider value={values}>{props.children}</CartContext.Provider>
	);
};

export const useCartContext = () => {
	return useContext(CartContext);
};
