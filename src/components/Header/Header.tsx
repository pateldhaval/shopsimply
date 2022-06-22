// import './Header.css';

import { Link } from 'react-router-dom';

interface Props {
	// children: React.ReactNode;
}

export const Header: React.FC<Props> = (props) => {
	return (
		<header className='p-4 border-b'>
			<div className='container space-x-4'>
				<Link to='/'>Home</Link>
				<Link to='/reports'>Reports</Link>
				<Link to='/auth'>Sign In</Link>
			</div>
		</header>
	);
};
