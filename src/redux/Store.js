import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userreducer from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { persistStore } from 'redux-persist';



const rootReducer = combineReducers({user:userreducer})

const persistConfig = {
  key:'root',
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  })
})

export const persist = persistStore(store);