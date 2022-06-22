export interface Category {
	id: number;
	title: string;
	imageUrl: string;
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
