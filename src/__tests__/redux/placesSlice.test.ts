import placesReducer, { clearResults, clearSelectedPlace } from '@/src/redux/slices/placesSlice';
import { searchPlacesAsync, selectPlaceAsync } from '@/src/redux/slices/placesSlice';

describe('placesSlice', () => {
  const defaultState = {
    searchResults: [],
    selectedPlace: null,
    isLoading: false,
    error: null,
  };

  it('returns initial state', () => {
    const result = placesReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(defaultState);
  });

  it('clearResults clears results and error', () => {
    const state = {
      ...defaultState,
      searchResults: [{ placeId: '1', description: 'Test', mainText: 'Test', secondaryText: 'Test' }],
      error: 'Some error',
    };
    const result = placesReducer(state, clearResults());
    expect(result.searchResults).toEqual([]);
    expect(result.error).toBeNull();
  });

  it('clearSelectedPlace removes selected', () => {
    const state = {
      ...defaultState,
      selectedPlace: { placeId: '1', description: 'Test', mainText: 'Test', secondaryText: 'Test', latitude: 37.7, longitude: -122.4 },
    };
    const result = placesReducer(state, clearSelectedPlace());
    expect(result.selectedPlace).toBeNull();
  });

  it('search pending sets loading', () => {
    const action = { type: searchPlacesAsync.pending.type };
    const result = placesReducer(defaultState, action);
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('search fulfilled updates results', () => {
    const places = [
      { placeId: '1', description: 'Test', mainText: 'Test', secondaryText: 'Test' },
    ];
    const action = { type: searchPlacesAsync.fulfilled.type, payload: places };
    const result = placesReducer(defaultState, action);
    expect(result.isLoading).toBe(false);
    expect(result.searchResults).toEqual(places);
  });

  it('search rejected sets error', () => {
    const action = { 
      type: searchPlacesAsync.rejected.type, 
      error: { message: 'Network error' }
    };
    const result = placesReducer(defaultState, action);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Network error');
  });

  it('search rejected without message defaults', () => {
    const action = { 
      type: searchPlacesAsync.rejected.type, 
      error: {}
    };
    const result = placesReducer(defaultState, action);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Search failed');
  });

  it('select pending sets loading', () => {
    const action = { type: selectPlaceAsync.pending.type };
    const result = placesReducer(defaultState, action);
    expect(result.isLoading).toBe(true);
  });

  it('select fulfilled updates selected', () => {
    const place = { placeId: '1', description: 'Test', mainText: 'Test', secondaryText: 'Test', latitude: 37.7749, longitude: -122.4194 };
    const action = { type: selectPlaceAsync.fulfilled.type, payload: place };
    const result = placesReducer(defaultState, action);
    expect(result.isLoading).toBe(false);
    expect(result.selectedPlace).toEqual(place);
    expect(result.error).toBeNull();
  });

  it('select rejected sets error', () => {
    const action = {
      type: selectPlaceAsync.rejected.type,
      error: { message: 'Network error' }
    };
    const result = placesReducer(defaultState, action);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Network error');
  });

  it('select rejected without message defaults', () => {
    const action = {
      type: selectPlaceAsync.rejected.type,
      error: {}
    };
    const result = placesReducer(defaultState, action);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Unable to load place');
  });
});
