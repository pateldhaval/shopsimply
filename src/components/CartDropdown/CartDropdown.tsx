// import './CartDropdown.css';

import { Button } from '../Button';

interface Props {
	// children: React.ReactNode;
}

export const CartDropdown: React.FC<Props> = (props) => {
	return (
		<div className='w-60 absolute top-14 right-5 z-10 p-5 shadow-lg bg-white'>
			<div className='cart-items h-48'></div>
			<Button isBlock>Checkout</Button>
		</div>
	);
};
