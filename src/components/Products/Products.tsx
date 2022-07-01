// import './Categories.css';

import React from 'react';

import { Section } from '@/components/Section';
import { useProductContext } from '@/utils/context/Product.context';

import { ProductCard } from '../ProductCard';
import { SectionTitle } from '../SectionTitle';

interface Props {
	// children: React.ReactNode;
}

export const Products: React.FC<Props> = (props) => {
	const { products } = useProductContext();

	return (
		<Section>
			<SectionTitle>Products</SectionTitle>
			<div className='space-y-10'>
				{Object.keys(products).map((title) => {
					const prods = products[title];
					return (
						prods && (
							<div key={title}>
								<h1 className='font-bold text-2xl mb-4'>{title}</h1>
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
									{prods.map((product: any) => (
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
