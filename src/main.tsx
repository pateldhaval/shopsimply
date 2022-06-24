import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import { CartProvider } from '@/utils/context/Card.context';
import { GlobalProvider } from '@/utils/context/Global.context';

import { ProductProvider } from './utils/context/Product.context';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<GlobalProvider>
				<ProductProvider>
					<CartProvider>
						<App />
					</CartProvider>
				</ProductProvider>
			</GlobalProvider>
		</BrowserRouter>
	</React.StrictMode>
);
