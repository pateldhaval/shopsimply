export interface Product {
	id: number;
	name: string;
	imageUrl: string;
	price: number;
}

export interface Category {
	title: string;
	imageUrl?: string;
	products: Product[] | null;
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
