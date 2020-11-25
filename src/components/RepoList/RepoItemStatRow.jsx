import React from 'react';
import { View, StyleSheet } from 'react-native';
import RepoItemStat from './RepoItemStat';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15
  },
  stat: {}
});

const RepoItemStatRow = ({ repo }) => {
  return (
    <View style={styles.container}>
      <RepoItemStat item='Stars' value={repo.stargazersCount} />
      <RepoItemStat item='Forks' value={repo.forksCount} />
      <RepoItemStat item='Reviews' value={repo.reviewCount} />
      <RepoItemStat item='Rating' value={repo.ratingAverage} />
    </View>
  );
};

export default RepoItemStatRow;
