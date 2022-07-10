import { useDispatch } from 'react-redux';

import { Profile } from '@/app/types';
import { Button } from '@/components/Button';
import { setSignOutStart } from '@/store/user/user.action';

interface Props {
	profile: Profile;
}

export const ProfileDropdown: React.FC<Props> = (props) => {
	const { displayName } = props.profile;
	const dispatch = useDispatch();

	const handleSignOut = () => dispatch(setSignOutStart());

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
