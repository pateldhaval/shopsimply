import { FirebaseError } from 'firebase/app';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Input, Section } from '@/components/ui';
import { useGetUserProfileQuery, useSignupMutation } from '@/store/auth/auth.api';
import { SignUpFormFields } from '@/types/user.type';

const initialFormFields: SignUpFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
};

interface Props {}

export const Signup: React.FC<Props> = (props) => {
	const navigate = useNavigate();
	const [formFields, setFormFields] = useState(initialFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const [signup, { isLoading, error: errorSignup }] = useSignupMutation();

	const { data: profile } = useGetUserProfileQuery(undefined, {
		selectFromResult: ({ data, isLoading }) => ({ data, isLoading })
	});

	useEffect(() => {
		if (profile) {
			handleReset();

			if (profile.email) {
				navigate('/');
			} else {
				// [Full refresh to get all information]
				window.location.reload();
			}
		}
	}, [profile]);

	useEffect(() => {
		const error = errorSignup as FirebaseError;
		if (error) {
			switch (error.code) {
				case 'auth/email-already-in-use':
					alert('Oops!! Email is already in use');
					break;
				default:
					console.log(error);
					break;
			}
		}
	}, [errorSignup]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Password does not match');
			return;
		}

		signup({ email, password, displayName });
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
			<form onSubmit={handleSubmit} className='space-y-4'>
				<Input
					label='Display Name'
					type='text'
					name='displayName'
					required
					value={displayName}
					onChange={handleChange}
				/>
				<Input label='Email' type='email' name='email' required value={email} onChange={handleChange} />
				<Input label='Password' type='password' name='password' required value={password} onChange={handleChange} />
				<Input
					label='Confirm Password'
					type='password'
					name='confirmPassword'
					required
					value={confirmPassword}
					onChange={handleChange}
				/>
				<div className='space-x-4'>
					<Button>{isLoading ? 'Loading...' : 'Submit'}</Button>
					<span>
						Already have an account?{' '}
						<Link to={'/auth'} className='underline'>
							Signin
						</Link>
					</span>
				</div>
			</form>
		</Section>
	);
};
