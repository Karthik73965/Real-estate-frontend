import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userreducer from './user/userSlice'

export const store = configureStore({
  reducer: {user:userreducer},
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  })
})