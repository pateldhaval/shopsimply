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
		<header className='p-4 border-b'>
			<div className='container space-x-4'>
				<Link to='/'>Home</Link>
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
		</header>
	);
};
