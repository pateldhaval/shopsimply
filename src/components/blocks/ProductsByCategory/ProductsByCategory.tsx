import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductCard } from '@/components/blocks';
import { Section, SectionTitle, Spinner } from '@/components/ui';
import { useCategoriesQuery } from '@/store/categories/categories.api';
// import { selectCategoriesMap } from '@/store/categories/categories.selector';
import { Category, Product } from '@/types/shop.type';

interface Props {}

export const ProductsByCategory: React.FC<Props> = (props) => {
	const { category: categoryName } = useParams();
	const [products, setProducts] = useState<Product[]>([]);

	// [Select data from state (Already fetched with Saga)]
	// const categoriesMap = useSelector(selectCategoriesMap);

	// [Select data from query result (Already fetched with RTK Query)]
	const { data: categories, isLoading } = useCategoriesQuery(undefined, {
		selectFromResult: ({ data, isLoading }) => ({ data, isLoading })
	});

	// [Select products from the selected category]
	// [Old way]
	// useEffect(() => {
	// 	if (categoriesMap && categoriesMap[category!]) {
	// 		setProducts(categoriesMap[category!].products);
	// 	}
	// }, [category, categoriesMap]);

	// [New way]
	useEffect(() => {
		if (categories?.length) {
			const category = categories.filter((category: Category) => category.title.toLowerCase() === categoryName);
			setProducts(category[0]?.products);
		}
	}, [categories]);

	return (
		<Section>
			<SectionTitle className='text-center'>{categoryName?.toUpperCase()}</SectionTitle>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10'>
					{products.map((product: Product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</Section>
	);
};
