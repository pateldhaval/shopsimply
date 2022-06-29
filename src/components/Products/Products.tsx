// import './Categories.css';

import { Section } from '@/components/Section';
import { useProductContext } from '@/utils/context/Product.context';

import { ProductCard } from '../ProductCard';
import { SectionTitle } from '../SectionTitle';

interface Props {
	// children: React.ReactNode;
}

export const Products: React.FC<Props> = (props) => {
	const { products } = useProductContext();
	return (
		<Section>
			<SectionTitle>Categories</SectionTitle>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
				{products.map((item: any) => (
					<div className='col-span-1' key={item.id}>
						<ProductCard product={item} />
					</div>
				))}
			</div>
		</Section>
	);
};
