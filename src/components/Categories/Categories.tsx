import { useSelector } from 'react-redux';

import { CategoryCard } from '@/components/CategoryCard';
import { Section } from '@/components/Section';
import { SectionTitle } from '@/components/SectionTitle';
import { Spinner } from '@/components/Spinner';
import {
	selectCategoriesLoading,
	selectCategoriesMap
} from '@/store/categories/categories.selector';

interface Props {}

export const Categories: React.FC<Props> = (props) => {
	const categoriesMap = useSelector(selectCategoriesMap);
	const loading = useSelector(selectCategoriesLoading);

	return (
		<Section>
			<SectionTitle>Categories</SectionTitle>
			{loading ? (
				<Spinner />
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
					{Object.keys(categoriesMap).map((title) => {
						const category = categoriesMap[title];
						return (
							category &&
							Object.keys(category).length > 0 && (
								<div key={title} className='col-span-1'>
									<CategoryCard category={category} />
								</div>
							)
						);
					})}
				</div>
			)}
		</Section>
	);
};
