import React from 'react';
import { View, StyleSheet } from 'react-native';
import Heading from './Heading';
import Text from './Text';

const styles = StyleSheet.create({
  stat: {
    padding: 5,
    textAlign: 'center',
    alignItems: 'center'
  }
});

const RepoItemStat = ({ item, value }) => {
  const displayValue = value >= 10000 ? Math.round(value / 1000) + 'k' : value;

  return (
    <View style={styles.stat}>
      <Heading>{displayValue}</Heading>
      <Text>{item}</Text>
    </View>
  );
};

export default RepoItemStat;
