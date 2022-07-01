// import './Categories.css';

import { CategoryItem } from '@/components/CategoryItem';
import { Section } from '@/components/Section';
import { useShopContext } from '@/utils/context/Shop.context';

interface Props {
	// children: React.ReactNode;
}

export const Categories: React.FC<Props> = (props) => {
	const { categoriesMap } = useShopContext();
	// console.log(categoriesMap);

	return (
		<Section>
			<h1 className='text-3xl font-bold mb-10'>Categories</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
				{Object.keys(categoriesMap).map((title) => {
					const category = categoriesMap[title];
					return (
						category &&
						Object.keys(category).length > 0 && (
							<div key={title} className='col-span-1'>
								<CategoryItem category={category} />
							</div>
						)
					);
				})}
			</div>
		</Section>
	);
};
