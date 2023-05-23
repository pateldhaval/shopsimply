import { useDispatch } from 'react-redux';

import { addItemToCart, deleteItemFromCart, removeItemWithZeroQty } from '@/store/cart/cart.slice';
import { CartProduct } from '@/types/shop.type';

interface Props {
	cartItem: CartProduct;
}

export const CheckoutItem: React.FC<Props> = (props) => {
	const { cartItem } = props;
	const { name, imageUrl, price, qty } = cartItem;

	const dispatch = useDispatch();

	const handleAddToCart = () => dispatch(addItemToCart(cartItem));
	const handleRemoveFromCart = () => dispatch(removeItemWithZeroQty(cartItem));
	const handleDeleteFromCart = () => dispatch(deleteItemFromCart(cartItem));

	return (
		<>
			<div className='flex items-center gap-4 border-b pb-4'>
				<img src={imageUrl} alt={`${name}`} className='w-24' />
				<div className='flex-grow text-xl space-y-2'>
					<div className='flex justify-between items-center'>
						<h3 className='font-bold'>{name}</h3>
						<div className='cursor-pointer text-2xl' onClick={handleDeleteFromCart}>
							&times;
						</div>
					</div>
					<div className='flex justify-between items-center gap-10'>
						<div>Price: ${price}</div>
					</div>
					<div className='flex justify-between items-center gap-10'>
						<div className='space-x-4'>
							<span>Qty:</span>
							<span className='cursor-pointer select-none' title='Decrease quantity' onClick={handleRemoveFromCart}>
								&#10094;
							</span>
							<span>{qty}</span>
							<span className='cursor-pointer select-none' title='Increase quantity' onClick={handleAddToCart}>
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
