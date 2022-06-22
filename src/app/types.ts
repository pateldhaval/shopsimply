export interface Category {
	id: number;
	title: string;
	imageUrl: string;
}

export interface SignupFormFields {
	displayName: string;
	email: string;
	password: string;
	confirmPassword: string;
}
