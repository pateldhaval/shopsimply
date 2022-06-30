import { createContext, useContext, useEffect, useState } from 'react';

// import { dataShop } from '@/data/shop';
// import { addCollectionAndDocumentsOnce } from '../firebase/firebase.util';

const ProductContext = createContext<any>({
	products: [],
	setProducts: () => null
});

interface PropsProvider {
	children: React.ReactNode;
}

export const ProductProvider: React.FC<PropsProvider> = (props) => {
	const [products, setProducts] = useState([]);

	// Once time use to add data from json/js/ts to database
	// useEffect(() => {
	// 	addCollectionAndDocumentsOnce('categories', dataShop, 'title');
	// }, []);

	// Context Provider
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
