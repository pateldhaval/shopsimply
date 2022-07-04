// import './CheckoutItem.css';

import { CartProduct } from '@/app/types';
import { useCartContext } from '@/utils/context/Cart.context';

interface Props {
	cartItem: CartProduct;
}

export const CheckoutItem: React.FC<Props> = (props) => {
	const { addToCart, removeFromCart, deleteFromCart } = useCartContext();
	const { name, imageUrl, price, qty } = props.cartItem;

	const handleAddToCart = () => addToCart(props.cartItem);
	const handleRemoveFromCart = () => removeFromCart(props.cartItem);
	const handleDeleteFromCart = () => deleteFromCart(props.cartItem);

	return (
		<>
			<div className='flex items-center gap-4 border-b pb-4'>
				<img src={imageUrl} alt={`${name}`} className='w-24' />
				<div className='flex-grow text-xl space-y-2'>
					<div className='flex justify-between items-center'>
						<h3 className='font-bold'>{name}</h3>
						<div
							className='cursor-pointer text-2xl'
							onClick={handleDeleteFromCart}
						>
							&times;
						</div>
					</div>
					<div className='flex justify-between items-center gap-10'>
						<div>Price: ${price}</div>
					</div>
					<div className='flex justify-between items-center gap-10'>
						<div className='space-x-4'>
							<span>Qty:</span>
							<span
								className='cursor-pointer select-none'
								title='Decrease quantity'
								onClick={handleRemoveFromCart}
							>
								&#10094;
							</span>
							<span>{qty}</span>
							<span
								className='cursor-pointer select-none'
								title='Increase quantity'
								onClick={handleAddToCart}
							>
								&#10095;
							</span>
						</div>
						<div>${price * qty}</div>
					</div>
				</div>
			</div>
		</>
	);
};
