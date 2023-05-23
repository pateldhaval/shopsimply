import { CartProduct } from '@/types/shop.type';

export interface CartState {
	cartItems: CartProduct[];
	isCartOpen: boolean;
}
