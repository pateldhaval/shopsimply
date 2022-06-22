// import './SignIn.css';
import { Button } from '@/components/Button';
import { Section } from '@/components/Section';
import { createProfileFromAuth, loginWithGooglePopup } from '@/utils/firebase/firebase.util';

interface Props {
	// children: React.ReactNode;
}

export const SignIn: React.FC<Props> = (props) => {
	const loginWithGoogle = async () => {
		try {
			const response = await loginWithGooglePopup();
			// console.log(response);
			await createProfileFromAuth(response.user);
			alert('Logged in successfully.');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Section>
				<Button onClick={loginWithGoogle}>Login with Google</Button>
			</Section>
		</>
	);
};
