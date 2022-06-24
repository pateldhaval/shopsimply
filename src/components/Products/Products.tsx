// import './Categories.css';

import { CategoryItem } from '@/components/CategoryItem';
import { Section } from '@/components/Section';
import { useProductContext } from '@/utils/context/Product.context';

interface Props {
	// children: React.ReactNode;
}

export const Products: React.FC<Props> = (props) => {
	const { products } = useProductContext();
	return (
		<Section>
			<h1 className='text-3xl font-bold mb-10'>Categories</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
				{products.map((item: any) => (
					<div key={item.id} className='col-span-1'>
						{/* <CategoryItem category={category} /> */}
						{item.name}
					</div>
				))}
			</div>
		</Section>
	);
};
