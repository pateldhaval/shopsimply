import { Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import Login from '@/pages/login';
import Reports from '@/pages/Reports';

import Layout from './Layout';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='reports' element={<Reports />} />
				<Route path='login' element={<Login />} />
			</Route>
		</Routes>
	);
};

export default Router;
