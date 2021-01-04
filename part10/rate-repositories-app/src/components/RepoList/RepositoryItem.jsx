import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../../theme';
import RepoItemHeader from './RepoItemHeader';
import RepoItemStatRow from './RepoItemStatRow';

const styles = StyleSheet.create({
  repoItem: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 10,
    marginVertical: 20,
    borderColor: theme.colors.secondary,
    borderWidth: 3
  }
});

const RepositoryItem = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <View style={styles.repoItem}>
      <RepoItemHeader repo={item} />
      <RepoItemStatRow repo={item} />
    </View>
  );
};

export default RepositoryItem;
