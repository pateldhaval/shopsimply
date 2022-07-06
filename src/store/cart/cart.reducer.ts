import { CartActionTypes, CartState } from './cart.types';

const initialState: CartState = {
	cartItems: [],
	isCartOpen: false
};

export const cartReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case CartActionTypes.SetCartUpdate:
			return {
				...state,
				cartItems: action.payload
			};
		case CartActionTypes.SetIsCartOpen:
			return {
				...state,
				isCartOpen: action.payload
			};
		default:
			return state;
	}
};
