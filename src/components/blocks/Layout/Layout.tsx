import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/components/blocks';

export const Layout = () => {
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
