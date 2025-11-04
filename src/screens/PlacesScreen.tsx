import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlacesAutocomplete } from '@/src/components/PlacesAutocomplete';
import { SearchResults } from '@/src/components/SearchResults';
import { SearchHistory } from '@/src/components/SearchHistory';
import { MapDisplay } from '@/src/components/MapDisplay';

export function PlacesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <PlacesAutocomplete />
        <SearchResults />
        <MapDisplay />
        <SearchHistory />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 16,
  },
});
