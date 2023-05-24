import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CartDropdown, ProfileDropdown } from '@/components/blocks';
import { useGetUserProfileQuery } from '@/store/auth/auth.api';
import { selectCartQty, selectIsCartOpen } from '@/store/cart/cart.selector';
import { toggleCartOpen } from '@/store/cart/cart.slice';

interface Props {}

export const Header: React.FC<Props> = (props) => {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const dispatch = useDispatch();
	const cartQty = useSelector(selectCartQty);
	const isCartOpen = useSelector(selectIsCartOpen);

	const { data: profile, isLoading: isLoadingAuth } = useGetUserProfileQuery(undefined, {
		selectFromResult: ({ data, isLoading, isError }) => ({ data, isLoading, isError })
	});

	const handleCartOpen = () => {
		dispatch(toggleCartOpen(!isCartOpen));
	};

	const handleOnSignOut = () => {
		setIsProfileOpen(false);
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
					{isLoadingAuth ? (
						<span>Loading...</span>
					) : (
						<>
							{profile ? (
								<span className='relative'>
									<button onClick={() => setIsProfileOpen(!isProfileOpen)}>Profile</button>
									{isProfileOpen && <ProfileDropdown profile={profile} onSignOut={handleOnSignOut} />}
								</span>
							) : (
								<Link to='/auth'>Sign In</Link>
							)}
						</>
					)}
					<span className='relative'>
						<button onClick={handleCartOpen}>Cart {cartQty > 0 && `[${cartQty}]`}</button>
						{isCartOpen && <CartDropdown />}
					</span>
				</div>
			</div>
		</header>
	);
};
