import { Category } from '@/types/shop.type';
import { getCollectionAndDocuments } from '@/utils/firebase/firebase.util';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
	reducerPath: 'categoriesApi',
	baseQuery: fakeBaseQuery(),
	endpoints: (builder) => ({
		categories: builder.query<any[], void>({
			queryFn: async () => {
				const categories = (await getCollectionAndDocuments('categories')) as Category[];
				// const categoriesMap = categories.reduce((acc: any, category: Category) => {
				// 	const { title, imageUrl, products } = category;
				// 	acc[title.toLowerCase()] = { title, imageUrl, products };
				// 	return acc;
				// }, []);
				// console.log(categoriesMap);
				return { data: categories };
			}
		})
	})
});

export const { useCategoriesQuery } = categoriesApi;
