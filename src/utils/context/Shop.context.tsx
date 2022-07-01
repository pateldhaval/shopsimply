import { createContext, useContext, useEffect, useState } from 'react';

import { Category } from '@/app/types';
// import { dataShop } from '@/data/shop';
import {
	addCollectionAndDocuments,
	getCollectionAndDocuments
} from '@/utils/firebase/firebase.util';

const ShopContext = createContext<any>({
	categoriesMap: [],
	setCategoriesMap: () => null
});

interface PropsProvider {
	children: React.ReactNode;
}

export const ShopProvider: React.FC<PropsProvider> = (props) => {
	const [categoriesMap, setCategoriesMap] = useState<Category[] | {}[]>([]);

	// Once time use to add data from json/js/ts to database
	// useEffect(() => {
	// 	addCollectionAndDocuments('categories', dataShop, 'title');
	// }, []);

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesMap = await getCollectionAndDocuments('categories');
			// console.log(categoriesMap);
			setCategoriesMap(categoriesMap);
		};

		getCategoriesMap();
	}, []);

	// Context Provider
	const values = { categoriesMap, setCategoriesMap };
	return (
		<ShopContext.Provider value={values}>{props.children}</ShopContext.Provider>
	);
};

export const useShopContext = () => {
	return useContext(ShopContext);
};
