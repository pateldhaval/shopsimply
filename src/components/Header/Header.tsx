// import './Header.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { CartDropdown } from '@/components/CartDropdown';
import { useCartContext } from '@/utils/context/Cart.context';
import { useGlobalContext } from '@/utils/context/Global.context';

import { ProfileDropdown } from '../ProfileDropdown';

interface Props {
	// children: React.ReactNode;
}

export const Header: React.FC<Props> = (props) => {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { userState } = useGlobalContext();
	const { isCartOpen, setIsCartOpen, cartQty } = useCartContext();

	const toggleCart = () => setIsCartOpen(!isCartOpen);

	return (
		<header className='py-6 border-b'>
			<div className='container relative flex justify-between items-center'>
				<div>
					<Link to='/' className='font-bold uppercase'>
						ShopSimply
					</Link>
				</div>
				<div className='space-x-6'>
					<Link to='/shop'>Shop</Link>
					{userState ? (
						<span className='relative'>
							<button onClick={() => setIsProfileOpen(!isProfileOpen)}>
								Profile
							</button>
							{isProfileOpen && <ProfileDropdown user={userState} />}
						</span>
					) : (
						<Link to='/auth'>Sign In</Link>
					)}
					<span className='relative'>
						<button onClick={toggleCart}>
							Cart {cartQty > 0 && `[${cartQty}]`}
						</button>
						{isCartOpen && <CartDropdown />}
					</span>
				</div>
			</div>
		</header>
	);
};
