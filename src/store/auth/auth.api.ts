import { FireUser, Profile, SignInFormFields, SignUpFormFields } from '@/types/user.type';
import {
	createAuthUserWithEmailAndPassword,
	getAuthUser,
	getUserProfileFromAuth,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutAuthUser
} from '@/utils/firebase/firebase.util';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Profile'],
	endpoints: (builder) => ({
		getUserProfile: builder.query<Profile | null, void>({
			providesTags: ['Profile'],
			queryFn: async () => {
				try {
					// [Fetch auth user]
					const user = (await getAuthUser()) as FireUser;
					if (!user) return { data: null };

					// [Get profile from auth user]
					const profile = await getUserProfileFromAuth(user);
					return { data: profile };
				} catch (error) {
					return { error };
				}
			}
		}),
		signin: builder.mutation<Profile | null, SignInFormFields>({
			invalidatesTags: ['Profile'],
			queryFn: async (fields) => {
				try {
					const userData = await signInAuthUserWithEmailAndPassword(fields.email, fields.password);
					if (!userData?.user) return { data: null };

					// [Get profile from auth user]
					const profile = await getUserProfileFromAuth(userData.user);
					return { data: profile };
				} catch (error) {
					return { error };
				}
			}
		}),
		signinWithGoogle: builder.mutation<Profile | null, void>({
			invalidatesTags: ['Profile'],
			queryFn: async () => {
				try {
					// [Fetch auth user]
					const { user } = await signInWithGooglePopup();
					if (!user) return { data: null };

					// [Get profile from auth user]
					const profile = await getUserProfileFromAuth(user);
					return { data: profile };
				} catch (error) {
					return { error };
				}
			}
		}),
		signup: builder.mutation<Profile | null, SignUpFormFields>({
			invalidatesTags: ['Profile'],
			queryFn: async (fields) => {
				try {
					const authUser = await createAuthUserWithEmailAndPassword(fields.email, fields.password);
					if (!authUser?.user) return { data: null };

					const additionalInfo = { displayName: fields.displayName };
					const profile = await getUserProfileFromAuth(authUser?.user, additionalInfo);
					return { data: profile };
				} catch (error) {
					return { error };
				}
			}
		}),
		signOut: builder.mutation<any, void>({
			invalidatesTags: ['Profile'],
			queryFn: async () => {
				try {
					await signOutAuthUser();
					return { data: 'Ok' };
				} catch (error) {
					return { error };
				}
			}
		})
	})
});

export const {
	useGetUserProfileQuery,
	useSigninMutation,
	useSigninWithGoogleMutation,
	useSignupMutation,
	useSignOutMutation
} = authApi;
