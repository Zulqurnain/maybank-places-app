import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';

function MapDisplay() {
  const selectedPlace = useSelector((state: RootState) => state.places.selectedPlace);
  
  if (!selectedPlace || selectedPlace.latitude == null || selectedPlace.longitude == null) {
    return (
      <View style={styles.container}>
        <View style={styles.mapPlaceholder}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Map Display</Text>
            <Text style={styles.note}>
              Select a place to see location
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Selected Place:</Text>
          <Text style={styles.placeName}>{selectedPlace.mainText}</Text>
          <Text style={styles.address}>{selectedPlace.secondaryText}</Text>
          <Text style={styles.coordinates}>
            Lat: {selectedPlace.latitude.toFixed(6)}, Lng: {selectedPlace.longitude.toFixed(6)}
          </Text>
          <Text style={styles.note}>
            Map view requires dev build
          </Text>
        </View>
      </View>
    </View>
  );
}

export { MapDisplay };

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginVertical: 16,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  infoContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  coordinates: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  note: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
});
