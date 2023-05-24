// import { useSelector } from 'react-redux';

import { CategoryCard } from '@/components/blocks';
import { Section, SectionTitle, Spinner } from '@/components/ui';
import { useCategoriesQuery } from '@/store/categories/categories.api';

// import { selectCategoriesLoading, selectCategoriesMap } from '@/store/categories/categories.selector';

interface Props {}

export const Categories: React.FC<Props> = (props) => {
	// [Select data from state (Already fetched with Saga)]
	// const categoriesMap = useSelector(selectCategoriesMap);
	// const isLoading = useSelector(selectCategoriesLoading);

	// [Select data from query result (Already fetched with RTK Query)]
	const { data: categories, isLoading } = useCategoriesQuery(undefined, {
		selectFromResult: ({ data, isLoading }) => ({ data, isLoading })
	});

	return (
		<Section>
			<SectionTitle>Categories</SectionTitle>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
					{categories &&
						categories.map((category) => {
							// const category = categories[title];
							return (
								<div key={category.title} className='col-span-1'>
									<CategoryCard category={category} />
								</div>
							);
						})}
				</div>
			)}
		</Section>
	);
};
