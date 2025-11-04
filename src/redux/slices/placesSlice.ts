import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Place } from '@/src/types';
import { searchPlaces, getPlaceDetails } from '@/src/services/placesApi';

interface PlacesState {
  searchResults: Place[];
  selectedPlace: Place | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PlacesState = {
  searchResults: [],
  selectedPlace: null,
  isLoading: false,
  error: null,
};

export const searchPlacesAsync = createAsyncThunk(
  'places/search',
  async (query: string) => {
    const results = await searchPlaces(query);
    return results;
  }
);

export const selectPlaceAsync = createAsyncThunk(
  'places/select',
  async (placeId: string) => {
    const details = await getPlaceDetails(placeId);
    return details;
  }
);

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    clearResults: (state) => {
      state.searchResults = [];
      state.error = null;
    },
    clearSelectedPlace: (state) => {
      state.selectedPlace = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPlacesAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPlacesAsync.fulfilled, (state, action: PayloadAction<Place[]>) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchPlacesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? 'Search failed';
      });
    
    builder.addCase(selectPlaceAsync.pending, (state) => {
      state.isLoading = true;
    });
    
    builder.addCase(selectPlaceAsync.fulfilled, (state, action: PayloadAction<Place>) => {
      state.isLoading = false;
      state.selectedPlace = action.payload;
      state.error = null;
    });
    
    builder.addCase(selectPlaceAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message ?? "Couldn't load place";
    });
  },
});

export const { clearResults, clearSelectedPlace } = placesSlice.actions;
export default placesSlice.reducer;
