// import './CheckoutList.css';

import { CartProduct } from '@/app/types';
import { CheckoutItem } from '@/components/CheckoutItem';
import { useCartContext } from '@/utils/context/Cart.context';

import { Section } from '../Section';
import { SectionTitle } from '../SectionTitle';

interface Props {
	// children: React.ReactNode;
}

export const CheckoutList: React.FC<Props> = (props) => {
	const { cartItems, cartQty, cartAmount } = useCartContext();
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
					<div className='flex justify-center items-center'>
						No items in cart to checkout
					</div>
				)}
			</div>
			{cartItems.length && (
				<div className='mt-6 text-right text-2xl p-4'>
					Total: <span className='font-bold'>${cartAmount}</span>
				</div>
			)}
		</Section>
	);
};
