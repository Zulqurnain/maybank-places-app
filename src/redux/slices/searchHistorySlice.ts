import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Place } from '@/src/types';

interface HistoryItem {
  place: Place;
  searchedAt: string;
}

interface HistoryState {
  history: HistoryItem[];
}

const initialState: HistoryState = {
  history: [],
};

const MAX_HISTORY = 20;

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<Place>) => {
      const itemIdx = state.history.findIndex(
        h => h.place.placeId === action.payload.placeId
      );
      
      if (itemIdx >= 0) {
        state.history.splice(itemIdx, 1);
      }
      
      state.history.unshift({
        place: action.payload,
        searchedAt: new Date().toISOString(),
      });
      
      // tried while loop first but slice() works better here
      if (state.history.length > MAX_HISTORY) {
        state.history = state.history.slice(0, MAX_HISTORY);
      }
    },
    clearHistory: (state) => {
      state.history = [];
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      const idx = state.history.findIndex(
        h => h.place.placeId === action.payload
      );
      if (idx >= 0) {
        state.history.splice(idx, 1);
      }
    },
  },
});

export const { addToHistory, clearHistory, removeFromHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
