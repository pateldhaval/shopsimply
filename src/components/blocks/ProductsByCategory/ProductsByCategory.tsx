import { useParams } from 'react-router-dom';

import { ProductCard } from '@/components/blocks';
import { Section, SectionTitle, Spinner } from '@/components/ui';
import { useCategoriesQuery } from '@/store/categories/categories.api';
import { Category, Product } from '@/types/shop.type';

interface Props {}

export const ProductsByCategory: React.FC<Props> = (props) => {
	const { category: categoryName } = useParams();

	// [Select data from query result (Already fetched with RTK Query)]
	const { data: products, isLoading } = useCategoriesQuery(undefined, {
		selectFromResult: ({ data: categories, isLoading }) => {
			if (!categories) return { isLoading };

			const category = categories?.filter((category: Category) => category.title.toLowerCase() === categoryName);
			const products = category[0]?.products;
			return { data: products, isLoading };
		}
	});

	return (
		<Section>
			<SectionTitle className='text-center'>{categoryName?.toUpperCase()}</SectionTitle>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10'>
					{products?.map((product: Product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</Section>
	);
};
