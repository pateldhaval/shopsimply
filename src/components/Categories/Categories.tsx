// import './Categories.css';

import { CategoryItem } from '@/components/CategoryItem';
import { Section } from '@/components/Section';
import dataCategories from '@/data/categories.json';

interface Props {
	// children: React.ReactNode;
}

export const Categories: React.FC<Props> = (props) => {
	return (
		<Section>
			<h1 className='text-3xl font-bold mb-10'>Categories</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
				{dataCategories.map((category) => (
					<div key={category.id} className='col-span-1'>
						<CategoryItem category={category} />
					</div>
				))}
			</div>
		</Section>
	);
};
