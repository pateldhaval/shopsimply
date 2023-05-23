import { Profile } from '@/app/types';

export interface AuthState {
	loading: boolean;
	loadingGoogle: boolean;
	profile: Profile | null;
	error: any | null;
}
