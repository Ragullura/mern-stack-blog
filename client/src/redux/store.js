import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer =combineReducers({
    user:userReducer,
});

//persist is add for  save state to localStorage    
const persistConfig = {
    key:"root",
    version:1,
    storage,
}

const persistedReducer =persistReducer(persistConfig,rootReducer);

export const store = configureStore({
  reducer:persistedReducer, //{ /* combineReducers */ },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),  /*to prevent error your custom middleware here */
})

export const persistor =persistStore(store);