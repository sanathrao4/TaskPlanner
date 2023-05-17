import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from './reducer'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware(
        {
            serializableCheck: false
        }
    )
});

export const persistor = persistStore(store)
