import { CartProduct } from '@/app/types';

export interface CartState {
	cartItems: CartProduct[];
	isCartOpen: boolean;
}

// Action types
export const enum CartActionTypes {
	SetCartUpdate = 'cart/SetCartUpdate',
	SetIsCartOpen = 'cart/SetIsCartOpen'
}
