import { Route, Routes } from 'react-router-dom';

import Dashboard from '@/pages/Dashboard';

function Router() {
	return (
		<Routes>
			<Route path='/' element={<Dashboard />} />
		</Routes>
	);
}

export default Router;
