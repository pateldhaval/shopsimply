import { Route, Routes } from 'react-router-dom';

import { CategoriesPreview } from '@/components/CategoriesPreview';
import { ProductsByCategory } from '@/components/ProductsByCategory';

const ShopRouter = () => {
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<ProductsByCategory />} />
		</Routes>
	);
};

export default ShopRouter;
