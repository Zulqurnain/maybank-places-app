import React, { useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { List, Button } from '@ant-design/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { selectPlaceAsync } from '@/src/redux/slices/placesSlice';
import { clearHistory, removeFromHistory } from '@/src/redux/slices/searchHistorySlice';
import { useNetworkStatus } from '@/src/utils/networkUtils';

const Item = List.Item;

export const SearchHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useSelector((state: RootState) => state.searchHistory.history);
  const isOnline = useNetworkStatus();

  const hasHistory = useMemo(() => history.length > 0, [history.length]);

  const selectPlace = async (placeId: string) => {
    if (!isOnline) return;
    
    try {
      await dispatch(selectPlaceAsync(placeId)).unwrap();
    } catch (err) {
      // silent fail
    }
  };

  const clear = () => {
    dispatch(clearHistory());
  };

  if (!hasHistory) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Recent Searches</Text>
        <Button size="small" onPress={clear}>
          Clear
        </Button>
      </View>
      <List>
        {history.map((item) => (
          <Item
            key={item.place.placeId}
            onPress={() => selectPlace(item.place.placeId)}
          >
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.primary}>{item.place.mainText}</Text>
                <Text style={styles.secondary}>{item.place.secondaryText}</Text>
              </View>
              <TouchableOpacity
                onPress={() => dispatch(removeFromHistory(item.place.placeId))}
                style={styles.deleteBtn}
              >
                <Text style={styles.deleteText}>×</Text>
              </TouchableOpacity>
            </View>
          </Item>
        ))}
      </List>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  primary: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondary: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  deleteBtn: {
    padding: 8,
  },
  deleteText: {
    fontSize: 24,
    color: '#999',
  },
});
