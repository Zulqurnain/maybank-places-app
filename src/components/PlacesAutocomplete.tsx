import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Input } from '@ant-design/react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { searchPlacesAsync, clearResults } from '@/src/redux/slices/placesSlice';
import { debounce } from '@/src/utils/debounce';

export function PlacesAutocomplete() {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const debouncedSearch = useMemo(() => 
    debounce((query: string) => {
      if (query.trim()) {
        dispatch(searchPlacesAsync(query));
      } else {
        dispatch(clearResults());
      }
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  return (
    <View style={styles.container}>
      <Input
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for places..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
  },
});
