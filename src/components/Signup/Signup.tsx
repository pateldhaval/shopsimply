import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { SignUpFormFields } from '@/app/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Section } from '@/components/Section';
import { setSignUpStart } from '@/store/user/user.action';

const initialFormFields: SignUpFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
};

interface Props {}

export const Signup: React.FC<Props> = (props) => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(initialFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Password does not match');
			return;
		}

		try {
			dispatch(setSignUpStart({ email, password, displayName }));
			// console.log('User created successfully.');

			// Reset from
			// handleReset();
		} catch (error: any) {
			// TODO: need to handle this other way around
			if (error.code === 'auth/email-already-in-use') {
				alert('Oops!! Email is already in use');
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
					label='Display Name'
					type='text'
					name='displayName'
					required
					value={displayName}
					onChange={handleChange}
				/>
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
				<Input
					label='Confirm Password'
					type='password'
					name='confirmPassword'
					required
					value={confirmPassword}
					onChange={handleChange}
				/>
				<div>
					<Button>Submit</Button>
				</div>
			</form>
		</Section>
	);
};
