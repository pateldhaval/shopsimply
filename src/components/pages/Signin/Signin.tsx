import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { Button, Input, Section } from '@/components/ui';
import { selectError, selectLoading, selectLoadingGoogle, selectProfile } from '@/store/auth/auth.selector';
import { setGoogleSigninStart, setSigninStart } from '@/store/auth/auth.slice';
import { SignInFormFields } from '@/types/user.type';

const initialFormFields: SignInFormFields = {
	email: '',
	password: ''
};

interface Props {}

export const Signin: React.FC<Props> = (props) => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);
	const isLoadingGoogle = useSelector(selectLoadingGoogle);
	const error = useSelector(selectError);
	const user = useSelector(selectProfile);
	const [formFields, setFormFields] = useState(initialFormFields);
	const navigate = useNavigate();
	const { email, password } = formFields;

	useEffect(() => {
		if (user) {
			handleReset();
			navigate('/');
		}
		if (error) {
			switch (error.code) {
				case 'auth/user-not-found':
					alert('Oops!! User not found');
					break;
				case 'auth/wrong-password':
					alert('Oops!! Password is incorrect');
					break;
				case 'auth/popup-closed-by-user':
					alert('Oops!! Popup closed by user without signin');
					break;
				default:
					console.log(error);
					break;
			}
		}
	}, [user, error]);

	const handleSigninWithGoogle = () => {
		dispatch(setGoogleSigninStart());
	};

	const handleSignin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(setSigninStart({ email, password } as any));
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
					<Button>{isLoading ? 'Loading...' : 'Submit'}</Button>
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
