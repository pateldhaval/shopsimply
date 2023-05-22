import {
	createUserWithEmailAndPassword,
	NextOrObserver,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	User
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, writeBatch } from 'firebase/firestore';

import { auth, firestore, googleProvider } from './firebase.config';

// =================================================================================
// Authentication utilities
// =================================================================================

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

	return profileSnapshot;
};

// SignIn via Google Popup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// SignUp via Email & Password
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

// SignIn via Email & Password
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

// Sign Out
export const signOutAuthUser = () => signOut(auth);

// Auth state change event listener
// export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
// 	onAuthStateChanged(auth, callback);

// Get authenticated user
export const getAuthUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(authUser) => {
				unsubscribe();
				resolve(authUser);
			},
			reject
		);
	});
};

// =================================================================================
// Other firestore utilities
// =================================================================================
export const addCollectionAndDocuments = async (collectionKey: string, objectsToAdd: any, documentKey: string) => {
	// Get the reference to the collection
	const collectionRef = collection(firestore, collectionKey);

	// Get the instance of the batch
	const batch = writeBatch(firestore);

	// Prepare the transaction in batch
	objectsToAdd.forEach((object: any) => {
		// Get the reference to the document
		const docRef = doc(collectionRef, object[documentKey].toLowerCase());
		// console.log(object[documentKey].toLowerCase());

		batch.set(docRef, object);
	});

	// Commit the batch to actual database
	await batch.commit();
	console.log('Done, data added');
};

export const getCollectionAndDocuments = async (collectionKey: string) => {
	const collectionRef = collection(firestore, collectionKey);

	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const dataMap = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

	return dataMap;
};
