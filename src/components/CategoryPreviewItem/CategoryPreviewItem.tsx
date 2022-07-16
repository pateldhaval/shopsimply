import { Link } from 'react-router-dom';

import { Product } from '@/app/types';
import { ProductCard } from '@/components/ProductCard';
import { SectionTitle } from '@/components/SectionTitle';

interface Props {
	title: string;
	products: Product[];
}

export const CategoryPreviewItem: React.FC<Props> = (props) => {
	const { title, products } = props;

	return (
		<div>
			<SectionTitle>
				<Link to={`/shop/${title}`}>{title.toUpperCase()}</Link>
			</SectionTitle>
			<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10'>
				{products
					// Filter first 4 products from the array
					.filter((_, index) => index < 4)
					// Then show remaining products
					.map((product) => (
						<div className='col-span-1' key={product.id}>
							<ProductCard product={product} />
						</div>
					))}
			</div>
		</div>
	);
};
