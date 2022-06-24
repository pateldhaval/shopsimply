import { createContext, useContext, useState } from 'react';

import dataProducts from '../../data/products.json';

const ProductContext = createContext<any>({
	products: [],
	setProducts: () => null
});

interface PropsProvider {
	children: React.ReactNode;
}

export const ProductProvider: React.FC<PropsProvider> = (props) => {
	const [products, setProducts] = useState(dataProducts);
	const values = { products, setProducts };
	return (
		<ProductContext.Provider value={values}>
			{props.children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => {
	return useContext(ProductContext);
};
