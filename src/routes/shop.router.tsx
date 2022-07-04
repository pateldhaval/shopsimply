import { Route, Routes } from 'react-router-dom';

import { CategoriesPreview } from '@/components/CategoriesPreview';
import { Category } from '@/components/Category';

const ShopRouter = () => {
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

export default ShopRouter;
