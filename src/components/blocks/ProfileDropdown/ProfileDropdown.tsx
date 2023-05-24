import { Button } from '@/components/ui';
import { useSignOutMutation } from '@/store/auth/auth.api';
import { Profile } from '@/types/user.type';

interface Props {
	profile: Profile;
	onSignOut: () => void;
}

export const ProfileDropdown: React.FC<Props> = (props) => {
	const { displayName } = props.profile;

	const [signOut, { isLoading }] = useSignOutMutation();

	const handleSignOut = async () => {
		await signOut();
		props.onSignOut();
	};

	return (
		<div className='absolute top-14 right-0 z-10 w-40 p-4 bg-white shadow-md'>
			<div className='pb-3'>{displayName ? displayName : 'User'}</div>
			<div className='pt-4 border-t'>
				<Button block onClick={handleSignOut}>
					{isLoading ? 'Loading...' : 'Sign Out'}
				</Button>
			</div>
		</div>
	);
};
