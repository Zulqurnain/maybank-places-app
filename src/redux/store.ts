import { configureStore } from '@reduxjs/toolkit';
import placesReducer from './slices/placesSlice';
import searchHistoryReducer from './slices/searchHistorySlice';

export const store = configureStore({
  reducer: {
    places: placesReducer,
    searchHistory: searchHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
