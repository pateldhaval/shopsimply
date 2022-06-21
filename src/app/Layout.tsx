import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<div>
			<header className='p-4 border-b space-x-2'>
				<Link to='/'>Home</Link>
				<Link to='/reports'>Reports</Link>
				<Link to='/login'>Login</Link>
			</header>
			<main>
				<Outlet />
			</main>
			<footer className='p-4 border-t'>Footer</footer>
		</div>
	);
};

export default Layout;
