import {
	createUserWithEmailAndPassword,
	NextOrObserver,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, firestore, googleProvider } from './firebase.config';

// Entry to profile doc (in db) with authenticated user
export const createProfileFromAuth = async (
	/** We'll get all user information if SignIn via 3rd party provider */
	authUser: User,
	/** We'll need this information if Signup via Email & Password */
	additionalInfo = {}
) => {
	if (!authUser) return;

	const refProfileDoc = doc(firestore, 'profiles', authUser.uid);
	const profileSnapshot = await getDoc(refProfileDoc);

	if (!profileSnapshot.exists()) {
		const { email, displayName, photoURL } = authUser;
		const createdAt = new Date();

		try {
			await setDoc(refProfileDoc, {
				email,
				displayName,
				photoURL,
				createdAt,
				/** Additional information for Signup via Email & Password */
				...additionalInfo
			});
		} catch (error: any) {
			console.error(error);
		}
	}
};

// SignIn via Google Popup
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

// SignUp via Email & Password
export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

// SignIn via Email & Password
export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

// Sign Out
export const signOutAuthUser = () => signOut(auth);

// Auth state change event listener
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);
