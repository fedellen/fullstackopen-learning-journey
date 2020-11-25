import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../../theme';
import Text from './Text';

const styles = StyleSheet.create({
  style: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10
  },
  tag: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 20,
    padding: 7
  },
  text: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.background
  }
});

const Tag = ({ text }) => {
  return (
    <View style={styles.style}>
      <View style={styles.tag}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default Tag;
