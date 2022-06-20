// import './Categories.css';

import { CategoryItem } from '@/components/CategoryItem';

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
		<>
			<div className='p-20'>
				<div className='container'>
					<h1 className='text-3xl font-bold mb-10'>Categories</h1>
					<div className='grid grid-cols-3 gap-10'>
						{categories.map((category) => (
							<CategoryItem category={category} key={category.id} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};
