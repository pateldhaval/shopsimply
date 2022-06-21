import { Section } from '@/components/Section';
import { createProfileFromAuth, loginWithGooglePopup } from '@/utils/firebase/firebase.util';

const Login = () => {
	const loginWithGoogle = async () => {
		try {
			const response = await loginWithGooglePopup();
			// console.log(response);
			const ref = await createProfileFromAuth(response.user);
			console.log(ref);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Section>
				<div className='p-5'>
					<button className='border p-3' onClick={loginWithGoogle}>
						Login with Google
					</button>
				</div>
			</Section>
		</>
	);
};

export default Login;
