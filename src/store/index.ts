import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // for react-native you would be using AsyncStorage
import categoriesReducer from './categories/categoriesSlice';
import productsReducer from './products/productsSlice';
import cart from './cart/cartSlice';
import wishlistSlice from './wishlist/wishlistSlice';
// // 1. Key, 2. Type or kind of storage to handle (to cache and save) (localhost), 3. what do i want it to cache??
// const rootPersistConfig = {
// 	key: 'root', // 1.why key? because you will have multiple configurations and to access each you must have a seperated key
// 	storage, // 2
// 	whiteList: ['cart'], // 3.cache what? takes an array of reducers
// 	// blackList: ['cart'],  3. this will cache anything in reducer but the cart reducer
// }; // the config is done but what after?

// READ THE COMMENT ALL THE WAY DOWN

const cartPersistConfig = {
	key: 'cart',
	storage,
	whiteList: ['items'], // i dont need loading or productFullInfo
};

const wishlistPersistConfig = {
	key: 'wishlist',
	storage,
	whiteList: ['itemsId'],
};

const rootReducer = combineReducers({
	wishlistSlice: persistReducer(wishlistPersistConfig, wishlistSlice),
	categoriesReducer,
	productsReducer,
	cart: persistReducer(cartPersistConfig, cart), // nested persist, to cache only the cart items within the cart reducer
}); // here after i did the config, i do compilation of reducers to give it to my persistReducer which takes the rootConfig with the rootReducer which will have all the reducer (merge all reducers to send it back to store)

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer); // READ THE COMMENT ALL THE WAY DOWN

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
}); // same concept of compositioning the store with the entire app, you should do the same with the persistor

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export { store, persistor };

// now since i have a root and cart persist, in which im only using the cart reducer in the root persist and then im configuering the cart alone, i can get rid of the root persistor, only because im using it solely without any other reducers
