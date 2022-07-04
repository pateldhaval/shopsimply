import { Route, Routes } from 'react-router-dom';

import Layout from '@/app/Layout';
import Auth from '@/pages/Auth';
import Checkout from '@/pages/Checkout';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='auth' element={<Auth />} />
				<Route path='shop/*' element={<Shop />} />
				<Route path='checkout' element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default AppRouter;
