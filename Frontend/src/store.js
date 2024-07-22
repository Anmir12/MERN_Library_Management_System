import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import { authApi } from './api/authApi';
import { bookApi } from '../src/api/bookApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, bookApi.middleware),
});
