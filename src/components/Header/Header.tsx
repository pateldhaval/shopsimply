// import './Header.css';

import { Link } from 'react-router-dom';

import { useGlobalContext } from '@/utils/Context';
import { signOutAuthUser } from '@/utils/firebase/firebase.util';

interface Props {
	// children: React.ReactNode;
}

export const Header: React.FC<Props> = (props) => {
	const { userState } = useGlobalContext();

	return (
		<header className='py-6 border-b'>
			<div className='container flex justify-between items-center'>
				<div>
					<Link to='/' className='font-bold uppercase'>
						ShopSimply
					</Link>
				</div>
				<div className='space-x-6'>
					<Link to='/reports'>Reports</Link>
					{userState ? (
						<span>
							<span>{userState.displayName}</span> |{' '}
							<button onClick={signOutAuthUser}>Sign Out</button>
						</span>
					) : (
						<Link to='/auth'>Sign In</Link>
					)}
				</div>
			</div>
		</header>
	);
};
