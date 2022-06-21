// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();

// Export login method
export const loginWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// get db reference from Firebase
export const firestore = getFirestore();

// Entry to profile doc with auth
export const createProfileFromAuth = async (authUser: User) => {
	const refProfileDoc = doc(firestore, 'profiles', authUser.uid);
	const profileSnapshot = await getDoc(refProfileDoc);
	// console.log(authUser);

	if (!profileSnapshot.exists()) {
		const { email, displayName, photoURL } = authUser;
		const createdAt = new Date();

		try {
			await setDoc(refProfileDoc, { email, displayName, photoURL, createdAt });
		} catch (error: any) {
			console.error(error.message);
		}
	}
};
