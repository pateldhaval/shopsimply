import { useState } from 'react';
import { Link } from 'react-router-dom';

import { CartDropdown } from '@/components/CartDropdown';
import { ProfileDropdown } from '@/components/ProfileDropdown';
import { userSelector } from '@/store/user/user.selector';
import { useCartContext } from '@/utils/context/Cart.context';

interface Props {}

export const Header: React.FC<Props> = (props) => {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { authUser } = userSelector();
	const { isCartOpen, toggleCartOpen, cartQty } = useCartContext();

	const handleCartOpen = () => {
		toggleCartOpen(!isCartOpen);
	};

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
					{authUser ? (
						<span className='relative'>
							<button onClick={() => setIsProfileOpen(!isProfileOpen)}>
								Profile
							</button>
							{isProfileOpen && <ProfileDropdown authUser={authUser} />}
						</span>
					) : (
						<Link to='/auth'>Sign In</Link>
					)}
					<span className='relative'>
						<button onClick={handleCartOpen}>
							Cart {cartQty > 0 && `[${cartQty}]`}
						</button>
						{isCartOpen && <CartDropdown />}
					</span>
				</div>
			</div>
		</header>
	);
};
