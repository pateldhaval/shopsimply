import { Route, Routes } from 'react-router-dom';

import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import Reports from '@/pages/Reports';

import Layout from './Layout';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='reports' element={<Reports />} />
				<Route path='auth' element={<Auth />} />
			</Route>
		</Routes>
	);
};

export default Router;
