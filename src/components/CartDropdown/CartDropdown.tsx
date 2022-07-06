import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CartProduct } from '@/app/types';
import { Button } from '@/components/Button';
import { CartItem } from '@/components/CartItem';
import { toggleCartOpen } from '@/store/cart/cart.action';
import { selectCartAmount, selectCartItems } from '@/store/cart/cart.selector';

interface Props {}

export const CartDropdown: React.FC<Props> = (props) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const cartAmount = useSelector(selectCartAmount);
	const navigate = useNavigate();

	const handleGoToCheckout = () => {
		navigate('checkout');
		dispatch(toggleCartOpen(false));
	};

	return (
		<>
			<div className='w-72 absolute top-14 right-0 z-10 shadow-lg pt-4 bg-white'>
				{cartItems.length ? (
					<>
						<div className='h-60 overflow-auto space-y-4 px-4'>
							{cartItems.map((item: CartProduct) => (
								<CartItem key={item.id} cartItem={item} />
							))}
						</div>
						<div className='p-4'>
							<Button block onClick={handleGoToCheckout}>
								Checkout <strong>${cartAmount}</strong>
							</Button>
						</div>
					</>
				) : (
					<div className='h-20 flex justify-center items-center'>
						Cart is Empty
					</div>
				)}
			</div>
		</>
	);
};
