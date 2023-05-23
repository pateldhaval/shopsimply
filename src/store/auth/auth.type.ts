import { Profile } from '@/types/user.type';

export interface AuthState {
	loading: boolean;
	loadingGoogle: boolean;
	profile: Profile | null;
	error: any | null;
}
