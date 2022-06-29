// import './ProfileDropdown.css';

import { Button } from '@/components/Button';
import { signOutAuthUser } from '@/utils/firebase/firebase.util';

interface Props {
	// children: React.ReactNode;
	user: any;
}

export const ProfileDropdown: React.FC<Props> = (props) => {
	const { displayName } = props.user;
	return (
		<div className='absolute top-14 right-0 z-10 w-40 p-4 bg-white shadow-md'>
			<div className='pb-3'>{displayName ? displayName : 'User'}</div>
			<div className='pt-4 border-t'>
				<Button block onClick={signOutAuthUser}>
					Sign Out
				</Button>
			</div>
		</div>
	);
};
