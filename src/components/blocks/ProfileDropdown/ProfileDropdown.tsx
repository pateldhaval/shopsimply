import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui';
import { setSignOutStart } from '@/store/auth/auth.slice';
import { Profile } from '@/types/user.type';

interface Props {
	profile: Profile;
	onSignOut: () => void;
}

export const ProfileDropdown: React.FC<Props> = (props) => {
	const { displayName } = props.profile;
	const dispatch = useDispatch();

	const handleSignOut = () => {
		dispatch(setSignOutStart());
		props.onSignOut();
	};

	return (
		<div className='absolute top-14 right-0 z-10 w-40 p-4 bg-white shadow-md'>
			<div className='pb-3'>{displayName ? displayName : 'User'}</div>
			<div className='pt-4 border-t'>
				<Button block onClick={handleSignOut}>
					Sign Out
				</Button>
			</div>
		</div>
	);
};
