// import './Categories.css';

import React from 'react';

import { CategoriesPreview } from '@/components/CategoriesPreview';
import { Section } from '@/components/Section';
import { useShopContext } from '@/utils/context/Shop.context';

interface Props {}

export const Products: React.FC<Props> = (props) => {
	const { categoriesMap } = useShopContext();

	return (
		<Section>
			<div className='space-y-20'>
				{Object.keys(categoriesMap).map((title) => {
					const category = categoriesMap[title];
					return (
						category &&
						Object.keys(category).length > 0 && (
							<CategoriesPreview
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
