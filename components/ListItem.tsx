import React, { memo } from 'react';
import { Item } from './List';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

type ListItemProps = {
  item: Item;
  index: number;
  extendedState: any;
  onPressItem: (index: string) => void;
};

const ListItem = memo(({ item, index, extendedState, onPressItem }: ListItemProps) => {
  const selectedItems = extendedState && extendedState.selected ? extendedState.selected : {};
  const id = item.id;
  const isSelected = id in selectedItems ? true : false;
  const content = isSelected ? 'Added to Wishlist' : item.content;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPressItem(item.id);
      }}
    >
      {isSelected ? (
        <View style={[styles.row, styles.selected]}>
          <Text style={styles.item}>{content}</Text>
        </View>
      ) : (
        <View style={styles.row}>
          <Text style={styles.item}>{content}</Text>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'lightgrey',
    flex: 1,
    margin: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#50ACFC',
  },
  item: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CB1A73',
  },
});

export default ListItem;
