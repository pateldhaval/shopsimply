import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = import.meta.env;

// Firebase configuration
const firebaseConfig = {
	apiKey: env.VITE_FIREBASE_API_KEY,
	authDomain: `${env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
	projectId: env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: `${env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
	messagingSenderId: '563586386211',
	appId: env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// 3rd party Auth provider (Google)
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

// Global auth used with Firebase methods
export const auth = getAuth();

// Global firestore db reference from Firebase
export const firestore = getFirestore();
