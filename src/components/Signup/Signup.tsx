// import './Signup.css';

import { useState } from 'react';

import { SignupFormFields } from '@/app/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

const initialFormFields: SignupFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
};

interface Props {
	// children: React.ReactNode;
}

export const Signup: React.FC<Props> = (props) => {
	const [formFields, setFormFields] = useState(initialFormFields);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log(event.target);
		handleReset();
	};

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleReset = () => {
		setFormFields(initialFormFields);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<Input
					label='Display Name'
					type='text'
					name='displayName'
					value={formFields.displayName}
					onChange={handleChange}
				/>
				<Input
					label='Email'
					type='email'
					name='email'
					value={formFields.email}
					onChange={handleChange}
				/>
				<Input
					label='Password'
					type='password'
					name='password'
					value={formFields.password}
					onChange={handleChange}
				/>
				<Input
					label='Confirm Password'
					type='password'
					name='confirmPassword'
					value={formFields.confirmPassword}
					onChange={handleChange}
				/>
				<div>
					<Button>Submit</Button>
				</div>
			</form>
		</>
	);
};
