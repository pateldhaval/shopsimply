import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import { CartProvider } from '@/utils/context/Cart.context';
import { UserProvider } from '@/utils/context/User.context';

import { ShopProvider } from './utils/context/Shop.context';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				<ShopProvider>
					<CartProvider>
						<App />
					</CartProvider>
				</ShopProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>
);
