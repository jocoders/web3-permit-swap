import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ordersReducer from './ordersSlice'
import { TOrdersState } from './types'

const persistConfig = {
  key: 'orders',
  storage
}

const persistedReducer = persistReducer<TOrdersState>(persistConfig, ordersReducer)

export const store = configureStore({
  reducer: {
    orders: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

// Определяем типы
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
