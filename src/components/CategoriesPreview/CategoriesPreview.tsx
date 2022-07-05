import React from 'react';
import { useSelector } from 'react-redux';

import { CategoryPreviewItem } from '@/components/CategoryPreviewItem';
import { Section } from '@/components/Section';
import { selectCategoriesMap } from '@/store/categories/categories.selector';

interface Props {}

export const CategoriesPreview: React.FC<Props> = (props) => {
	const categoriesMap = useSelector(selectCategoriesMap);

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
