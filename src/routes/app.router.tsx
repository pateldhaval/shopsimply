import { Route, Routes } from 'react-router-dom';

import Layout from '@/app/Layout';
import { Categories, CheckoutList, Signin, Signup } from '@/components/pages';

import ShopRouter from './shop.router';

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Categories />} />
				<Route path='auth' element={<Signin />} />
				<Route path='register' element={<Signup />} />
				<Route path='shop/*' element={<ShopRouter />} />
				<Route path='checkout' element={<CheckoutList />} />
			</Route>
		</Routes>
	);
};

export default AppRouter;
