import { useSelector } from 'react-redux';

import { CartProduct } from '@/app/types';
import { CheckoutItem } from '@/components/CheckoutItem';
import { Section } from '@/components/Section';
import { SectionTitle } from '@/components/SectionTitle';
import { selectCartAmount, selectCartItems } from '@/store/cart/cart.selector';

interface Props {}

export const CheckoutList: React.FC<Props> = (props) => {
	const cartItems = useSelector(selectCartItems);
	const cartAmount = useSelector(selectCartAmount);

	return (
		<Section>
			<SectionTitle>Items to checkout</SectionTitle>
			<div>
				{cartItems.length ? (
					<>
						<div className='space-y-4 px-4'>
							{cartItems.map((item: CartProduct) => (
								<CheckoutItem key={item.id} cartItem={item} />
							))}
						</div>
					</>
				) : (
					<div className='flex justify-center items-center'>No items in cart to checkout</div>
				)}
			</div>
			{cartItems.length > 0 && (
				<div className='mt-6 text-right text-2xl p-4'>
					Total: <span className='font-bold'>${cartAmount}</span>
				</div>
			)}
		</Section>
	);
};
