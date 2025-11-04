import searchHistoryReducer, { addToHistory, clearHistory, removeFromHistory } from '@/src/redux/slices/searchHistorySlice';

describe('searchHistorySlice', () => {
  const emptyState = {
    history: [],
  };

  const testPlace = {
    placeId: 'place-123',
    description: 'Coffee Shop',
    mainText: 'Coffee Shop',
    secondaryText: 'Main St',
  };

  it('returns empty initial state', () => {
    const result = searchHistoryReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(emptyState);
  });

  it('adds place to history', () => {
    const result = searchHistoryReducer(emptyState, addToHistory(testPlace));
    expect(result.history.length).toBe(1);
    expect(result.history[0].place).toEqual(testPlace);
    expect(result.history[0].searchedAt).toBeDefined();
  });

  it('clearHistory removes all', () => {
    const stateWithItem = {
      history: [
        { place: testPlace, searchedAt: new Date().toISOString() },
      ],
    };
    const result = searchHistoryReducer(stateWithItem, clearHistory());
    expect(result.history).toEqual([]);
  });

  it('removeFromHistory removes by id', () => {
    const stateWithItem = {
      history: [
        { place: testPlace, searchedAt: new Date().toISOString() },
      ],
    };
    const result = searchHistoryReducer(stateWithItem, removeFromHistory('place-123'));
    expect(result.history.length).toBe(0);
  });

  it('limits to 20 items', () => {
    let state = emptyState;
    for (let i = 0; i < 25; i++) {
      const place = { ...testPlace, placeId: `place-${i}` };
      state = searchHistoryReducer(state, addToHistory(place));
    }
    expect(state.history.length).toBe(20);
  });

  it('moves duplicate to front', () => {
    const stateWithItem = {
      history: [
        { place: testPlace, searchedAt: new Date().toISOString() },
      ],
    };
    const result = searchHistoryReducer(stateWithItem, addToHistory(testPlace));
    expect(result.history.length).toBe(1);
    expect(result.history[0].place.placeId).toBe('place-123');
  });

  it('newest items first', () => {
    const first = { ...testPlace, placeId: 'first' };
    const second = { ...testPlace, placeId: 'second' };
    let state = searchHistoryReducer(emptyState, addToHistory(first));
    state = searchHistoryReducer(state, addToHistory(second));
    expect(state.history[0].place.placeId).toBe('second');
    expect(state.history[1].place.placeId).toBe('first');
  });
});
