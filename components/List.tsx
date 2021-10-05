import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text } from 'react-native';
import { BaseDataProvider, DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import ListItem from './ListItem';

// disable warning message of component class usage from RecycleView Library (Hope they can update soon!)
console.warn = () => {};

const ViewTypes = {
  HEADER: 0,
  LISTITEM: 1,
};

export type Item = {
  id: string;
  content: string;
};

export type SelectItems = {
  selected: {};
};

const SCREEN = Dimensions.get('window');

const getMockData = (n: number) => {
  let data: Item[] = [];
  for (let i = 0; i <= n; i++) {
    data.push({
      id: i.toString(),
      content: 'Add item ' + i + ' to wishlist',
    });
  }
  return data;
};

const List = () => {
  const items: Item[] = getMockData(150);

  const [dataProvider, setDataProvider] = useState<BaseDataProvider>({} as BaseDataProvider);
  const [selectedItems, setSelectedItems] = useState<SelectItems>({} as SelectItems);
  const [layoutProvider, setLayoutProvider] = useState<LayoutProvider>({} as LayoutProvider);
  const [canrender, setCanrender] = useState<boolean>(false);

  useEffect(() => {
    // setItems(items);
    setDataProvider(
      new DataProvider(
        (r1, r2) => r1 !== r2,
        (index) => {
          return items[index].id;
        }
      ).cloneWithRows(items)
    );
    setLayoutProvider(
      new LayoutProvider(
        (i) => {
          if (i == 0) {
            return ViewTypes.HEADER;
          } else {
            return ViewTypes.LISTITEM;
          }
        },
        (type, dim) => {
          switch (type) {
            case ViewTypes.HEADER:
              dim.width = SCREEN.width;
              dim.height = 100;
              break;
            case ViewTypes.LISTITEM:
              dim.width = SCREEN.width;
              dim.height = 80;
              break;
            default:
              dim.width = SCREEN.width;
              dim.height = 80;
          }
        }
      )
    );
    setCanrender(true);
  }, []);

  const onPressItem = useCallback((index: string) => {
    console.log('pressed ' + index);
    let selecteds = selectedItems;
    if (index in selecteds) {
      delete selecteds[index];
    } else {
      selecteds[index] = 'true';
    }
    setSelectedItems({
      selected: selecteds,
    });
  }, []);

  const renderItem = (type: string | number, item: Item, index: number, extendedState: object) => {
    if (type === ViewTypes.HEADER) {
      return <Text style={styles.headerStyle}>Header</Text>;
    } else {
      return <ListItem item={item} index={index} extendedState={extendedState} onPressItem={onPressItem} />;
    }
  };

  return (
    <>
      {canrender && (
        <SafeAreaView style={styles.container}>
          <RecyclerListView
            style={{ flex: 1 }}
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            rowRenderer={renderItem}
            extendedState={selectedItems}
          />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: SCREEN.height - 20,
    minWidth: SCREEN.width,
  },
  contrec: {
    flex: 1,
  },
  headerStyle: {
    fontSize: 60,
    padding: 10,
  },
});

export default List;
