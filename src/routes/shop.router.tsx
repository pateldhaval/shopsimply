import { Route, Routes } from 'react-router-dom';

import { CategoriesPreview, ProductsByCategory } from '@/components/blocks';

const ShopRouter = () => {
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<ProductsByCategory />} />
		</Routes>
	);
};

export default ShopRouter;
