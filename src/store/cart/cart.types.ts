import { CartProduct } from '@/app/types';

export interface CartState {
	cartItems: CartProduct[];
	isCartOpen: boolean;
}
