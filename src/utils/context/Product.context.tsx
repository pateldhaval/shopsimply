import { createContext, useContext, useEffect, useState } from 'react';

import { getCollectionAndDocuments } from '@/utils/firebase/firebase.util';

// import { dataShop } from '@/data/shop';
// import { addCollectionAndDocuments } from '@/utils/firebase/firebase.util';

const ProductContext = createContext<any>({
	products: [],
	setProducts: () => null
});

interface PropsProvider {
	children: React.ReactNode;
}

export const ProductProvider: React.FC<PropsProvider> = (props) => {
	const [products, setProducts] = useState<any>([]);

	// Once time use to add data from json/js/ts to database
	// useEffect(() => {
	// 	addCollectionAndDocuments('categories', dataShop, 'title');
	// }, []);

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesMap = await getCollectionAndDocuments('categories');
			setProducts(categoriesMap);
		};

		getCategoriesMap();
	}, []);

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
