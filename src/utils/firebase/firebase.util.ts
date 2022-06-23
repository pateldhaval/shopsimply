// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	NextOrObserver,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	User
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const env = import.meta.env;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: env.VITE_FIREBASE_API_KEY,
	authDomain: `${env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
	projectId: env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: `${env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
	messagingSenderId: '563586386211',
	appId: env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// 3rd party Auth provider (Google)
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

// Global auth used with Firebase methods
export const auth = getAuth();

// Global firestore db reference from Firebase
export const firestore = getFirestore();

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
