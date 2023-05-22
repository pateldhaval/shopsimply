import { Profile } from '@/app/types';

export interface UserState {
	loading: boolean;
	profile: Profile | null;
	error: string | null;
}
