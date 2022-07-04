import { createContext, useContext, useEffect, useReducer } from 'react';

import { Category, ShopState } from '@/app/types';
// import { dataShop } from '@/data/shop';
import {
	addCollectionAndDocuments,
	getCollectionAndDocuments
} from '@/utils/firebase/firebase.util';

const ShopContext = createContext<any>({
	categoriesMap: [],
	setCategoriesMap: () => null
});

// Initial state
const initialState: ShopState = {
	categoriesMap: {}
};

// Action types
const enum ShopActionTypes {
	SetCategoryMap = 'SetCategoryMap'
}

// Reducer
const shopReducer = (state: ShopState, action: any) => {
	switch (action.type) {
		case ShopActionTypes.SetCategoryMap:
			return {
				...state,
				categoriesMap: action.payload
			};
		default:
			return state;
	}
};

// Action creators
const setCategoriesMap = (categoriesMap: Category[] | {}) => {
	return {
		type: ShopActionTypes.SetCategoryMap,
		payload: categoriesMap
	};
};

// Context Provider
interface PropsProvider {
	children: React.ReactNode;
}

export const ShopProvider: React.FC<PropsProvider> = (props) => {
	const [state, dispatch] = useReducer(shopReducer, initialState);
	const { categoriesMap } = state;

	// Once time use to add data from json/js/ts to database
	// useEffect(() => {
	// 	addCollectionAndDocuments('categories', dataShop, 'title');
	// }, []);

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesMap = await getCollectionAndDocuments('categories');
			dispatch(setCategoriesMap(categoriesMap));
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
