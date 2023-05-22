import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { SignInFormFields } from '@/app/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Section } from '@/components/Section';
import { setGoogleSignInStart, setSignInStart } from '@/store/user/user.slice';

const initialFormFields: SignInFormFields = {
	email: '',
	password: ''
};

interface Props {}

export const SignIn: React.FC<Props> = (props) => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(initialFormFields);
	const { email, password } = formFields;

	const handleSignInWithGoogle = () => {
		try {
			dispatch(setGoogleSignInStart());
			console.log('Logged in successfully.');
		} catch (error: any) {
			// TODO: need to handle this other way around
			switch (error.code) {
				case 'auth/popup-closed-by-user':
					console.log('Oops!! Popup closed by user without login');
					break;
				default:
					console.log(error);
					break;
			}
		}
	};

	const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			dispatch(setSignInStart({ email, password } as any));
			// console.log('Signed in successfully.');

			// Reset form
			handleReset();
		} catch (error: any) {
			// TODO: need to handle this other way around
			switch (error.code) {
				case 'auth/user-not-found':
					alert('Oops!! User not found');
					break;
				case 'auth/wrong-password':
					alert('Oops!! Password is incorrect');
					break;
				default:
					console.log(error);
					break;
			}
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleReset = () => {
		setFormFields(initialFormFields);
	};

	return (
		<Section>
			<form onSubmit={handleSignIn} className='space-y-4'>
				<Input label='Email' type='email' name='email' required value={email} onChange={handleChange} />
				<Input label='Password' type='password' name='password' required value={password} onChange={handleChange} />
				<div className='space-x-4'>
					<Button>Submit</Button>
					<Button type='button' onClick={handleSignInWithGoogle}>
						SignIn with Google
					</Button>
				</div>
			</form>
		</Section>
	);
};
