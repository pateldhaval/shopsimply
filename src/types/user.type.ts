import { User } from 'firebase/auth';

// Alias of Firebase Auth User type
export type FireUser = User;

// Type reference to Firestore Profile doc
// This is actually reference to state
export interface Profile {
	id: string;
	email: string;
	displayName?: string;
	photoURL?: string;
	createdAt?: any;
}

export interface SignUpFormFields {
	displayName: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

export interface SignInFormFields {
	email: string;
	password: string;
}
