// import './CartDropdown.css';

import { useNavigate } from 'react-router-dom';

import { CartProduct } from '@/app/types';
import { useCartContext } from '@/utils/context/Cart.context';

import { Button } from '../Button';
import { CartItem } from '../CartItem';

interface Props {
	// children: React.ReactNode;
}

export const CartDropdown: React.FC<Props> = (props) => {
	const { cartItems, cartQty, cartAmount, setIsCartOpen } = useCartContext();
	const navigate = useNavigate();

	const handleGoToCheckout = () => {
		navigate('checkout');
		setIsCartOpen(false);
	};

	return (
		<>
			<div className='w-72 absolute top-14 right-0 z-10 shadow-lg pt-4 bg-white'>
				{cartQty > 0 ? (
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
