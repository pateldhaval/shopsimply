import { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>({
	isCartOpen: false,
	setIsCartOpen: () => null
});

interface PropsProvider {
	children: React.ReactNode;
}

export const CartProvider: React.FC<PropsProvider> = (props) => {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const values = { isCartOpen, setIsCartOpen };

	return (
		<CartContext.Provider value={values}>{props.children}</CartContext.Provider>
	);
};

export const useCartContext = () => {
	return useContext(CartContext);
};
