import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root.reducer';

const persistConfig = {
	// To persist all states
	key: 'root',
	// To use localStorage of browser for persistance
	storage: storage,
	// Persist exceptions
	// User state comes from AuthState Listener so no need to persist with storage
	blacklist: ['user']
};

// New persisted reducer derived from rootReducer with config provided
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleware: never[] = [];

// Passing here persistedReducer instead of rootReducer
export const store = createStore(persistedReducer, composeWithDevTools());

// Persisted store derived from store
export const persistor = persistStore(store);

// Exported RootState type to use in state selectors
export type RootState = ReturnType<typeof store.getState>;
