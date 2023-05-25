import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './auth/auth.api';
import { categoriesApi } from './categories/categories.api';
import { rootReducer } from './root.reducer';

// ====================================================
// [Persist]
// ====================================================

const persistConfig = {
	// [To persist all states]
	key: 'root',
	// [To use localStorage of browser for persistance]
	storage: storage,
	// [Persist exceptions]
	// [User state comes from AuthState Listener so no need to persist with storage]
	// blacklist: ['user']
	// [We only need cart to persist]
	whitelist: ['cart']
};

// [New persisted reducer derived from rootReducer with config provided]
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ====================================================
// [Middleware]
// ====================================================

// [list of middleware to use with store]
const middlewares = [categoriesApi.middleware, authApi.middleware];

// ====================================================
// [Store with persist]
// ====================================================
// [Passing here persistedReducer instead of rootReducer]
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			// [Allow to use non-serialized datatypes in redux store]
			serializableCheck: false
		})
			// [Concat out own middleware]
			.concat(middlewares)
});

// [Persisted store derived from store]
export const persistor = persistStore(store);
