import { Button } from '@/components/Button';
import { Section } from '@/components/Section';
import { Signup } from '@/components/Signup';
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
				<Signup />
				<br />
				<Button onClick={loginWithGoogle}>Login with Google</Button>
			</Section>
		</>
	);
};

export default Login;
