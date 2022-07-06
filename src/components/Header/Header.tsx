import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CartDropdown } from '@/components/CartDropdown';
import { ProfileDropdown } from '@/components/ProfileDropdown';
import { toggleCartOpen } from '@/store/cart/cart.action';
import { selectCartQty, selectIsCartOpen } from '@/store/cart/cart.selector';
import { useSelectorUser } from '@/store/user/user.selector';

interface Props {}

export const Header: React.FC<Props> = (props) => {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const dispatch = useDispatch();
	const { authUser } = useSelectorUser();
	const cartQty = useSelector(selectCartQty);
	const isCartOpen = useSelector(selectIsCartOpen);

	const handleCartOpen = () => {
		dispatch(toggleCartOpen(!isCartOpen));
	};

	return (
		<header className='flex h-16 w-full sticky top-0 z-50 border-b bg-white'>
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
