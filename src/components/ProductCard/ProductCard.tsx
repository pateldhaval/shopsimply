// import './ProductCard.css';

import { Product } from '@/app/types';
import { useCartContext } from '@/utils/context/Cart.context';

import { Button } from '../Button';

interface Props {
	// children: React.ReactNode;
	product: Product;
}

export const ProductCard: React.FC<Props> = (props) => {
	const { addToCart } = useCartContext();
	const { name, imageUrl, price } = props.product;

	const handleAddToCart = () => addToCart(props.product);

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
