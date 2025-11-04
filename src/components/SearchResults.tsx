import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { List } from '@ant-design/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { selectPlaceAsync } from '@/src/redux/slices/placesSlice';
import { addToHistory } from '@/src/redux/slices/searchHistorySlice';
import { Place } from '@/src/types';
import { useNetworkStatus } from '@/src/utils/networkUtils';

const Item = List.Item;

export function SearchResults() {
  const dispatch = useDispatch<AppDispatch>();
  const places = useSelector((state: RootState) => state.places);
  const isOnline = useNetworkStatus();

  const handleSelect = async (place: Place) => {
    if (!isOnline) {
      return;
    }
    
    const result = await dispatch(selectPlaceAsync(place.placeId));
    if (selectPlaceAsync.fulfilled.match(result)) {
      dispatch(addToHistory(result.payload));
    }
  };

  if (places.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" />
        <Text style={styles.loadingText}>Searching...</Text>
      </View>
    );
  }

  if (places.error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{places.error}</Text>
      </View>
    );
  }

  if (places.searchResults.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <List>
        {places.searchResults.map((place) => (
          <Item key={place.placeId} onPress={() => handleSelect(place)}>
            <Text style={styles.name}>{place.mainText}</Text>
            <Text style={styles.address}>{place.secondaryText}</Text>
          </Item>
        ))}
      </List>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  center: {
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  error: {
    color: '#d00',
    fontSize: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
