// import './Header.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { CartDropdown } from '@/components/CartDropdown';
import { useCartContext } from '@/utils/context/Card.context';
import { useGlobalContext } from '@/utils/context/Global.context';
import { signOutAuthUser } from '@/utils/firebase/firebase.util';

import { Button } from '../Button';

interface Props {
	// children: React.ReactNode;
}

export const Header: React.FC<Props> = (props) => {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { userState } = useGlobalContext();
	const { isCartOpen, setIsCartOpen } = useCartContext();

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
							{isProfileOpen && (
								<div className='absolute top-14 left-0 w-40 p-4 bg-white shadow-md'>
									<div className='pb-3'>
										{userState.displayName ? userState.displayName : 'User'}
									</div>
									<div className='pt-4 border-t'>
										<Button onClick={signOutAuthUser}>Sign Out</Button>
									</div>
								</div>
							)}
						</span>
					) : (
						<Link to='/auth'>Sign In</Link>
					)}
					<button onClick={toggleCart}>Cart [0]</button>
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
		</header>
	);
};
