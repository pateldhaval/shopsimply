// import './Categories.css';

import { CategoryItem } from '@/components/CategoryItem';

import { Section } from '../Section';

interface Props {
	// children: React.ReactNode;
}

export const Categories: React.FC<Props> = (props) => {
	const categories = [
		{
			id: 1,
			title: 'hats',
			imageUrl: 'https://i.ibb.co/cvpntL1/hats.png'
		},
		{
			id: 2,
			title: 'jackets',
			imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png'
		},
		{
			id: 3,
			title: 'sneakers',
			imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png'
		},
		{
			id: 4,
			title: 'womens',
			imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png'
		},
		{
			id: 5,
			title: 'mens',
			imageUrl: 'https://i.ibb.co/R70vBrQ/men.png'
		}
	];

	return (
		<Section>
			<h1 className='text-3xl font-bold mb-10'>Categories</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
				{categories.map((category) => (
					<div key={category.id} className='col-span-1'>
						<CategoryItem category={category} />
					</div>
				))}
			</div>
		</Section>
	);
};
