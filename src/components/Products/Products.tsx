// import './Categories.css';

import React from 'react';

import { Section } from '@/components/Section';
import { useShopContext } from '@/utils/context/Shop.context';

import { ProductCard } from '../ProductCard';
import { SectionTitle } from '../SectionTitle';

interface Props {
	// children: React.ReactNode;
}

export const Products: React.FC<Props> = (props) => {
	const { categoriesMap } = useShopContext();
	// console.log(categoriesMap);

	return (
		<Section>
			<div className='space-y-20'>
				{Object.keys(categoriesMap).map((title) => {
					const products = categoriesMap[title];
					return (
						products && (
							<div key={title}>
								<SectionTitle>{title}</SectionTitle>
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
									{products.map((product: any) => (
										<div className='col-span-1' key={product.id}>
											<ProductCard product={product} />
										</div>
									))}
								</div>
							</div>
						)
					);
				})}
			</div>
		</Section>
	);
};
