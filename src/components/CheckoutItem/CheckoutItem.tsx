// import './CheckoutItem.css';

import { CartProduct } from '@/app/types';

interface Props {
	// children: React.ReactNode;
	cartItem: CartProduct;
}

export const CheckoutItem: React.FC<Props> = (props) => {
	const { name, imageUrl, price, qty } = props.cartItem;
	return (
		<>
			<div className='flex items-center gap-4 border-b pb-4'>
				<img src={imageUrl} alt={`${name}`} className='w-24' />
				<div className='flex-grow text-xl space-y-2'>
					<div className='flex justify-between items-center'>
						<h3 className='font-bold'>{name}</h3>
						<div className='cursor-pointer text-2xl'>&times;</div>
					</div>
					<div className='flex justify-between items-center gap-10'>
						<div>Price: ${price}</div>
					</div>
					<div className='flex justify-between items-center gap-10'>
						<div className='space-x-4'>
							<span>Qty:</span>
							<span className='cursor-pointer'>&#10094;</span>
							<span>{qty}</span>
							<span className='cursor-pointer'>&#10095;</span>
						</div>
						<div>${price * qty}</div>
					</div>
				</div>
			</div>
		</>
	);
};
