import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10
  }
});

const AppBar = () => {
  return <View style={styles.container}></View>;
};

export default AppBar;
