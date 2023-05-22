import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Product } from '@/app/types';
import { ProductCard } from '@/components/ProductCard';
import { Section } from '@/components/Section';
import { SectionTitle } from '@/components/SectionTitle';
import { selectCategoriesMap } from '@/store/categories/categories.selector';

interface Props {}

export const ProductsByCategory: React.FC<Props> = (props) => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		if (categoriesMap && categoriesMap[category!]) {
			setProducts(categoriesMap[category!].products);
		}
	}, [category, categoriesMap]);

	return (
		<Section>
			<SectionTitle className='text-center'>{category?.toUpperCase()}</SectionTitle>
			<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10'>
				{products && products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
			</div>
		</Section>
	);
};
