import { FirebaseError } from 'firebase/app';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { Button, Input, Section } from '@/components/ui';
import { useGetUserProfileQuery, useSigninMutation, useSigninWithGoogleMutation } from '@/store/auth/auth.api';
import { SignInFormFields } from '@/types/user.type';

const initialFormFields: SignInFormFields = {
	email: '',
	password: ''
};

interface Props {}

export const Signin: React.FC<Props> = (props) => {
	const navigate = useNavigate();
	const [formFields, setFormFields] = useState(initialFormFields);
	const { email, password } = formFields;

	const { data: profile } = useGetUserProfileQuery(undefined, {
		selectFromResult: ({ data, isLoading }) => ({ data, isLoading })
	});

	const [signinWithGoogle, { isLoading: isLoadingGoogle, isError: isErrorGoogle, error: errorGoogle }] =
		useSigninWithGoogleMutation();

	const [signin, { isLoading: isLoadingSignin, isError: isErrorSignin, error: errorSignin }] = useSigninMutation();

	useEffect(() => {
		if (profile) {
			handleReset();
			navigate('/');
		}
	}, [profile]);

	useEffect(() => {
		if (isErrorGoogle) {
			const error = errorGoogle as FirebaseError;
			switch (error.code) {
				case 'auth/popup-closed-by-user':
					alert('Oops!! Popup closed by user without signin');
					break;
				default:
					console.log(errorGoogle);
					break;
			}
		}
	}, [errorGoogle]);

	useEffect(() => {
		if (isErrorSignin) {
			const error = errorSignin as FirebaseError;
			switch (error.code) {
				case 'auth/user-not-found':
					alert('Oops!! User not found');
					break;
				case 'auth/wrong-password':
					alert('Oops!! Password is incorrect');
					break;
				default:
					console.log(errorGoogle);
					break;
			}
		}
	}, [isErrorSignin]);

	const handleSigninWithGoogle = async () => {
		await signinWithGoogle();
	};

	const handleSignin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		signin({ email, password });
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
			<form onSubmit={handleSignin} className='space-y-4'>
				<Input label='Email' type='email' name='email' required value={email} onChange={handleChange} />
				<Input label='Password' type='password' name='password' required value={password} onChange={handleChange} />
				<div className='space-x-4'>
					<Button>{isLoadingSignin ? 'Loading...' : 'Submit'}</Button>
					<span>
						Don't have an account?{' '}
						<Link to={'/register'} className='underline'>
							Signup
						</Link>
					</span>
				</div>
				<div>
					<Button type='button' onClick={handleSigninWithGoogle}>
						{isLoadingGoogle ? 'Loading...' : 'SignIn with Google'}
					</Button>
				</div>
			</form>
		</Section>
	);
};
