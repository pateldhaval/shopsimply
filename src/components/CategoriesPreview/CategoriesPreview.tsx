import React from 'react';

import { CategoryPreviewItem } from '@/components/CategoryPreviewItem';
import { Section } from '@/components/Section';
import { useSelectorCategories } from '@/store/categories/categories.selector';

interface Props {}

export const CategoriesPreview: React.FC<Props> = (props) => {
	const { categoriesMap } = useSelectorCategories();

	return (
		<Section>
			<div className='space-y-20'>
				{Object.keys(categoriesMap).map((title) => {
					const category = categoriesMap[title];
					return (
						category &&
						Object.keys(category).length > 0 && (
							<CategoryPreviewItem
								key={title}
								title={title}
								products={category.products}
							/>
						)
					);
				})}
			</div>
		</Section>
	);
};
