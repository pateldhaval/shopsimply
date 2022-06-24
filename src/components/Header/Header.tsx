// import './Header.css';

import { Link } from 'react-router-dom';

import { CartDropdown } from '@/components/CartDropdown';
import { useCartContext } from '@/utils/context/Card.context';
import { useGlobalContext } from '@/utils/context/Global.context';
import { signOutAuthUser } from '@/utils/firebase/firebase.util';

interface Props {
	// children: React.ReactNode;
}

export const Header: React.FC<Props> = (props) => {
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
						<span>
							<span>{userState.displayName}</span> |{' '}
							<button onClick={signOutAuthUser}>Sign Out</button>
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
