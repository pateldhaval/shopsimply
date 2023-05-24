import React from 'react';

// import { useSelector } from 'react-redux';
import { CategoryPreviewItem } from '@/components/blocks';
import { Section, Spinner } from '@/components/ui';
import { useCategoriesQuery } from '@/store/categories/categories.api';

// import { selectCategoriesMap } from '@/store/categories/categories.selector';

interface Props {}

export const CategoriesPreview: React.FC<Props> = (props) => {
	// [Select data from state (Already fetched with Saga)]
	// const categoriesMap = useSelector(selectCategoriesMap);

	// [Select data from query result (Already fetched with RTK Query)]
	const { data: categories, isLoading } = useCategoriesQuery(undefined, {
		selectFromResult: ({ data, isLoading }) => ({ data, isLoading })
	});

	return (
		<Section>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='space-y-20'>
					{categories &&
						categories.map((category) => (
							<CategoryPreviewItem key={category.title} title={category.title} products={category.products} />
						))}
				</div>
			)}
		</Section>
	);
};
