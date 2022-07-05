import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import { store } from '@/store/store';
import { CartProvider } from '@/utils/context/Cart.context';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<CartProvider>
					<App />
				</CartProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
