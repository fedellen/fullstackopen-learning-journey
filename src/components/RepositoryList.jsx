import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import repositories from '../../data/repositories';

const styles = StyleSheet.create({
  seperator: {
    height: 30
  }
});

const ItemSeparator = () => <View style={styles.seperator} />;

const RepositoryList = () => {
  return (
    <>
      <FlatList
        data={repositories}
        style={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={ItemSeparator}
        ListFooterComponent={ItemSeparator}
        renderItem={(item) => <RepositoryItem item={item.item} />}
        // more props 😍
      />
    </>
  );
};

export default RepositoryList;
