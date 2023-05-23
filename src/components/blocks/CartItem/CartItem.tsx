import { CartProduct } from '@/types/shop.type';

interface Props {
	cartItem: CartProduct;
}

export const CartItem: React.FC<Props> = (props) => {
	const { name, imageUrl, price, qty } = props.cartItem;
	return (
		<div className='flex gap-4'>
			<div>
				<img src={imageUrl} alt={`${name}`} className='w-12' />
			</div>
			<div>
				<strong className='block'>{name}</strong>
				<span className='block'>
					{qty} x ${price}
				</span>
			</div>
		</div>
	);
};
