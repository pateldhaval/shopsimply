import { Route, Routes } from 'react-router-dom';

import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';

import Layout from './Layout';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='shop' element={<Shop />} />
				<Route path='auth' element={<Auth />} />
			</Route>
		</Routes>
	);
};

export default Router;
