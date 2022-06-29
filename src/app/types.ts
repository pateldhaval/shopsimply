export interface Category {
	id: number;
	title: string;
	imageUrl: string;
}

export interface Product {
	id: number;
	name: string;
	imageUrl: string;
	price: number;
}

export interface CartProduct extends Product {
	qty: number;
}

export interface SignUpFormFields {
	displayName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface SignInFormFields {
	email: string;
	password: string;
}
