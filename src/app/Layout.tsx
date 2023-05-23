import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/components/blocks';

const Layout = () => {
	return (
		<div>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
