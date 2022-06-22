import { useState } from 'react';

// import './SignIn.css';
import { SignInFormFields } from '@/app/types';
import { Button } from '@/components/Button';
import { Section } from '@/components/Section';
import {
    createProfileFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup
} from '@/utils/firebase/firebase.util';

import { Input } from '../Input';

const initialFormFields: SignInFormFields = {
	email: '',
	password: ''
};

interface Props {
	// children: React.ReactNode;
}

export const SignIn: React.FC<Props> = (props) => {
	const [formFields, setFormFields] = useState(initialFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		try {
			const response = await signInWithGooglePopup();
			// console.log(response);
			await createProfileFromAuth(response.user);
			alert('Logged in successfully.');
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		try {
			const response = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			console.log(response);
			alert('Signed in successfully.');

			// Reset from
			handleReset();
		} catch (error: any) {
			if (error.code === 'auth/user-not-found') {
				alert('Oops!! User not found');
			}
			if (error.code === 'auth/wrong-password') {
				alert('Oops!! Password is incorrect');
			}
			console.log(error);
		}
	};

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleReset = () => {
		setFormFields(initialFormFields);
	};

	return (
		<Section>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<Input
					label='Email'
					type='email'
					name='email'
					required
					value={email}
					onChange={handleChange}
				/>
				<Input
					label='Password'
					type='password'
					name='password'
					required
					value={password}
					onChange={handleChange}
				/>
				<div className='space-x-4'>
					<Button>Submit</Button>
					<Button type='button' onClick={signInWithGoogle}>
						SignIn with Google
					</Button>
				</div>
			</form>
		</Section>
	);
};
