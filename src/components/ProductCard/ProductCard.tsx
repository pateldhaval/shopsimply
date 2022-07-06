import { useDispatch, useSelector } from 'react-redux';

import { Product } from '@/app/types';
import { Button } from '@/components/Button';
import { addToCart } from '@/store/cart/cart.action';
import { selectCartItems } from '@/store/cart/cart.selector';

interface Props {
	product: Product;
}

export const ProductCard: React.FC<Props> = (props) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const { name, imageUrl, price } = props.product;

	const handleAddToCart = () => dispatch(addToCart(cartItems, props.product));

	return (
		<div
			className='group h-96 bg-no-repeat bg-cover bg-center relative'
			style={{ backgroundImage: `url(${imageUrl})` }}
		>
			<div className='absolute inset-y-2/4 -mt-10 w-full text-center hidden group-hover:block'>
				<Button onClick={handleAddToCart}>Add to Cart</Button>
			</div>
			<div className='absolute bottom-0 left-0 w-full p-5 capitalize bg-slate-200/90 hover:bg-slate-300/90'>
				<h2 className='text-2xl'>{name}</h2>
				<p>${price}</p>
			</div>
		</div>
	);
};
