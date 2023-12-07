import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './features/filterSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jobsApi } from './services/jobsApi';

export const store = configureStore({
  reducer: {
    filterReducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
