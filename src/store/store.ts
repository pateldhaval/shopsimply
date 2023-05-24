// import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

// import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { categoriesApi } from './categories/categories.api';
import { rootSaga } from './root-saga';
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

// [Init saga middleware]
const sagaMiddleware = createSagaMiddleware();

// [list of middleware to use with store]
const middleware = [
	// [Saga]
	sagaMiddleware,
	categoriesApi.middleware
];

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
			.concat(middleware)
});
// export const store = createStore(
// 	persistedReducer,
// 	composeWithDevTools(applyMiddleware(...middleware))
// );

// [Tell saga middleware to run root saga]
sagaMiddleware.run(rootSaga);

// [Persisted store derived from store]
export const persistor = persistStore(store);
